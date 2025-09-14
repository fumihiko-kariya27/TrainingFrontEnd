<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { users, loading, error } = storeToRefs(userStore);

onMounted(async () => {
  await userStore.fetchUsers();
});
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
      </el-table>
    </div>
  </div>
</template>