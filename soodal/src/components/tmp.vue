<template>
    <div class="income-form">
      <div class="header">
        <span class="type" :class="{ active: isIncome }" @click="toggleType">수입</span>
        <span class="type" :class="{ active: !isIncome }" @click="toggleType">지출</span>
      </div>
      <div class="form-group">
        <label for="category" class="icon"><i class="fas fa-bookmark"></i></label>
        <select id="category" v-model="category">
          <option>여가</option>
          <!-- Add other categories here -->
        </select>
      </div>
      <div class="form-group">
        <label for="amount" class="icon"><i class="fas fa-dollar-sign"></i></label>
        <input type="number" id="amount" v-model="amount" placeholder="수입 금액을 입력하세요." />
      </div>
      <div class="form-group">
        <label for="details" class="icon"><i class="fas fa-pencil-alt"></i></label>
        <input type="text" id="details" v-model="details" placeholder="수입 내역을 입력하세요." />
      </div>
      <div class="form-group">
        <label for="date" class="icon"><i class="fas fa-calendar-alt"></i></label>
        <input type="date" id="date" v-model="date" />
        <label for="time" class="icon"><i class="fas fa-clock"></i></label>
        <input type="time" id="time" v-model="time" />
      </div>
      <div class="buttons">
        <button @click="cancel" class="cancel-button">취소</button>
        <button @click="confirm" class="confirm-button">확인</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isIncome: true,
        category: '',
        amount: '',
        details: '',
        date: '',
        time: '',
      };
    },
    methods: {
      toggleType() {
        this.isIncome = !this.isIncome;
      },
      cancel() {
        // Add cancel logic here
      },
      confirm() {
        // Add confirm logic here
      },
    },
  };
  </script>
  
  <style scoped>
  .income-form {
    width: 300px;
    margin: 0 auto;
    font-family: Arial, sans-serif;
  }
  
  .header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .type {
    margin: 0 10px;
    cursor: pointer;
  }
  
  .type.active {
    font-weight: bold;
  }
  
  .form-group {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
  }
  
  .icon {
    width: 30px;
    text-align: center;
  }
  
  input,
  select {
    flex: 1;
    padding: 5px;
    margin-left: 10px;
    font-size: 14px;
  }
  
  .buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .cancel-button {
    background-color: #7c5a54;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  
  .confirm-button {
    background-color: #fecd2f;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
  }
  </style>