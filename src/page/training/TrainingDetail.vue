<script setup>
import { computed } from 'vue';
import { useTrainingStore } from '../../stores/trainingStore';

const props = defineProps({
    trainingCode : {
        type : String,
        required : true
    }
});

const trainingStore = useTrainingStore();
// ストアから渡されたtrainingCodeに一致するトレーニングデータを検索
const training = computed(() => 
    trainingStore.trainings.find(t => t.code === props.trainingCode)
);

</script>
<template>
    <div v-if="training" class="p-4 sm:p-6 lg:p-8">
        <div class="border-b border-gray-200 pb-5 mb-6">
            <h1 class="text-2xl sm:text-3xl font-bold leading-tight tracking-tight text-gray-900">{{ training.collectName }}</h1>
        </div>
        <div class="prose max-w-none mb-6">
            <p>{{ training.description }}</p>
        </div>
    </div>
    <div v-else class="p-8 text-center text-gray-500">
        <p>トレーニング情報が見つかりませんでした。</p>
    </div>
</template>