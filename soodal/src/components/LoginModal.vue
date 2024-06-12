<template>
    <div v-if="showModal" class="modal-backdrop">
        <div class="modal-dialog" @click.stop>
            <div class="modal-content">
                <button type="button" class="btn-close" @click="closeModal" style="color: #333333;">X</button>
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
                    <p v-if="errorMessage" class="msg">ㅤ{{ errorMessage }}</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="loginBtn" @click="handleLogin">로그인</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    props: ['showModal'],
    setup(props, { emit }) {
        const memberId = ref('');
        const memberPwd = ref('');
        const errorMessage = ref('');
        const users = ref([]);

        const getData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/data");
                users.value = response.data;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const handleLogin = () => {
            const user = users.value.find(
                user => user.member_id === memberId.value && user.member_pwd === memberPwd.value
            );

            if (user) {
                errorMessage.value = '';
                memberId.value = '';
                memberPwd.value = '';
                emit('login', user.member_id, user.member_pwd);
                emit('close');
            } else {
                const existingUser = users.value.find(user => user.member_id === memberId.value);
                if (existingUser) {
                    errorMessage.value = '비밀번호가 일치하지 않습니다.';
                } else {
                    errorMessage.value = '존재하지 않는 아이디입니다.';
                }
            }
        };

        const closeModal = () => {
            memberId.value = '';
            memberPwd.value = '';
            errorMessage.value = '';
            emit('close');
        };

        onMounted(() => {
            getData();
        });

        return { memberId, memberPwd, errorMessage, handleLogin, closeModal };
    }
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

.btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 20px;
    cursor: pointer;
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
    font-weight: bolder;
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

.form-control:focus {
    outline: 1px solid #6E6053;
}

.loginBtn {
    margin-top: 5%;
    margin-bottom: 20px;
    width: 40%;
    background-color: #ffd700;
    border: none;
    padding: 10px;
    border-radius: 30px;
    font-size: 20px;
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
