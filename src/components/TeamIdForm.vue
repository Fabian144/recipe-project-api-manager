<template>
  <LoadingText v-show="loadingText" :loading-text="loadingText"></LoadingText>

  <p v-if="store.validId">Team ID: {{ store.teamId }}</p>

  <form @submit.prevent="submit">
    <input type="string" v-model="id" placeholder="Team ID" />
    <button type="submit">Autentisera</button>
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
        this.id = '';
      } catch (error) {
        this.loadingText = `Fel inträffade med ${error.message.toLowerCase()}`;
        console.error('Fetch failed:', error);
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>

<style scoped>
form {
  position: fixed;
  top: 1.5em;
  right: 0;
  padding: 0 1em 1em;
}

input {
  margin: 1em;
  height: 2em;
  width: 20em;
}

p {
  position: fixed;
  top: 0;
  right: 0;
  margin: 0 1em;
}

@media (max-width: 768px) {
  form {
    position: unset;
    margin-top: 1.5em;
    margin-left: auto;
    width: fit-content;
  }

  input {
    width: 15em;
  }
}
</style>
