<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
const username = ref('');
const password = ref('');
const loading = ref(false);
const error = ref(null);

const handleLogin = async () => {
  loading.value = true;
  error.value = null;
  try {
    await authStore.login(username.value, password.value);
  } catch (e) {
    error.value = 'ログインに失敗しました。ユーザー名またはパスワードを確認してください。';
    console.error(e);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <el-card class="w-full max-w-md shadow-lg">
      <template #header>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800">ログイン</h2>
        </div>
      </template>
      <el-form @submit.prevent="handleLogin">
        <el-form-item label="ユーザー名">
          <el-input v-model="username" placeholder="Username" />
        </el-form-item>
        <el-form-item label="パスワード">
          <el-input v-model="password" type="password" placeholder="Password" show-password />
        </el-form-item>
        <el-alert v-if="error" :title="error" type="error" show-icon class="mb-4" />
        <el-form-item>
          <el-button type="primary" @click="handleLogin" :loading="loading" class="w-full">
            ログイン
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
