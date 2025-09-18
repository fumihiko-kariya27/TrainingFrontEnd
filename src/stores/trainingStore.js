import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getTraining, getHistories } from '../repositories/trainingRepository';

export const useTrainingStore = defineStore('training', () => {
  const trainings = ref([]);
  const historiesByUser = ref([]);
  const cache = ref(new Map());
  const loading = ref(false);
  const error = ref(null);

  async function getTrainings() {
    loading.value = true;
    error.value = null;
    try {
      // トレーニングデータが既に取得済みである場合はキャッシュより返却する
      if (cache.value.length > 0) {
        trainings.value = cache.value;
        return;
      }

      trainings.value = await getTraining();
    } catch (e) {
      error.value - e;
      console.error('Failed to fetch training', e);
    } finally {
      loading.value = false;
    }
  }

  async function getTrainingHistories(userId) {
    loading.value = true;
    error.value = null;
    try {
      // キャッシュにトレーニング履歴を保持している場合はキャッシュから返却する
      if (cache.value.has(userId)) {
        historiesByUser.value = cache.value.get(userId);
        return;
      }

      // トレーニング一覧を既に取得している場合はユーザーIDと等しいデータのみをフィルタリングする
      if (trainings.length > 0) {
        histories = trainings.value.filter(
          (training) => training.user.userId === userId
        );
        cache.value.set(userId, histories);
        historiesByUser.value = histories;
        return;
      }

      const trainingHistory = await getHistories(userId);
      cache.value.set(userId, trainingHistory);
      historiesByUser.value = trainingHistory;
    } catch (e) {
      error.value = e;
      console.error('Failed to fetch trainings:', e);
    } finally {
      loading.value = false;
    }
  }

  return {
    trainings,
    historiesByUser,
    loading,
    error,
    getTrainings,
    getTrainingHistories,
  };
});
