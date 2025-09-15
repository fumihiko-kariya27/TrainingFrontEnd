<script setup>
import HomeItem from './HomeItem.vue';
import { User, Notebook } from '@element-plus/icons-vue';
</script>
<template>
  <div class="bg-white shadow-lg rounded-lg p-6 md:p-8">
    <div class="text-center mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-gray-800">
        トレーニング管理システム
      </h1>
      <p class="text-gray-500 mt-2">
        ようこそ！メニューから操作を選択してください。
      </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- ユーザー一覧画面 -->
      <HomeItem title="ユーザー一覧" link="/users" :icon="User">
        登録されているユーザー情報を確認・管理します。
      </HomeItem>
      <!-- トレーニング一覧画面 -->
      <HomeItem title="コース一覧" link="/training" :icon="Notebook">
        提供されているトレーニングコースを確認します。
      </HomeItem>
    </div>
  </div>
</template>