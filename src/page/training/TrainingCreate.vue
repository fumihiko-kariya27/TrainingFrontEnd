<script setup>
import { ref } from 'vue';
import router from '@/router/router';
import { useTrainingStore } from '@/stores/trainingStore'
import OKDialog from '@/components/dialog/OKDialog.vue'
import TrainingForm from './TrainingForm.vue';

const modalVisible = ref(false);
const title = ref('');
const message = ref('');

const trainingStore = useTrainingStore();

const initialTraining = {
    programCode: '',
    correctName: '',
    description: '',
    startDate: null,
    endDate: null
};

const handleCreate = async (formData) => {
    // フォームデータをコピーして整形
    const dataToSave = { ...formData };
    // 時刻情報は不要なため、日付のみに開始日・終了日を整形する
    if(dataToSave.startDate){
        dataToSave.startDate = new Date(dataToSave.startDate).toLocaleDateString('sv-SE').replaceAll('-', '/');
    }
    if(dataToSave.endDate){
        dataToSave.endDate = new Date(dataToSave.endDate).toLocaleDateString('sv-SE').replaceAll('-', '/');
    }

    try {
        await trainingStore.saveTraining(dataToSave);

        title.value = '登録完了';
        message.value = `プログラムコード[${dataToSave.programCode}]を追加しました`;
    } catch(e){
        title.value = '登録失敗';
        message.value = `プログラムコード[${dataToSave.programCode}]の追加に失敗しました`;
    } finally {
        modalVisible.value = true;
    }
}

const handleCancel = () => {
    router.push("/training");
}
</script>
<template>
    <OKDialog
    v-model = "modalVisible"
    :dialogTitle = "title"
    :dialogMessage = "message"
    />

    <TrainingForm 
        :training="initialTraining" 
        @submit="handleCreate" 
        @cancel="handleCancel" 
    />
</template>