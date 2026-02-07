<script setup>
import { ref, reactive, watch } from 'vue';

const props = defineProps({
    training: {
        type: Object,
        required: true,
    },
});

const emit = defineEmits(['submit', 'cancel']);

const formData = reactive({ ...props.training });
const formRef = ref();

// 編集画面などでデータが遅延ロードされる場合に対応するため、props.trainingが変更された場合にformDataに反映する
watch(() => props.training, (newVal) => {
    Object.assign(formData, newVal);
}, { deep: true });

const rules = {
    programCode: [
        {required: true, message: 'プログラムコードを入力してください', trigger: 'blur'},
        {
            validator: (rule, value, callback) => {
                if(!value){
                    // 入力値空チェックはrequiredで実施済みのため、ここではスルー
                    callback();
                    return;
                }
                const regex = /[A-Z][A-Z0-9_]{4}$/;
                if(!regex.test(value)){
                    callback(new Error('大文字アルファベットで始まる、5文字の大文字アルファベット・数字・アンダースコアで構成してください'));
                }
                callback();
            },
            trigger: 'blur'
        }
    ],
    correctName: [
        {required: true, message: 'コース名を入力してください', trigger: 'blur'}
    ],
    description: [
        {required: true, message: '説明を入力してください', trigger: 'blur'}
    ],
    startDate: [
        {type: 'date', required: true, message: '受講開始日を選択してください', trigger: 'change'},
        {
            validator: (rule, value, callback) => {
                const endDate = formData.endDate;
                if(value && endDate && value > endDate){
                    callback(new Error('受講開始日は受講終了日以前である必要があります'));
                } else {
                    callback();
                }
            },
            trigger: 'change'
        }
    ],
    endDate: [
        {type: 'date', required: false}
    ]
}

const onSubmit = async () => {
    if (!formRef.value) return;
    await formRef.value.validate((valid) => {
        if (valid) {
            emit('submit', formData);
        }
    });
};

const onCancel = () => {
    emit('cancel');
};
</script>
<template>
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="プログラムコード" prop="programCode">
            <el-input v-model="formData.programCode" />
        </el-form-item>
        <el-form-item label="コース名" prop="correctName">
            <el-input v-model="formData.correctName" />
        </el-form-item>
        <el-form-item label="説明" prop="description">
            <el-input v-model="formData.description"/>
        </el-form-item>
        <el-form-item label="受講期間" prop="startDate">
            <el-col :span="11">
                <el-date-picker v-model="formData.startDate" type="date" style="width: 100%"/>
            </el-col>
            <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-date-picker v-model="formData.endDate" style="width: 100%"/>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">送信</el-button>
            <el-button @click="onCancel">キャンセル</el-button>
        </el-form-item>
    </el-form>
</template>