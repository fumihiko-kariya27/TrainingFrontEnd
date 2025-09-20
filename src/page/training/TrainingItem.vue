<script setup>
const props = defineProps({
    training: {
        type: Object,
        required: true,
    },
});

const isApplied = function(){
    if(props.training.applyStartDate !== null && props.training.applyEndDate === null){
        // 適用開始日が設定され、適用終了日が明示的に指定されてない場合は受付中である
        return true;
    }
    const today = new Date();
    const startDate = new Date(props.training.startDate);
    const endDate = new Date(props.training.endDate);
    return today >= startDate && today <= endDate;
}();
</script>
<template>
    <el-card class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <div class="p-5">
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-lg font-bold text-gray-800">{{ training.collectName }}</h4>
                <span
                    class="px-3 py-1 text-xs font-semibold rounded-full"
                    :class="{
                        'bg-green-100 text-green-800': isApplied,
                        'bg-gray-200 text-gray-700': !isApplied,
                    }"
                >
                {{ isApplied ? '受付中' : '受講期間外' }}
                </span>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ training.description }}</p>
            <div class="text-xs text-gray-500">
                <p>期間: {{ training.applyStartDate }} 〜 {{ training.applyEndDate }}</p>
            </div>
        </div>
    </el-card>
</template>