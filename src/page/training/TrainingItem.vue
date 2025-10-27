<script setup>
import router from '@/router/router';

const props = defineProps({
    training: {
        type: Object,
        required: true,
    },
});

const isApplyEndDateUnlimited = props.training.applyEndDate === null || props.training.applyEndDate === '+999999999-12-31';

const isApplied = function(){
    if(props.training.applyStartDate !== null && isApplyEndDateUnlimited) {
        // 適用開始日が設定され、適用終了日が明示的に指定されてない、あるいは無制限である場合は受付中である
        return true;
    }
    const today = new Date();
    const startDate = new Date(props.training.startDate);
    const endDate = new Date(props.training.endDate);
    return today >= startDate && today <= endDate;
}();

const viewDetail = () => {
    router.push(
        {
            name: 'trainingDetail', 
            params: {trainingCode: props.training.code}
        }
    );
}
</script>
<template>
    <el-card class="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
        <div class="p-5">
            <div class="flex justify-between items-start mb-2">
                <h4 class="text-lg font-bold text-gray-800">{{ training.collectName }}</h4>
                <button
                    :disabled="!isApplied"
                    class="px-3 py-1 text-xs font-semibold rounded-full"
                    :class="{
                        'bg-green-100 text-green-800': isApplied,
                        'bg-gray-200 text-gray-700': !isApplied,
                    }"
                    @click="viewDetail"
                >
                {{ isApplied ? '受付中' : '受講期間外' }}
                </button>
            </div>
            <p class="text-sm text-gray-600 mb-4">{{ training.description }}</p>
            <div class="text-xs text-gray-500">
                <p>期間: {{ training.applyStartDate }} 〜 {{ isApplyEndDateUnlimited ? '' : training.applyEndDate }}</p>
            </div>
        </div>
    </el-card>
</template>