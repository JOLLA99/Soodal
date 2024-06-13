<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">


      <div class="close-button">
        <button type="button" class="btn-close" @click="closeModal" style="color: rgb(51,51,51);">X</button>
      </div>



      <!-- <div class="close-button">
        <button @click="closeModal">
          취소
        </button>
      </div> -->

      <div class="type-toggle">
        <span :class="{ active: currentType === 'income' }" @click="showIncomeDropdown">수입</span>
        <span :class="{ active: currentType === 'expense' }" @click="showExpenseDropdown">지출</span>
      </div>

      <!--currentType이 income이면 수입 창을 불러와 입력 받기-->
      <div v-if="currentType === 'income'">
        <IncomeList />
      </div>

      <!--currentType이 expense이면 수출 창을 불러와 입력 받기-->
      <div v-else-if="currentType === 'expense'">
        <ExpenseList />
      </div>

      <!-- <div>
        <button @click="closeModal">취소</button>
      </div> -->

      <slot></slot>
    </div>
  </div>
</template>

<script>
  import { defineComponent, ref } from 'vue';
  import IncomeList from './IncomeList.vue';
  import ExpenseList from './ExpenseList.vue';

  export default defineComponent({
    name: 'AddList',
    components: {
      IncomeList,
      ExpenseList
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    emits: ['close'],
    setup(props, { emit }) {
      const closeModal = () => {
        emit('close');
      };

      const currentType = ref('');

      const showIncomeDropdown = () => {
        currentType.value = 'income';
        console.log('currentType:', currentType.value); // 추가된 로그
      };

      const showExpenseDropdown = () => {
        currentType.value = 'expense';
        console.log('currentType:', currentType.value); // 추가된 로그
      };

      const ConfirmBtnSubmitHandler = () => {

      }

      return {
        closeModal, currentType, showIncomeDropdown, showExpenseDropdown
      };
    }
  });
</script>

<style scoped>
* {
  text-align: center;
  justify-content: center;
}

.modal-overlay {
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

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%; /* Adjust the width as needed */
  max-width: 400px; /* Set a maximum width */
  position: relative;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.close-button button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
}

.close-button button i {
  color: #888;
}

.close-button button:hover i {
  color: #000;
}

.type-toggle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.type-toggle span {
  margin: 0 10px;
  cursor: pointer;
  font-size: 16px;
  color: #888;
  transition: color 0.3s;
}

.type-toggle span.active,
.type-toggle span:hover {
  color: #000;
  font-weight: bold;
}
</style>