import { defineStore } from 'pinia';

export const useIdAndRecipeStore = defineStore('teamId', {
  state: () => ({
		recipes: [],
    teamId: '',
		validId: false,
  }),
});
