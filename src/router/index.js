import { createRouter, createWebHistory } from 'vue-router';

import AddRecipesView from '@/views/AddRecipesView.vue';
import AddImagesView from '@/views/AddImagesView.vue';
import DeleteRecipesView from '@/views/DeleteRecipesView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: AddRecipesView },
    { path: '/bilder', name: 'bilder', component: AddImagesView },
    { path: '/raderaRecept', name: 'radera', component: DeleteRecipesView },
  ],
});

export default router;
