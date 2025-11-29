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

h1 {
	font-size: 1.5em;
	margin: 1em 1em 0;
}

a {
  display: inline;
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
</style>
