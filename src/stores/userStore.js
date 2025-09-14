import { defineStore } from 'pinia';
import { ref } from 'vue';
import userRepository from '@/repositories/userRepository';

export const useUserStore = defineStore('user', () => {
  const users = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchUsers() {
    loading.value = true;
    error.value = null;
    try {
      users.value = await userRepository.get();
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch users:', e);
    } finally {
      loading.value = false;
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
  };
});
