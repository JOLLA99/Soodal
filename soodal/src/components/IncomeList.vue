<template lang="">
    <div>
        <img src='../../images/category_icon.png' alt="" width="20px"/>
        <select v-model="incomeType">
            <option value="급여" selected>급여</option>
            <option value="용돈">용돈</option>
        </select>
        <br>
        <img src='../../images/money_icon.png' alt="" width="20px"/>
        <input type="text" v-model="incomeAmount" placeholder="수입 금액을 입력하세요" size=50 required>
        <br>
        <input type="text" v-model="incomeMemo" placeholder="수입 내역을 입력하세요" size=50>
        <br>
        <img src='../../images/calendar_icon.png' alt="" width="20px"/>
        <input type="date" v-model="incomeDate" required>
        <img src='../../images/time_icon.png' alt="" width="20px"/>
        <input type="time" v-model="incomeTime">
        
        <br>
        <button @click="ConfirmBtnSubmitHandler">확인</button>
    </div>
</template>
<script>
import { getCurrentInstance, ref } from 'vue';
import axios from 'axios';
export default {
    name: "IncomeList",
    setup() {
        let input_amount = ref('')
        const { proxy } = getCurrentInstance();

        // 서버 측으로 보낼 데이터 정리
        let incomeType = ref('')
        let incomeMemo = ref('')
        let incomeAmount = ref('')
        let incomeDate = ref('')
        let incomeTime = ref('')

        const ConfirmBtnSubmitHandler = async () => {
            console.log("버튼 클릭 함수 활성화")

            //id 값을 가져오기 위함
            const response = await axios.get("http://localhost:3001/data")
            const members = response.data;
            console.log("members.length: " , members.length)

            const newId = members.length > 0 ? members.length+1 : 0

            //전역변수 값 대입
            const member_id = proxy.$member_id
            const member_pwd = proxy.$member_pwd
            const member_name = proxy.$member_name
            const email = proxy.$email

            const url = "http://localhost:3001/data"
            const data = {
                id : newId,
                member_id: member_id,
                member_pwd: member_pwd,
                member_name: member_name,
                email: email,
                date: incomeDate.value,
                time: incomeTime.value,
                type: "수입",
                category: incomeType.value,
                amount: incomeAmount.value,
                memo: incomeMemo.value,
            }

            try {
                const response = await axios.post(url, data, { "Content-Type": "application/json" })
                console.log("axios 전송 완료 :", response.data)
            } catch (err) {
                alert(err.response.data)
            }
        }

        return { input_amount, incomeType, incomeMemo, incomeAmount, incomeDate, incomeTime, ConfirmBtnSubmitHandler }
    }
}
</script>
<style scoped></style>