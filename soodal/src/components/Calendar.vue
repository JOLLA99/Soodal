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
            const userdata = await fetchUserTransactions()
            calendarOptions.events = userdata;
            console.log(userdata)
            currentEvents.value = userdata
        })
        async function fetchUserTransactions() {
            try {
                const response = await axios.get(`http://localhost:3001/data`)
                // 서버로부터 받은 데이터를 가공
                const userdata = response.data.map(transaction => ({
                    ...transaction,
                    start: transaction.date,
                    end: transaction.date,
                    backgroundColor: transaction.type === '지출' ? 'red' : 'green',
                    borderColor: transaction.type === '지출' ? 'red' : 'green'
                }));
                return userdata;
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
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'); /* 구글 폰트 임포트 */
    .demo-app {
        display: flex;
        min-height: 100%;
        font-family: 'Roboto', Arial, Helvetica Neue, Helvetica, sans-serif; /* 폰트 변경 */
        font-size: 14px;
    }
    .demo-app-main {
        flex-grow: 1;
        padding: 3em;
    }
    .fc { /* the calendar root */
        max-width: 1100px;
        margin: 0 auto;
    }
    .fc-toolbar {
        background-color: #FDD400; /* 헤더 배경색 */
        color: #6E6503; /* 헤더 글자색 */
    }
    .fc-toolbar-title {
        font-weight: bold; /* 헤더 타이틀을 더 진하게 */
    }
    .fc-button {
        background-color: #6E6503; /* 버튼 배경색 */
        border-color: #6E6503; /* 버튼 테두리색 */
        color: #FFF; /* 버튼 글자색 */
        opacity: 1 !important; /* 비활성화시에도 opacity 유지 */
    }
    .fc-button:hover {
        background-color: #FDD400; /* 버튼 호버 배경색 */
        border-color: #FDD400; /* 버튼 호버 테두리색 */
        color: #6E6503; /* 버튼 호버 글자색 */
    }
    .fc-button-primary:not(:disabled):active, .fc-button-primary:not(:disabled).fc-button-active {
        background-color: #6E6503; /* 버튼 활성화 배경색 */
        border-color: #6E6503; /* 버튼 활성화 테두리색 */
        color: #FFF; /* 버튼 활성화 글자색 */
    }
    .fc-button-primary:not(:disabled):hover, .fc-button-primary:not(:disabled).fc-button-active:hover {
        background-color: #FDD400; /* 버튼 활성화 호버 배경색 */
        border-color: #FDD400; /* 버튼 활성화 호버 테두리색 */
        color: #6E6503; /* 버튼 활성화 호버 글자색 */
    }
    .fc-daygrid-day-number {
        color: #6E6503; /* 달력 날짜 숫자 색상 */
    }
    .fc-col-header-cell-cushion {
        color: #000; /* 요일 이름 색상 */
    }
    .fc-daygrid-event-dot {
        background-color: #6E6503; /* 달력 이벤트 점 색상 */
    }
    .fc-event-title, .fc-event-time {
        color: #6E6503; /* 달력 이벤트 제목 및 시간 색상 */
    }
</style>












