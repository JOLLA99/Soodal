<template>
    <div class="all_container">
        <div class="main-content">
            <div class="content_wrap_top">
                <div class="content_top">
                    <DoughnutChart />
                </div>
                <div class="content_top">
                    <RecentContract :data="dataR" />
                </div>
            </div>
            <div class="content_wrap_bottom">
                <div class="content_bottom">
                    <PayTop :data="dataOut" />
                </div>
                <div class="content_bottom">
                    <CountTop :data="dataOut" />
                </div>
            </div>
            <!-- <Calendar/> -->
        </div>
    </div>
</template>
<script>
    import DoughnutChart from '@/components/DoughnutChart.vue'
    import RecentContract from '@/components/RecentContract.vue'
    import PayTop from '@/components/PayTop.vue'
    import CountTop from '@/components/CountTop.vue'
    // import Calendar from '@/components/Calendar.vue'
    import axios from 'axios'
    import { ref, onMounted } from 'vue'
    export default {
        name: 'Main',
        components: { DoughnutChart, RecentContract, PayTop, CountTop },
        setup() {
            const dataProps = ref([]); // 전체 data
            const dataR = ref([]); // date 내림차순
            const dataA = ref([]); // 전체 amount 내림차순
            const dataOut = ref([]); //지출 전체
            const getData = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/data");
                    dataProps.value = response.data.slice();
                    dataR.value = response.data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice();
                    dataA.value = response.data.sort((a,b) => b.amount - a.amount).slice();
                    console.log("dataR is ")
                    console.log(dataR.value);
                    console.log("dataA is ")
                    console.log(dataA.value);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            const getOutData = async () =>{
                try{
                    const response = await axios.get("http://localhost:3001/data?type=out");
                    dataOut.value = response.data.slice();
                    console.log("dataOut is ");
                    console.log(dataOut.value);
                }catch(error){
                    console.error('Error fetching data: ', error);
                }
            }
            onMounted(() => {
                getData();
                getOutData();
            })
            return { dataR, dataProps, dataA, dataOut }
        }
    }
</script>
<style scoped>
    .all_container {
        display: flex;
        min-height: 100vh;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }
    .main-content {
        flex-grow: 1;
        padding: 40px;
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: auto;
    }
    .content_wrap_top,
    .content_wrap_bottom {
        display: contents;
    }
    .content_top, .content_bottom {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    .doughnut-container {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 50%;
        margin: 0 auto;
    }
</style>