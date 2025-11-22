<script setup>
import Header from '@/page/header/Header.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>

<template>
  <el-container class="min-h-screen">
    <el-header class="bg-gray-300 shadow px-6 py-4 flex w-full items-center justify-between">
      <Header />
    </el-header>
    <el-container>
      <el-aside width="220px" class="bg-gray-100 shadow-md p-4 border-r border-gray-200">
        <nav class="space-y-4">
          <RouterLink to="/" class="block text-gray-700 hover:text-blue-600 font-medium">
            ホーム
          </RouterLink>
          <RouterLink v-if="authStore.isAdmin()" to="/users" class="block text-gray-700 hover:text-blue-600 font-medium">
            ユーザー管理
          </RouterLink>
          <RouterLink to="/training" class="block text-gray-700 hover:text-blue-600 font-medium">
            トレーニング管理
          </RouterLink>
        </nav>
      </el-aside>
      <el-main class="p-6">
        <div class="bg-white p-6 rounded-xl shadow">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>
