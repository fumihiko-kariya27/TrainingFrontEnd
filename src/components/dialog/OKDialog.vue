<script setup>
import { computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    dialogTitle: {
        type: String,
        required: true,
    },
    dialogMessage: {
        type: String,
        required: true
    },
});

const visibleProxy = computed({
    get: () => props.modelValue,
    set: (value) => emits('update:modelValue', value),
});

const emits = defineEmits(['update:modelValue']);

const handleClose = () => {
    emits('update:modelValue', false);
}
</script>
<template>
    <el-dialog
        v-model="visibleProxy"
        width="30%"
        align-center
        :before-close="handleClose"
        >
        <template #title>
            <span><strong>{{ dialogTitle }}</strong></span>
        </template>
        <div>{{ dialogMessage }}</div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="handleClose">閉じる</el-button>
            </span>
        </template>
    </el-dialog>
</template>