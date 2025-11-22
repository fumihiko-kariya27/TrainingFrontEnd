<script setup>
import HomeItem from './HomeItem.vue';
import { User, Notebook } from '@element-plus/icons-vue';
import { useTrainingStore } from '@/stores/trainingStore';
import { useAuthStore } from '@/stores/authStore';

const trainingStore = useTrainingStore();

async function fetchTrainings(){
  await trainingStore.getTrainings();
}

const authStore = useAuthStore();
</script>
<template>
  <div class="bg-white shadow-lg rounded-lg p-6 md:p-8">
    <div class="text-center mb-8">
      <p class="text-gray-500 mt-2">
        ようこそ！メニューから操作を選択してください。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ユーザー一覧画面 -->
      <HomeItem v-if="authStore.isAdmin()" title="ユーザー一覧" link="/users" :icon="User">
        登録されているユーザー情報を確認・管理します。
      </HomeItem>
      <!-- トレーニング一覧画面 -->
      <HomeItem title="コース一覧" link="/training" :icon="Notebook" @click="fetchTrainings">
        提供されているトレーニングコースを確認します。
      </HomeItem>
    </div>
  </div>
</template>