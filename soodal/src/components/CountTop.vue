<template lang="">
    <div>
        <h5 class="mb-4">지출 건 수 TOP 3</h5>
        <table class="table table-hover">
            <tbody v-if="data.length > 0">
                <tr v-for="(item, index) in sortedData.slice(0, 3)" :key="index">
                    <td>
                        <img :src="getImagePath(item.category)" alt="" style="max-width: 40px; max-height: 40px;">
                    </td>
                    <td>{{ item.category }}</td>
                    <td>{{ item.count }}건</td>
                    <td>{{ formatAmount(item.amount) }}원</td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr>
                    <td colspan="3" class="text-center">데이터를 불러오는 중입니다...</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
    import { ref, onMounted, watch, computed, reactive } from 'vue';
    export default {
        name: 'CountTop',
        props: ['data'],
        setup(props) {
            const iconObj = reactive({
                "식비": "/images/food_icon.png",
                "쇼핑": "/images/shopping_icon.png",
                "교통": "/images/traffic_icon.png",
                "의료": "/images/medical_icon.png",
                "여가": "/images/hobby_icon.png",
                "생활비": "/images/livingexpenses_icon.png"
            })

            const sortedData = computed(() => {
                const categorySum = {};

                props.data.forEach(item => {
                    const amount = parseFloat(item.amount);
                    if (categorySum[item.category]) {
                        categorySum[item.category].amount += amount;
                        categorySum[item.category].count += 1;
                    } else {
                        categorySum[item.category] = { amount, count: 1 };
                    }
                });

                return Object.keys(categorySum).map(category => ({
                    category: category,
                    amount: categorySum[category].amount,
                    count: categorySum[category].count
                })).sort((a, b) => b.count - a.count);
            });
            const formatAmount = (amount) => {
                return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
            };
            const getImagePath = (category) => {
                return iconObj[category];
            };


            return { sortedData, formatAmount, getImagePath };
        }

    }
</script>
<style lang="">

</style>