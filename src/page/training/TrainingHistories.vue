<script setup>
import { useTrainingStore } from '../../stores/trainingStore';
import { storeToRefs } from 'pinia';
import TrainingHistory from './TrainingHistory.vue';

const trainingStore = useTrainingStore();
const { historiesByUser, loading } = storeToRefs(trainingStore);
</script>
<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="border-b border-gray-200 pb-5 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900">受講履歴</h1>
    </div>
     <div v-if="loading" class="text-center py-10">
      <p class="text-gray-500">読み込み中...</p>
    </div>
    <div v-else-if="historiesByUser.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <TrainingHistory v-for="trainingHistory in historiesByUser" :key="trainingHistory.id" :history="trainingHistory" />
    </div>
    <div v-else class="text-center py-10">
      <p class="text-gray-500">受講履歴はありません。</p>
    </div>
  </div>
</template>