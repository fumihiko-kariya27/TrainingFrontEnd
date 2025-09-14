<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useTrainingStore } from '../../stores/trainingStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const router = useRouter();
const { users, loading } = storeToRefs(userStore);

const trainingStore = useTrainingStore();
const { trainings } = storeToRefs(trainingStore);

onMounted(async () => {
  await userStore.fetchUsers();
});

async function getTrainingHistory(userId){
  await trainingStore.getTrainingHistories(userId);
  // 受講履歴取得後は受講履歴一覧画面に遷移する
  router.push('/trainingHistory');
}
</script>
<template>
  <div>
    <div v-if="loading">Now Loading...</div>
    <div v-else>
      <!-- データが空の場合の表示 -->
      <div v-if="users.length <= 0">
        <h4>ユーザーデータは見つかりませんでした</h4>
      </div>
      <!-- データが空の場合の表示 -->
      <el-table v-else :data="users" style="width: 100%">
        <el-table-column label="氏名" width="250">
          <template #default="scope">
            {{ scope.row.firstName }} {{ scope.row.lastName }}
          </template>
        </el-table-column>
        <el-table-column prop="status" label="グレード" width="150">
          <template #default="scope">
            <span
              class="px-2 py-1 rounded-full text-white"
              :class="{
                'bg-yellow-500': scope.row.status === 'GOLD',
                'bg-gray-400': scope.row.status === 'SILVER',
                'bg-yellow-800': scope.row.status === 'BRONZ'
              }">{{ scope.row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="joinDate" label="入会日" width="150"/> 
        <el-table-column fixed="right" min-width="120">
          <template #default="scope">
            <el-button type="primary" size="small" @click="getTrainingHistory(scope.row.id)">受講履歴</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>