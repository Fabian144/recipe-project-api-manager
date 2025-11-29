<template>
  <LoadingText v-show="loadingText" :loading-text="loadingText"></LoadingText>

  <h1>Lägg till recept</h1>

  <form @submit.prevent="postRecipes">
    <textarea
      type="string"
      v-model="recipesToAdd"
      placeholder="Array med recept i JSON format"
    ></textarea>
    <button type="submit" :disabled="fetching || !recipesToAdd">Lägg till recepten</button>
  </form>
</template>

<script>
import LoadingText from '@/components/LoadingText.vue';
import { useTeamIdStore } from '@/stores/teamId';

export default {
  components: {
    LoadingText,
  },

  setup() {
    const store = useTeamIdStore();
    return { store };
  },

  data() {
    return {
      recipesToAdd: '',
      loadingText: '',
      fetching: false,
    };
  },

  computed: {
    parsedRecipes() {
      try {
        return JSON.parse(this.recipesToAdd);
      } catch (error) {
        this.parseError();
      }
    },
  },

  methods: {
    async postRecipes() {
      if (!this.parsedRecipes) {
        this.parseError();
        return;
      }
      this.fetching = true;
      this.loadingText = 'Lägger till recepten...';
      this.parsedRecipes.forEach(async (recipe) => {
        try {
          const response = await fetch(
            `https://recipes.bocs.se/api/v1/${this.store.teamId}/recipes`,
            {
              method: 'POST',
              body: JSON.stringify(recipe),
              headers: { 'Content-type': 'application/json' },
            }
          );
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          this.loadingText = 'Recept tillagda';
          setTimeout(() => {
            this.loadingText = '';
          }, 1000);
        } catch (error) {
          this.loadingText = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
          console.error('Fetch failed:', error);
        } finally {
          this.fetching = false;
        }
      });
    },

    parseError() {
      this.loadingText = 'Fel inträffade, se till att du skickar en array i JSON format';
      setTimeout(() => {
        this.loadingText = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
form {
  padding: 1em;
  display: flex;
  flex-direction: column;
}

textarea {
  width: 50%;
  margin: 1em;
  height: 20em;
}

button {
  width: 9em;
}
</style>
