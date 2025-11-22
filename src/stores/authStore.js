import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import authRepository from '@/repositories/authRepository';
import router from '@/router/router';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('accessToken') || null);
  const user = ref(JSON.parse(localStorage.getItem('user')) || null);

  const isAuthenticated = computed(() => !!accessToken.value);

  const roles = computed(() => {
    if(!accessToken.value){
      return [];
    }

    const decoded = jwtDecode(accessToken.value);
    console.log('Decoded JWT:', decoded);
    return decoded.roles || [];
  });

  function hasRole(role){
    return roles.value.includes(role);
  }

  function isAdmin(){
    return hasRole('ADMIN');
  }

  /**
   * ログイン処理
   * @param {string} username
   * @param {string} password
   */
  async function login(username, password) {
    try {
      const data = await authRepository.login(username, password);
      accessToken.value = data.accessToken;
      user.value = data.user;

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('user', JSON.stringify(data.user));

      // 認証完了後はホームページへリダイレクト
      router.push('/');
    } catch (error) {
      console.error('Failed to login:', error);
      throw error;
    }
  }

  /**
   * ログアウト処理
   */
  function logout() {
    accessToken.value = null;
    user.value = null;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    router.push('/login');
  }

  return {
    accessToken,
    user,
    isAuthenticated,
    roles,
    hasRole,
    isAdmin,
    login,
    logout,
  };
});
