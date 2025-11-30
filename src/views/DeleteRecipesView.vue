<template>
  <DisplayMessage v-show="displayMessage" :display-message="displayMessage"></DisplayMessage>

  <h1>Ta bort recept</h1>

  <form @submit.prevent="deleteRecipes()">
    <textarea
      type="text"
      v-model="recipesToAdd"
      placeholder="Array med recept i JSON format (måste tas direkt från APIt)"
    ></textarea>
    <button type="submit" :disabled="fetching || !recipesToAdd">Ta bort recepten</button>
  </form>
</template>

<script>
import DisplayMessage from '@/components/DisplayMessage.vue';
import { useIdAndRecipeStore } from '@/stores/teamIdAndRecipes';

export default {
  components: {
    DisplayMessage,
  },

  setup() {
    const store = useIdAndRecipeStore();
    return { store };
  },

  data() {
    return {
      recipesToAdd: '',
      displayMessage: '',
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
    async deleteRecipes() {
      if (!this.parsedRecipes) {
        this.parseError();
        return;
      }
      this.fetching = true;
      this.displayMessage = 'Raderar recepten...';
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
          this.displayMessage = 'Recept borttagna';
          setTimeout(() => {
            this.displayMessage = '';
          }, 4000);
        } catch (error) {
          this.displayMessage = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
          console.error('Fetch failed:', error);
        } finally {
          this.fetching = false;
        }
      });
    },

    parseError() {
      this.displayMessage = 'Fel inträffade, se till att du skickar en array i JSON format';
      setTimeout(() => {
        this.displayMessage = '';
      }, 3000);
    },
  },
};
</script>

<style scoped>
label {
	font-size: 1.2em;
}

form {
  padding: 1em;
  display: flex;
  flex-direction: column;
  max-width: 80%;
  width: fit-content;
  margin: auto;
}

textarea {
  width: 50em;
  max-width: 100%;
  margin: 1em 0;
  height: 20em;
}

button {
  width: 9em;
}
</style>
