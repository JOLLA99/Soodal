<template>
    <div v-if="showModal" class="modal-backdrop">
        <div class="modal-dialog" @click.stop>
            <div class="modal-content">
                <button type="button" class="btn-close" @click="closeModal">X</button>
                <img class="logo" src="/images/soodal_logo.png" alt="Logo" />

                <div class="modal-body">
                    <div class="form-group">
                        <span class="txt">아이디</span>
                        <input v-model="memberId" type="text" class="form-control" id="memberId" autocomplete="off" />
                    </div>
                    <div class="form-group">
                        <span class="txt">비밀번호</span>
                        <input v-model="memberPwd" type="password" class="form-control" id="memberPwd"
                            autocomplete="off" />
                    </div>
                    <p v-if="errorMessage" class="msg">{{ errorMessage }}</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="loginBtn" @click="handleLogin">로그인</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps(['showModal']);
const emit = defineEmits(['close', 'login']);

const memberId = ref('');
const memberPwd = ref('');
const memberName = ref('');
const errorMessage = ref('');
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

const handleLogin = () => {
    if (!memberId.value || !memberPwd.value) {
        errorMessage.value = '아이디와 비밀번호를 모두 입력해주세요.';
        return;
    }

    const user = users.value.find(
        user => user.member_id === memberId.value && user.member_pwd === memberPwd.value
    );

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify({ memberId: user.member_id, memberPwd: user.member_pwd, memberName: user.member_name}));
        errorMessage.value = '';
        memberId.value = '';
        memberPwd.value = '';

        emit('login', user.member_name);
        emit('close');
    } else {
        errorMessage.value = '아이디 또는 비밀번호가 일치하지 않습니다.';
    }
};

const closeModal = () => {
    memberId.value = '';
    memberPwd.value = '';
    errorMessage.value = '';
    emit('close');
};

getData();
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
    max-width: 500px;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
}

.modal-content {
    position: relative;
    padding: 20px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
    text-align: center;
}

.modal-footer {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn {
    outline: none;
}

.btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 20px;
}

.btn-close:focus {
    outline: none;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.msg {
    font-size: smaller;
    color: #FD3D00;
    text-align: left;
    margin-left: 90px;
}

.txt {
    color: #6E6053;
    text-align: center;
    margin-right: 10px;
    min-width: 80px;
}

.logo {
    display: block;
    margin: 0 auto;
    max-width: 200px;
}

.form-control {
    display: block;
    width: 90%;
    padding: 10px;
    border: 1px solid #6E6053;
    border-radius: 30px;
}

.loginBtn {
    /* max-width: 180px; */
    width: 50%;
    background-color: #ffd700;
    border: none;
    padding: 10px;
    border-radius: 30px;
    font-size: large;
    font-weight: bold;
    color: #6E6053;
}

.loginBtn:hover {
    background-color: #ffcc00;
    color: white;
}

@media (max-width: 768px) {
    .modal-dialog {
        max-width: 90%;
        padding: 10px;
    }

    .form-control {
        width: 100%;
    }

    .loginBtn {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .form-group {
        flex-direction: column;
        align-items: flex-start;
    }

    .txt {
        margin-bottom: 5px;
    }

    .logo {
        max-width: 150px;
    }
}
</style>