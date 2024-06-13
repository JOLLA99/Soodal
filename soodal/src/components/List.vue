<template>
  <div class="list-container">
    <ListHeader @search-click="handleSearchClick" />
    <div class="list-table">
      <table>
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
            <img src='../../images/delete_icon.png' alt="삭제" width="27px" @click="DeleteClickEvent(item.id, $event)" />
          </tr>
        </tbody>
      </table>
    </div>
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
  @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap'); /* 구글 폰트 임포트 */
  
  .list-container {
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .list-table {
    margin-top: 20px;
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: 'Roboto', Arial, sans-serif;
  }
  
  th, td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f9f9f9;
    font-weight: bold;
  }
  
  .actions button {
    background: none;
    border: none;
    cursor: pointer;
  }
  
  .actions button:hover {
    color: #f56c6c;
  }
  </style>