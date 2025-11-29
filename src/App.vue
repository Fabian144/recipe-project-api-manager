<template>
  <TeamIdForm></TeamIdForm>
  <template v-if="store.validId">
    <nav>
      <router-link :to="'/'">Lägg till recept</router-link>
      <router-link :to="{ name: 'bilder' }">Lägg till bilder</router-link>
      <router-link :to="{ name: 'radera' }">Ta bort recept</router-link>
    </nav>
    <router-view></router-view>
  </template>
</template>

<script>
import TeamIdForm from './components/TeamIdForm.vue';
import { useTeamIdStore } from './stores/teamId';

export default {
  components: { TeamIdForm },

  setup() {
    const store = useTeamIdStore();
    return { store };
  },
};
</script>

<style>
body {
  margin: 0;
}

a {
  padding: 1em;
}

@media (max-width: 768px) {
  nav {
    display: flex;
    flex-direction: column;
  }
}
</style>
