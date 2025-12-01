<template>
  <DisplayMessage v-show="displayMessage" :display-message="displayMessage"></DisplayMessage>

  <p v-if="store.validId">Team ID: {{ store.teamId }}</p>

  <form v-if="!store.validId" @submit.prevent="getAllRecipes">
    <input type="text" v-model="store.teamId" placeholder="Team ID" />
    <button type="submit">Autentisera</button>
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
      displayMessage: '',
      fetching: false,
    };
  },

  methods: {
    async getAllRecipes() {
      this.fetching = true;
      this.displayMessage = 'Laddar in recepten...';
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
        this.displayMessage = '';
      } catch (error) {
        this.displayMessage = `Fel inträffade med ${error.message.toLowerCase()}`;
        console.error('Fetch failed:', error);
      } finally {
        this.fetching = false;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      if (this.$route.query.teamId) {
        this.store.teamId = this.$route.query.teamId;
        this.getAllRecipes();
      }
    });
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
  position: absolute;
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
