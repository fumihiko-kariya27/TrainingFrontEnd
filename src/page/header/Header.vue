<script setup>
import { useAuthStore } from '@/stores/authStore';
const authStore = useAuthStore();

const logout = () => {
    authStore.logout();
}
</script>
<template>
  <div class="flex items-center justify-between w-full">
    <div class="text-3xl md:text-4xl font-bold text-gray-800">
      トレーニング管理システム
    </div>
    <div v-show="authStore.isAuthenticated">
        <el-dropdown trigger="click">
            <div class="font-bold flex items-center space-x-2 cursor-pointer">
                <el-avatar class="bg-yellow-500">
                {{ authStore.user?.charAt(0).toUpperCase() }}
                </el-avatar>
                <span>{{ authStore.user }}</span>
            </div>
        </el-dropdown>
        <el-button @click="logout()">ログアウト</el-button>
    </div>
  </div>
</template>