<template>
  <div v-show="loadingText" class="loading-text">{{ loadingText }}</div>

  <form @submit.prevent="submit">
    <input type="string" v-model="id" placeholder="Team ID" />
    <button type="submit">Autentisera</button>
  </form>
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
      id: '',
      loadingText: '',
      fetching: false,
    };
  },

  methods: {
    submit() {
      this.store.teamId = this.id;
      this.getRecipes();
    },

    async getRecipes() {
      this.fetching = true;
      this.loadingText = 'Laddar recept...';
      try {
        const response = await fetch(`https://recipes.bocs.se/api/v1/${this.store.teamId}/recipes`);
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        this.store.recipes = await response.json();
        this.store.recipes.forEach((recipe) => {
          recipe.newImageUrl = '';
        });
        this.store.validId = true;
        this.loadingText = '';
      } catch (error) {
        console.error('Fetch failed:', error);
        this.loadingText = `Fel inträffade med ${error.message.toLowerCase()}`;
      } finally {
        this.fetching = false;
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
  margin: 1em;
  height: 2em;
}

form {
  padding: 1em;
  float: right;
}

@media (max-width: 768px) {
  form {
    float: unset;
		position: unset;
  }
}
</style>
