<template>
    <div class="chart-container">
        <h4>월 별 입/출금 내역</h4>
        <Doughnut v-if="loaded" :options="chartOptions" :data="chartData" />
        <div v-if="loaded" class="total-amount" :class="{ positive: totalAmount > 0, negative: totalAmount < 0 }">
            <h4>TOTAL {{ formatAmount(totalAmount) }} </h4>
        </div>
    </div>
</template>

<script>
    import { Doughnut } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js'
    import ChartDataLabels from 'chartjs-plugin-datalabels'
    import { ref, onMounted } from 'vue'
    import axios from 'axios'

    ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, ChartDataLabels)

    export default {
        name: 'DoughnutChart',
        components: { Doughnut },
        setup() {
            const loaded = ref(false)
            const totalAmount = ref(0);
            const chartData = ref({
                labels: [],
                datasets: [{
                    label: '입/출금',
                    data: [],
                    backgroundColor: [],
                    borderColor: [],
                    borderWidth: 1
                }]
            });
            const chartOptions = ref({
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: "right",
                        labels: {
                            boxWidth: 8,
                            padding: 10,
                            usePointStyle: true,
                            pointStyle: "circle",
                            font: {
                                size: 14
                            }
                        },
                        fullSize: true,
                        align: "right"
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(context.parsed);
                                }
                                return label;
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 50,
                            bottom: 50
                        }
                    },
                    elements: {
                        arc: {
                            borderWidth: 2
                        }
                    },
                    datalabels: {
                        color: function (context) {
                            return context.dataset.data[context.dataIndex] < 0 ? 'red' : 'green';
                        },
                        font: {
                            size: 14,
                        },
                        formatter: function (value) {
                            return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(value);
                        }
                    }
                }
            });

            const getData = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/data");
                    const data = response.data;
                    // Process data to extract labels and amounts grouped by month
                    const groupedData = groupDataByMonth(data);
                    console.log(groupedData);
                    chartData.value.labels = Object.keys(groupedData).map(month => `${month}월`);
                    const monthAmounts = Object.values(groupedData).map(monthData => {
                        return monthData.reduce((sum, entry) => sum + (entry.type === '수입' ? parseInt(entry.amount, 10) : -parseInt(entry.amount, 10)), 0);
                    });
                    chartData.value.datasets[0].data = monthAmounts;
                    chartData.value.datasets[0].backgroundColor = monthAmounts.map(amount => amount < 0 ? 'rgba(255, 99, 132, 0.4)' : 'rgba(47, 242, 0.4)');
                    chartData.value.datasets[0].borderColor = monthAmounts.map(amount => amount < 0 ? 'rgba(255, 99, 132, 1)' : 'rgba(47, 242, 50, 1)');

                    totalAmount.value = data.reduce((sum, entry) => {
                        return sum + (entry.type === '수입' ? parseInt(entry.amount, 10) : -parseInt(entry.amount, 10));
                    }, 0);
                    loaded.value = true;
                    console.log(chartData.value);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }

            const groupDataByMonth = (data) => {
                const groupedData = {};
                data.forEach(entry => {
                    const month = new Date(entry.date).getMonth() + 1;
                    if (!groupedData[month]) {
                        groupedData[month] = [];
                    }
                    groupedData[month].push(entry);
                });
                
                return groupedData;
            }
            const formatAmount = (amount) => {
                return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
            };

            onMounted(() => {
                getData();
            })

            return { chartData, chartOptions, loaded, totalAmount, formatAmount }
        }
    }
</script>

<style scoped>
    .chart-container {
        display: grid;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 500px;
        max-width: 700px;
        height: 420px;
        margin: 0 auto;
        padding: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        background-color: #ffffff;
        border-radius: 8px;
    }

    .chart-container h4 {
        text-align: center;
        width: 100%;
    }

    .total-amount {
        margin-top: 20px;
        font-size: 18px;
    }

    .total-amount.positive {
        color: green;
    }

    .total-amount.negative {
        color: red;
    }

    .chart-container canvas {
        width: 100%;
        height: auto; 
    }
</style>