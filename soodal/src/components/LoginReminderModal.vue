<template>
  <div v-if="showModal" class="modal-backdrop">
    <div class="modal-dialog" @click.stop>
      <div class="modal-content">
        <p>로그인 후 이용 가능한 서비스입니다.</p>
        <button class="btn" @click="close">확인</button>
      </div>
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
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-dialog {
  max-width: 400px;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  width: 100%;
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  text-align: center;
  border: 2px solid #6E6053;
}

button {
  width: 80px;
  height: 30px;
  background-color: #6E6053;
  border: none;
  font-size: smaller;
  color: white;
  margin: 0 auto; 
  display: block; 
}

button:hover {
  color: white;
  background-color: #5A4E44;
}

/* 반응형 */
@media (min-width: 600px) {
  .modal-dialog {
    width: 70%;
  }
}

@media (min-width: 768px) {
  .modal-dialog {
    width: 50%;
  }
}

@media (min-width: 992px) {
  .modal-dialog {
    width: 40%;
  }
}

@media (min-width: 1200px) {
  .modal-dialog {
    width: 30%;
  }
}
</style>
