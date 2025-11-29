<template>
  <LoadingText v-show="loadingText" :loading-text="loadingText"></LoadingText>

  <h1>Byt receptbilder</h1>

  <div class="recipe-forms">
    <form
      v-for="recipe in store.recipes"
      @submit.prevent="postImage(recipe.id, recipe.newImageUrl)"
    >
      <label>Byt bild för: {{ recipe.title }}</label>
      <p>Senaste: {{ recipe.imageUrl }}</p>
      <input type="url" v-model="recipe.newImageUrl" placeholder="Länk till bilden" />
      <button type="submit" :disabled="fetching || !recipe.newImageUrl">Byt bild</button>
    </form>
  </div>
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
      loadingText: '',
      fetching: false,
    };
  },

  methods: {
    async postImage(id, imageUrl) {
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
        this.loadingText = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
        console.error('Fetch failed:', error);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin: 1em 1em 0.5em;
}

form {
  padding: 1em;
}

.recipe-forms {
  display: flex;
  flex-direction: column;
}

input {
  width: 50%;
  margin: 1em;
  height: 2em;
}
</style>
