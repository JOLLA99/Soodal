<template>
  <div class="sidebar-container">
    <img class="logo" src="/images/soodal_logo.png" alt="Logo" />
    <div v-if="isLoggedIn" class="greeting">
      <span style="font-weight: bold">{{ memberName }}</span>님, 안녕하세요!
    </div>

    <ul class="nav">
      <li class="nav-item">
        <router-link to="/main" class="nav-link" @click.prevent="navigateTo('/main')">
          거래 한눈에 보기
        </router-link>
      </li>
      <li>
        <router-link to="/list" class="nav-link" @click.prevent="navigateTo('/list')">
          거래 내역 조회
        </router-link>
      </li>
      <li>
        <router-link to="/calender" class="nav-link" @click.prevent="navigateTo('/calender')">
          수달 캘린더
        </router-link>
      </li>
    </ul>

    <div class="btn-container">
      <button v-if="!isLoggedIn" @click="showLoginModal" class="btn">Login</button>
      <button v-else @click="confirmLogout" class="btn">Logout</button>
    </div>

    <!-- 모달창 -->
    <LoginModal :showModal="isModalVisible" @close="isModalVisible = false" @login="handleLogin" />
    <LoginReminderModal :showModal="isReminderVisible" @close="isReminderVisible = false" />

  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import LoginModal from './LoginModal.vue';
import LoginReminderModal from './LoginReminderModal.vue';

export default {
  name: 'Sidebar',
  components: {
    LoginModal,
    LoginReminderModal
  },
  setup() {
    const isLoggedIn = ref(false);
    const isModalVisible = ref(false);
    const isReminderVisible = ref(false);
    const memberName = ref('');
    const users = ref([]);
    const router = useRouter();

    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/data");
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const showLoginModal = () => {
      isModalVisible.value = true;
    };

    const handleLogin = (memberId, memberPwd) => {
      const user = users.value.find(
        user => user.member_id === memberId && user.member_pwd === memberPwd
      );

      if (user) {
        isLoggedIn.value = true;
        memberName.value = user.member_name;
        isModalVisible.value = false;
        router.push('/main');
      }
    };

    const confirmLogout = () => {
      if (confirm('로그아웃하시겠습니까?')) {
        logout();
      }
    };

    const logout = () => {
      isLoggedIn.value = false;
      memberName.value = '';
      router.push('/');
    };

    const navigateTo = (route) => {
      if (isLoggedIn.value) {
        router.push(route);
      } else {
        isReminderVisible.value = true;
        router.push('/');
      }
    };

    onMounted(() => {
      getData();
    });

    return { isLoggedIn, isModalVisible, isReminderVisible, memberName, showLoginModal, handleLogin, confirmLogout, logout, navigateTo };
  }
};
</script>

<style scoped>
.sidebar-container {
  width: 300px;
  height: 100vh;
  background-color: #FDD400;
  padding: 10px;
  color: #333333;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.logo {
  margin-top: 10%;
  display: flex;
  align-items: center;
}

.greeting {
  font-size: larger;
  text-align: center;
  margin-bottom: 10%;
}

.nav {
  margin-left: 10%;
  list-style-type: none;
  line-height: 50px;
  font-size: large;
}

.nav-link {
  color: #333333;
}

.nav-link:hover {
  color: white;
}

.btn-container {
  display: flex;
  margin-bottom: 20%;
  justify-content: center;
  align-items: flex-end;
  margin-top: auto;
}

.btn {
  color: white;
  font-size: large;
  background-color: #6E6053;
  width: 150px;
  height: 40px;
  border: none;
  border-radius: 10px;
  margin-top: auto;
}

.btn:hover {
  background-color: #5A4E44;
}
</style>
