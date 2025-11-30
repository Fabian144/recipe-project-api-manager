<template>
  <DisplayMessage v-show="displayMessage" :display-message="displayMessage"></DisplayMessage>

  <h1>Byt receptbilder</h1>

  <div class="recipe-forms">
    <form v-for="recipe in store.recipes" @submit.prevent="addImage(recipe)">
      <label>{{ recipe.title }}</label>
      <p>Nuvarande: {{ recipe.imageUrl }}</p>
      <input type="url" v-model="recipe.newImageUrl" placeholder="Länk till bilden" />
      <button type="submit" :disabled="fetching || !recipe.newImageUrl">Byt bild</button>
    </form>
  </div>
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
      displayMessage: '',
      fetching: false,
    };
  },

  methods: {
    async addImage(recipe) {
      this.fetching = true;
      this.displayMessage = 'Byter bild...';
      try {
        const response = await fetch(
          `https://recipes.bocs.se/api/v1/${this.store.teamId}/recipes/${recipe.id}`,
          {
            method: 'PATCH',
            body: JSON.stringify({ imageUrl: `${recipe.imageUrl}` }),
            headers: { 'Content-type': 'application/json' },
          }
        );
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.displayMessage = 'Bild tillagd';
        setTimeout(() => {
          this.displayMessage = '';
        }, 4000);
        recipe.imageUrl = recipe.newImageUrl;
      } catch (error) {
        this.displayMessage = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
        console.error('Fetch failed:', error);
      } finally {
        this.fetching = false;
      }
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
}

.recipe-forms {
  display: flex;
  flex-direction: column;
  word-break: break-all;
  width: 50em;
  max-width: 90%;
  margin: auto;
}

input {
  width: 60%;
  margin: 1em;
  height: 2em;
}
</style>
