<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTrainingStore } from '../../stores/trainingStore';
import TrainingItem from './TrainingItem.vue';

const trainingStore = useTrainingStore();
const { trainings, loading } = storeToRefs(trainingStore);
</script>
<template>
  <div class="p-4 sm:p-6 lg:p-8">
    <div class="border-b border-gray-200 pb-5 mb-6">
      <h1 class="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900">コース一覧</h1>
    </div>
    <div v-if="loading" class="text-center py-10">
      <p class="text-gray-500">読み込み中...</p>
    </div>
    <div v-else-if="trainings.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TrainingItem v-for="training in trainings" :key="training.code" :training="training" />
    </div>
    <div v-else class="text-center py-10">
        <p class="text-gray-500">トレーニングは登録されていません。</p>
    </div>
  </div>
</template>