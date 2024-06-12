<template>
    <div>
        <h4 class="mb-4">최근 거래 내역</h4>

        <table class="table table-hover">
            <!-- <thead class="table-custom">
                <tr>
                    <th>날짜</th>
                    <th>금액</th>
                    <th>메모</th>
                    <th>입/출</th>
                </tr>
            </thead> -->
            <tbody v-if="data.length > 0">
                <tr v-for="(item, index) in sortedData.slice(0, 7)" :key="index">
                    <td>{{ formatDate(item.date) }}</td>
                    <td :class="item.type === '지출' ? 'outText' : 'inText'">{{ formatAmount(item.amount) }} 원</td>
                    <td>{{ item.memo }}</td>
                    <td>{{ item.type }}</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="4" class="text-center">데이터를 불러오는 중입니다...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
    name: 'RecentContract',
    props: ['data'],
    setup(props) {
        const sortedData = computed(() => {
            return [...props.data].sort((a, b) => new Date(b.date) - new Date(a.date));
        });

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            return `${year}-${month}-${day}`;
        };

        const formatAmount = (amount) => {
            return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
        };
        return {
            sortedData,
            formatDate,
            formatAmount,
        };
    },
};
</script>

<style scoped>
.table {
    width: 100%;
    margin: 0 auto;
    border-collapse: collapse;
}

.table-hover tbody tr:hover {
    background-color: #f5f5f5;
}

.table-custom th {
    background-color: #FDD400;
    color: white;
    text-align: center;
}

.table tbody td {
    text-align: center;
    vertical-align: middle;
}

.table td, .table th {
    padding: 12px;
}

.text-center {
    text-align: center;
}

.outText{
    color: red;
}
.inText{
    color: blue;
}
</style>