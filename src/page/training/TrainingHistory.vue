<script setup>
const props = defineProps({
    history: {
    type: Object,
    required: true,
  },
});

const statusMap = {
  IN_PROCESS: { label: "受講中", color: "bg-yellow-100 text-yellow-800" },
  COMPLETED: { label: "受講完了", color: "bg-green-100 text-green-800" },
}
</script>
<template>
  <el-card shadow="hover" class="relative p-4">
    <div v-if="statusMap[history.attendance]" class="absolute top-2 right-2">
        <span :class="`px-2 py-1 rounded text-xs font-medium ${statusMap[history.attendance].color}`">
            {{ statusMap[history.attendance].label }}
        </span>
    </div>
    <div class="flex flex-col space-y-1">
      <div class="text-lg font-bold uppercase tracking-wide">
        【{{ history.course.code }}】
      </div>
      <div class="text-base text-gray-800">
        {{ history.course.collectName }}
      </div>
      <div class="text-sm text-gray-600">
        {{ history.course.description }}
      </div>
    </div>
  </el-card>
</template>