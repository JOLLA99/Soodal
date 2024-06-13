<template>
  <div>
    <ListHeader @search-click="handleSearchClick" />
    <table class="table table-hover">
      <thead>
        <tr>
          <th>시간</th>
          <th>카테고리</th>
          <th>수입/지출</th>
          <th>내역</th>
          <th>가격</th>
          <th></th>
        </tr>
      </thead>
      <tbody v-for="(items, date) in groupedFilteredData" :key="date">
        <thead>
          <tr>
            <th colspan="4">{{ date }}</th>
          </tr>
        </thead>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.time }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.memo }}</td>
          <td>{{ item.amount }} 원</td>
          <img src='../../images/delete_icon.png' alt="삭제" width="35px" @click="DeleteClickEvent(item.id, $event)" />
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted, computed, getCurrentInstance } from 'vue';
import axios from 'axios';
import ListHeader from './ListHeader.vue';


export default {
  components: {
    ListHeader,
  },
  setup() {
    const data = ref([])
    const selectedCategory = ref('')

    onMounted(async () => {
      fetchData()
      //filteredData()
    })

    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/data')
      data.value = response.data
    }

    const groupByDate = (data) => {
      return data.reduce((acc, item) => {
        const date = item.date
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date].push(item)
        return acc
      }, {})
    }

    const filteredData = computed(() => {
      if (selectedCategory.value === '') {
        return data.value;
      } else {
        return data.value.filter(item => item.category === selectedCategory.value);
      }
    })

    const groupedFilteredData = computed(() => groupByDate(filteredData.value))

    const handleSearchClick = (category) => {
      selectedCategory.value = category
    }


    const DeleteClickEvent = async (id, event) => {
      event.stopPropagation();
      try {
        await axios.delete(`http://localhost:3001/data/${id}`)
        await fetchData()
        console.log("FetchData: True")
      } catch (error) {
        console.error('Error deleting items')
      }
    }


    

    return {
      groupedFilteredData,
      handleSearchClick,
      DeleteClickEvent,
    };
  }
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
}

thead {
  background-color: #f2f2f2;
}

tbody thead {
  background-color: #e6e6e6;
}
</style>