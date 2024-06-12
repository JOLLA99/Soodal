<template>
    <div v-if="showModal" class="container">
      <div class="modal">
        <p>로그인 후 사용하세요.</p>
        <button @click="close">확인</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  
  const props = defineProps({
    showModal: { type: Boolean, required: true }
  });
  
  const emit = defineEmits(['close']);
  
  const close = () => {
    emit('close');
  };
  </script>

  <style scoped>
  .container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    
  }
  .modal {
    background: white;
    padding: 30px;
    border-radius: 5px;
    text-align: center;
    font-size: medium;
    width: 80%;
    max-width: 400px;
    box-sizing: border-box;
    border: 2px solid #6E6053;
  }
  button {
    width: 100%;
    max-width: 100px;
    padding: 10px 20px;
    margin-top: 20px;
    border: none;
    background-color: #6E6053;
    color: white;
    border-radius: 5px;
    font-size: small;
  }
  button:hover {
    background-color: #5A4E44;
  }
  
/* 반응형.. */
  @media (min-width: 600px) {
    .modal {
      width: 60%;
    }
  }
  @media (min-width: 768px) {
    .modal {
      width: 40%;
    }
  }
  @media (min-width: 992px) {
    .modal {
      width: 30%;
    }
  }
  @media (min-width: 1200px) {
    .modal {
      width: 20%;
    }
  }
  </style>
  