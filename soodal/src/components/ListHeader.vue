<template lang="">
    <div class="list-header">
        <div class="header-left">
            <!--돋보기 버튼 이미지를 클릭하면 필터링 된 테이블 값을 화면에 출력한다-->
            <img src='../../images/glass_icon.png' alt="돋보기 아이콘" width="23px" class="search-icon"
                @click="SearchClickEvent" />
            <select class="filter-select" id="dropdown" name="dropdown" v-model="selectedCategory">
                <option value="식비" selected>식비</option>
                <option value="쇼핑">쇼핑</option>
                <option value="교통">교통</option>
                <option value="의료">의료</option>
                <option value="여가">여가</option>
                <option value="생활비">생활비</option>
                <option value="급여">급여</option>
                <option value="용돈">용돈</option>
            </select>
        </div>
        <div class="header-right">
            <!--모달 팝업창 구현 (새로 리스트 추가)-->
            <img src="../../images/memo_icon.png" width="23px" @click="openModal" alt="추가 이미지" />
            <AddList :isVisible="isModalVisible" @close="closeModal">
            </AddList>
        </div>
    </div>

</template>
<script>
    import { onMounted, ref } from 'vue';
    import AddList from './AddList.vue';
    export default {
        name: "ListHeader",
        components: {
            AddList
        },
        setup(props, { emit }) {

            const selectedCategory = ref('')

            //돋보기 버튼 클릭 시 필터링 기능 
            const SearchClickEvent = () => {
                console.log("ListHeader emit : ", selectedCategory.value)
                emit('search-click', selectedCategory.value)
            }

            const isModalVisible = ref(false);

            const openModal = () => {
                isModalVisible.value = true;
            };

            const closeModal = () => {
                isModalVisible.value = false;
            };

            return { onMounted, selectedCategory, SearchClickEvent, isModalVisible, openModal, closeModal }
        }


    }
</script>
<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
    /* 구글 폰트 임포트 */

    .list-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
    }

    .header-left {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .search-icon {
        width: 24px;
        height: 24px;
        cursor: pointer;
    }

    .filter-select {
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-family: 'Roboto', Arial, sans-serif;
    }

    .header-right {
        display: flex;
        align-items: center;
        gap: 10px;
    }
</style>