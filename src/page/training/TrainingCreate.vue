<script setup>
import { reactive } from 'vue';
import { useTrainingStore } from '@/stores/trainingStore'

const trainingStore = useTrainingStore();

const form = reactive({
    programCode: '',
    correctName: '',
    description: '',
    startDate: null,
    endDate: null
});

const rules = {
    programCode: [
        {required: true, message: 'プログラムコードを入力してください', trigger: 'blur'},
        {
            validator: (rule, value) => {
                if(!value){
                    // 入力値空チェックはrequiredで実施済みのため、ここではスルー
                    return Promise.resolve();
                }
                const regex = /[A-Z][A-Z0-9_]{4}$/
                if(!regex.test(value)){
                    return Promise.reject('大文字アルファベットで始まる、5文字の大文字アルファベット・数字・アンダースコアで構成してください');
                }
                return Promise.resolve();
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
            validator: (rule, value, callback, source) => {
                const endDate = source.endDate;
                if(value && endDate && value > endDate){
                    Promise.reject('受講開始日は受講終了日以前である必要があります');
                }
                Promise.resolve();
            },
            trigger: 'change'
        }
    ],
    endDate: [
        {type: 'date', required: false}
    ]
}

function onSubmit(){
    // 時刻情報は不要なため、日付のみに開始日・終了日を整形する
    if(form.startDate){
        form.startDate = new Date(form.startDate).toLocaleDateString('sv-SE').replaceAll('-', '/');
    }
    if(form.endDate){
        form.endDate = new Date(form.endDate).toLocaleDateString('sv-SE').replaceAll('-', '/');
    }

    trainingStore.saveTraining(form)
}

function onCancel(){
    location.reload();
}
</script>
<template>
    <el-form :model="form" :rules="rules" label-width="auto" style="max-width: 600px">
        <el-form-item label="プログラムコード" prop="programCode">
            <el-input v-model="form.programCode" />
        </el-form-item>
        <el-form-item label="コース名" prop="correctName">
            <el-input v-model="form.correctName" />
        </el-form-item>
        <el-form-item label="説明" prop="description">
            <el-input v-model="form.description"/>
        </el-form-item>
        <el-form-item label="受講期間" prop="startDate">
            <el-col :span="11">
                <el-date-picker v-model="form.startDate" type="date" style="width: 100%"/>
            </el-col>
            <el-col :span="2" class="text-center">
                <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
                <el-date-picker v-model="form.endDate" style="width: 100%"/>
            </el-col>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登録</el-button>
            <el-button @click="onCancel">キャンセル</el-button>
        </el-form-item>
    </el-form>
</template>