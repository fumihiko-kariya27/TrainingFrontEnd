import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../page/home/Home.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../page/user/UserTable.vue'),
  },
  {
    path: '/training',
    name: 'training',
    component: () => import('../page/training/Training.vue'),
  },
  {
    path: '/trainingHistory',
    name: 'trainingHistory',
    component: () => import('../page/training/TrainingHistories.vue'),
  },
  {
    path: '/training/:trainingCode',
    name: 'trainingDetail',
    component: () => import('../page/training/TrainingDetail.vue'),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
