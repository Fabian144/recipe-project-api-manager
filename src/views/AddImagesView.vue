<template>
  <div v-show="loadingText" class="loading-text">{{ loadingText }}</div>

  <div class="recipe-forms">
    <form v-for="recipe in store.recipes" @submit.prevent="postImage(recipe.id, recipe.newImageUrl)">
      <label>Byt bild för: {{ recipe.title }}</label>
      <p>Senaste: {{ recipe.imageUrl }}</p>
      <input type="url" v-model="recipe.newImageUrl" placeholder="Länk till bilden" />
      <button type="submit" :disabled="fetching">Byt bild</button>
    </form>
  </div>
</template>

<script>
import { useTeamIdStore } from '@/stores/teamId';

export default {
  setup() {
    const store = useTeamIdStore();
    return { store };
  },

  data() {
    return {
      loadingText: '',
      fetching: false,
    };
  },

  methods: {
    async postImage(id, imageUrl) {
      if (imageUrl) {
        this.fetching = true;
        this.loadingText = 'Skickar ny bild';
        try {
          const response = await fetch(
            `https://recipes.bocs.se/api/v1/${this.store.teamId}/recipes/${id}`,
            {
              method: 'PATCH',
              body: JSON.stringify({ imageUrl: `${imageUrl}` }),
              headers: { 'Content-type': 'application/json' },
            }
          );
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          this.loadingText = 'Skickad';
          setTimeout(() => {
            this.loadingText = '';
          }, 1000);
        } catch (error) {
          console.error('Fetch failed:', error);
          this.loadingText = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
        } finally {
          this.fetching = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.loading-text {
  position: fixed;
  right: 5em;
  top: 5em;
  color: white;
  background-color: black;
}

input {
  width: 50%;
  margin: 1em;
  height: 2em;
}

form {
  padding: 1em;
}

.recipe-forms {
  display: flex;
  flex-direction: column;
}
</style>
