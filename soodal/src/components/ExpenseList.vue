<template>
    <div class="expense-form">
        <div class="form-group">
            <img src='../../images/category_icon.png' alt="" width="20px"/>
            <select id="category" v-model="expenseType">
                <option value="식비" selected>식비</option>
                <option value="쇼핑">쇼핑</option>
                <option value="교통">교통</option>
                <option value="의료">의료</option>
                <option value="여가">여가</option>
                <option value="생활비">생활비</option>
            </select>
        </div>
        <div class="form-group">
            <img src='../../images/money_icon.png' alt="" width="20px"/>
            <input type="number" id="amount" v-model="expenseAmount" placeholder="지출 금액을 입력하세요." />
        </div>
        <div class="form-group">
            <img src='../../images/memo_icon.png' alt="" width="20px"/>
            <input type="text" id="details" v-model="expenseMemo" placeholder="지출 내역을 입력하세요." />
        </div>
        <div class="form-group">
            <img src='../../images/calendar_icon.png' alt="" width="20px"/>
            <input type="date" id="date" v-model="expenseDate" />
            <img src='../../images/time_icon.png' alt="" width="20px"/>
            <input type="time" id="time" v-model="expenseTime" />
        </div>
        <div class="buttons">
            <button 
                :class="{'confirm-button': true, 'clicked': isClicked}" 
                @click="ConfirmBtnSubmitHandler"
                @animationend="resetButton"
            >
                확인
            </button>
        </div>
    </div>
</template>

<script>
    import { getCurrentInstance, ref } from 'vue';
    import axios from 'axios';
    export default {
        name: "ExpenseList",
        setup() {
            let input_amount = ref('')
            const { proxy } = getCurrentInstance();

            // 서버 측으로 보낼 데이터 정리
            let expenseType = ref('')
            let expenseMemo = ref('')
            let expenseAmount = ref('')
            let expenseDate = ref('')
            let expenseTime = ref('')

            const isClicked = ref(false);

            const ConfirmBtnSubmitHandler = async () => {
                isClicked.value = true;

                console.log("버튼 클릭 함수 활성화")

                //id 값을 가져오기 위함
                const response = await axios.get("http://localhost:3001/data")
                const members = response.data;
                console.log("members.length: ", members.length)

                const newId = members.length > 0 ? members.length + 1 : 0

                //전역변수 값 대입
                const member_id = proxy.$member_id
                const member_pwd = proxy.$member_pwd
                const member_name = proxy.$member_name
                const email = proxy.$email

                const url = "http://localhost:3001/data"
                const data = {
                    id: newId,
                    member_id: member_id,
                    member_pwd: member_pwd,
                    member_name: member_name,
                    email: email,
                    date: expenseDate.value,
                    time: expenseTime.value,
                    type: "지출",
                    category: expenseType.value,
                    amount: expenseAmount.value,
                    memo: expenseMemo.value,
                }

                try {
                    const response = await axios.post(url, data, { "Content-Type": "application/json" })
                    console.log("axios 전송 완료 :", response.data)
                } catch (err) {
                    alert(err.response.data)
                }
            }

            const resetButton = () => {
                isClicked.value = false;
            }

            return { 
                input_amount, 
                expenseType, 
                expenseMemo, 
                expenseAmount, 
                expenseDate, 
                expenseTime, 
                ConfirmBtnSubmitHandler,
                isClicked,
                resetButton
            }
        }
    }
</script>

<style scoped>
    .expense-form {
        width: 300px;
        margin: 0 auto;
        font-family: Arial, sans-serif;
        text-align: center;
    }
    
    .form-group {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 15px;
        width: 100%;
    }
    
    .icon {
        width: 30px;
        text-align: center;
    }
    
    input,
    select {
        flex: 1;
        padding: 10px;
        margin: 0 10px;
        font-size: 14px;
    }
    
    .buttons {
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
    
    .cancel-button,
    .confirm-button {
        background-color: #7c5a54;
        color: white;
        border: none;
        padding: 10px 20px;
        cursor: pointer;
        width: 45%;
        font-size: 14px;
        border-radius: 5px;
    }
    
    .confirm-button {
        background-color: #fecd2f;
    }
    
    .confirm-button.clicked {
        animation: click-animation 0.5s forwards;
    }
    
    @keyframes click-animation {
        0% {
            background-color: #fecd2f;
            transform: scale(1);
        }
        50% {
            background-color: #ffe680;
            transform: scale(1.1);
        }
        100% {
            background-color: #fecd2f;
            transform: scale(1);
        }
    }
</style>
