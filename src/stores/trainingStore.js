import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getHistories } from '../repositories/trainingRepository';

export const useTrainingStore = defineStore('training', () => {
  const trainings = ref([]);
  const loading = ref(false);
  const error = ref(null);
  //　取得されたトレーニング情報のキャッシュ
  const cache = ref(new Map());

  async function getTrainingHistories(userId) {
    loading.value = true;
    error.value = null;
    try {
      // ユーザーデータを既に取得している場合はキャッシュより返却する
      if (cache.value.has(userId)) {
        trainings.value = cache.value.get(userId);
        return;
      }

      trainings.value = await getHistories(userId);
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch trainings:', e);
    } finally {
      loading.value = false;
    }
  }

  return {
    trainings,
    loading,
    error,
    getTrainingHistories,
  };
});
