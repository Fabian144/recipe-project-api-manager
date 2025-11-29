import { defineStore } from 'pinia';

export const useTeamIdStore = defineStore('teamId', {
  state: () => ({
		recipes: [],
    teamId: '',
		validId: false,
  }),
});
