import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../page/home/Home.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../page/auth/Login.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('../page/user/UserTable.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/training',
    name: 'training',
    component: () => import('../page/training/Training.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/trainingHistory',
    name: 'trainingHistory',
    component: () => import('../page/training/TrainingHistories.vue'),
    meta: { requiresAuth: true }, // 認証が必要
  },
  {
    path: '/training/:trainingCode',
    name: 'trainingDetail',
    component: () => import('../page/training/TrainingDetail.vue'),
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    // 認証が必要なページに未認証でアクセスした場合、ログインページにリダイレクト
    next({ name: 'login' });
  } else if (to.name === 'login' && authStore.isAuthenticated) {
    // 認証済みのユーザーがログインページにアクセスした場合、ホームページにリダイレクト
    next({ name: 'home' });
  } else {
    // それ以外の場合はナビゲーションを許可
    next();
  }
});

export default router;
