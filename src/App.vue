<template>
  <TeamIdForm></TeamIdForm>
  <template v-if="store.validId">
    <nav>
      <router-link :to="'/'">Lägg till recept</router-link>
      <router-link :to="{ name: 'bilder' }">Byt receptbilder</router-link>
      <router-link :to="{ name: 'radera' }">Ta bort recept</router-link>
    </nav>
    <router-view></router-view>
  </template>
</template>

<script>
import TeamIdForm from './components/TeamIdForm.vue';
import { useIdAndRecipeStore } from './stores/teamIdAndRecipes';

export default {
  components: { TeamIdForm },

  setup() {
    const store = useIdAndRecipeStore();
    return { store };
  },
};
</script>

<style scoped>
a {
  display: inline-block;
  margin: 1em;
  width: fit-content;
  color: black;
}

a:hover {
  background-color: black;
  color: white;
}

@media (max-width: 768px) {
  nav {
    display: flex;
    flex-direction: column;
  }
}

@media (max-width: 526px) {
  nav {
    margin-top: 2em;
  }
}
</style>
