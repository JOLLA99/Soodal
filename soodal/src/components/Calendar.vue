<template>
    <div class='demo-app'>
        <!-- <Sidebar /> -->
        <div class='demo-app-main'>
            <FullCalendar class='demo-app-calendar' :options='calendarOptions'>
                <template v-slot:eventContent='arg'>
                    <b>{{ arg.timeText }}</b>
                    <span>{{ arg.event.extendedProps.category }}</span>
                    <i>{{ arg.event.title }} {{ arg.event.extendedProps.amount }}</i>
                </template>
            </FullCalendar>
        </div>
    </div>
</template>

<script>
    import { defineComponent, ref, reactive, onMounted } from 'vue'
    import axios from 'axios'
    import FullCalendar from '@fullcalendar/vue3'
    import dayGridPlugin from '@fullcalendar/daygrid'
    import interactionPlugin from '@fullcalendar/interaction'
    import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'
    export default defineComponent({
        components: {
            FullCalendar,
        },
        setup() {
            const currentEvents = ref([])
            const calendarOptions = reactive({
                plugins: [
                    dayGridPlugin,
                    interactionPlugin // needed for dateClick
                ],
                initialView: 'dayGridMonth',
                initialEvents: [],
                events: [],
                editable: true,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                eventsSet: handleEvents,
                eventDidMount: handleEventMount
            })
            onMounted(async () => {
                const transactions = await fetchUserTransactions()
                calendarOptions.events = transactions;
                console.log(transactions)
                currentEvents.value = transactions
            })
            async function fetchUserTransactions() {
                try {
                    const response = await axios.get(`http://localhost:3001/data`)
                    // 서버로부터 받은 데이터를 가공
                    const transactions = response.data.map(transaction => ({
                        ...transaction,
                        start: transaction.date,
                        end: transaction.date,
                        backgroundColor: transaction.type === '지출' ? 'red' : 'green',
                        borderColor: transaction.type === '지출' ? 'red' : 'green'
                    }));
                    return transactions;
                } catch (error) {
                    console.error("Error occurred: ", error)
                    return []
                }
            }
            function handleEvents(events) {
                currentEvents.value = events
            }
            function handleEventMount(info) {
                if (info.event.extendedProps.type === 'out') {
                    info.el.style.backgroundColor = 'red';
                    info.el.style.borderColor = 'red';
                } else if (info.event.extendedProps.type === 'in') {
                    info.el.style.backgroundColor = 'green';
                    info.el.style.borderColor = 'green';
                }
            }
            return {
                calendarOptions,
                currentEvents,
            }
        }
    })
</script>

<style lang='css'>
    h2 {
        margin: 0;
        font-size: 16px;
    }

    ul {
        margin: 0;
        padding: 0 0 0 1.5em;
    }

    li {
        margin: 1.5em 0;
        padding: 0;
    }

    b {
        /* used for event dates/times */
        margin-right: 3px;
    }

    .demo-app {
        display: flex;
        min-height: 100%;
        font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
        font-size: 14px;
    }

    .demo-app-sidebar {
        width: 300px;
        line-height: 1.5;
        background: #EAF9FF;
        border-right: 1px solid #D3E2E8;
    }

    .demo-app-sidebar-section {
        padding: 2em;
    }

    .demo-app-main {
        flex-grow: 1;
        padding: 3em;
    }

    .fc {
        /* the calendar root */
        max-width: 1100px;
        margin: 0 auto;
    }
</style>
