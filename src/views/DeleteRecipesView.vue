<template>
  <LoadingText v-show="loadingText" :loading-text="loadingText"></LoadingText>

  <h1>Ta bort recept</h1>

  <form @submit.prevent="deleteRecipes()">
    <textarea
      type="string"
      v-model="recipes"
      placeholder="Array med recept (måste tas direkt från APIt)"
    ></textarea>
    <button type="submit" :disabled="fetching || !recipes">Ta bort recepten</button>
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
      recipes: '',
      loadingText: '',
      fetching: false,
    };
  },

  computed: {
    parsedRecipes() {
      return JSON.parse(this.recipes);
    },
  },

  methods: {
    deleteRecipes() {
      if (this.parsedRecipes) {
        this.fetching = true;
        this.loadingText = 'Raderar recepten...';
        this.parsedRecipes.forEach(async (recipe) => {
          try {
            const response = await fetch(
              `https://recipes.bocs.se/api/v1/${this.store.teamId}/recipes/${recipe.id}`,
              {
                method: 'DELETE',
                headers: { 'Content-type': 'application/json' },
              }
            );
            if (!response.ok) {
              throw new Error(`Status: ${response.status}`);
            }
            this.loadingText = 'Recept borttagna';
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
      } else {
        this.loadingText = 'Fel inträffade, se till att du skickar en array';
      }
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

.recipe-forms {
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
