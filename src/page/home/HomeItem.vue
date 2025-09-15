<script setup>
import { useRouter } from 'vue-router';
import { ElIcon } from 'element-plus';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    default: null,
  },
});

const router = useRouter();

const handleClick = () => {
    router.push(props.link);
};
</script>
<template>
  <el-card class="cursor-pointer hover:shadow-xl transition-shadow duration-300" @click="handleClick">
    <div class="flex items-center mb-4">
      <el-icon v-if="icon" :size="24" class="mr-3 text-gray-600"><component :is="icon" /></el-icon>
      <h2 class="text-xl font-bold text-gray-800">{{ props.title }}</h2>
    </div>
    <p class="text-gray-600">
      <slot />
    </p>
  </el-card>
</template>