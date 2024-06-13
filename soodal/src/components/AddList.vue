<template>
  <div v-if="isVisible" class="modal-overlay">
    <div class="modal-content">

      <div class="buttons">
        <button @click="showIncomeDropdown">수입</button>
        <button @click="showExpenseDropdown">지출</button>
      </div>

      <!--currentType이 income이면 수입 창을 불러와 입력 받기-->
      <div v-if="currentType === 'income'">
        <IncomeList />
      </div>

      <!--currentType이 expense이면 수출 창을 불러와 입력 받기-->
      <div v-else-if="currentType === 'expense'">
        <ExpenseList />
      </div>

      <div>
        <button @click="closeModal">취소</button>
      </div>

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

<style>
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
}
</style>