<template>
  <div class="sidebar-container">
    <img class="logo" src="/images/soodal_logo.png" alt="Logo" />
    <div v-if="isLoggedIn" class="greeting">
      <span style="font-weight: bold">{{ name }}</span>님, 안녕하세요!
    </div>

    <ul class="nav">
      <li class="nav-item">
        <a @click="navigateTo('/main')" class="nav-link" :class="{ 'active': currentRoute === '/main' }">거래 한눈에 보기</a>
      </li>
      <li class="nav-item">
        <a @click="navigateTo('/list')" class="nav-link" :class="{ 'active': currentRoute === '/list' }">거래 내역 조회</a>
      </li>
      <li class="nav-item">
        <a @click="navigateTo('/calendar')" class="nav-link" :class="{ 'active': currentRoute === '/calendar' }">수달
          캘린더</a>
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

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import LoginModal from './LoginModal.vue';
import LoginReminderModal from './LoginReminderModal.vue';

const isLoggedIn = ref(false);
const isModalVisible = ref(false);
const isReminderVisible = ref(false);
const name = ref('');
const router = useRouter();
const currentRoute = ref(router.currentRoute.value.path);

const showLoginModal = () => {
  isModalVisible.value = true;
};

const handleLogin = (memberName) => {
  const loggedInUser = localStorage.getItem('loggedInUser');

  if (loggedInUser) {
    isLoggedIn.value = true;
    name.value = memberName;
    isModalVisible.value = false;
    router.push('/main');
  } else {
    isLoggedIn.value = false;
    localStorage.removeItem('loggedInUser');
  }
};

const confirmLogout = () => {
  if (confirm('로그아웃하시겠습니까?')) {
    logout();
  }
};

const logout = () => {
  isLoggedIn.value = false;
  localStorage.removeItem('loggedInUser');
  router.push('/');
};

const navigateTo = (route) => {
  if (isLoggedIn.value) {
    router.push(route);
  } else {
    isReminderVisible.value = true;
  }
};

onMounted(() => {
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    const { memberName } = JSON.parse(loggedInUser);
    if (memberName) {
      handleLogin(memberName);
    }
  }
});

watch(router.currentRoute, (to) => {
  currentRoute.value = to.path;
});
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
  box-sizing: border-box;
}

.logo {
  margin-top: 10%;
  display: flex;
  align-items: center;
}

.greeting {
  font-size: larger;
  text-align: center;
  margin-bottom: 30px;
}

.nav {
  margin-left: 20%;
  list-style-type: none;
  line-height: 50px;
  font-size: large;
}

.nav-link {
  color: #333333;
  cursor: pointer;
}

.nav-item {
  margin-top: 0;
  margin-bottom: 10px;
}

.nav-link:hover {
  color: white;
}

.nav-link.active {
  color: white;
  font-weight: bold;
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
  width: 130px;
  height: 45px;
  border: none;
  border-radius: 30px;
  font-size: larger;
}

.btn:hover {
  color: white;
  background-color: #5A4E44;
}

@media (max-width: 768px) {
  .sidebar-container {
    width: 100%;
    height: auto;
    padding: 20px;
  }

  .nav {
    margin-left: 0;
    text-align: center;
  }

  .nav-item {
    margin-bottom: 20px;
  }

  .btn-container {
    margin-top: 20px;
    margin-bottom: 0;
  }
}

@media (max-width: 480px) {
  .logo {
    margin-top: 5%;
  }

  .greeting {
    font-size: medium;
    margin-bottom: 20px;
  }

  .nav {
    font-size: medium;
  }

  .btn {
    width: 100px;
    height: 40px;
  }
}
</style>
