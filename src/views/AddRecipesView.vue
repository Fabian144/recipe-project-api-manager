<template>
  <div v-show="loadingText" class="loading-text">{{ loadingText }}</div>

  <form @submit.prevent="postRecipes()">
    <input type="string" v-model="recipes" placeholder="Array med recept" />
    <button type="submit" :disabled="fetching">Lägg till recepten</button>
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
    async postRecipes() {
      this.loadingText = 'Lägger till recept...';
      this.parsedRecipes.forEach(async (recipe) => {
        try {
          const response = await fetch(`REMOVED/${this.store.teamId}/recipes`, {
            method: 'POST',
            body: JSON.stringify(recipe),
            headers: { 'Content-type': 'application/json' },
          });
          if (!response.ok) {
            throw new Error(`Status: ${response.status}`);
          }
          this.loadingText = 'Recept tillagda';
          setTimeout(() => {
            this.loadingText = '';
          }, 1000);
        } catch (error) {
          console.error('Fetch failed:', error);
          this.loadingText = `Fel inträffade vid senaste försöket med ${error.message.toLowerCase()}`;
        } finally {
          this.fetching = false;
        }
      });
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
</style>
