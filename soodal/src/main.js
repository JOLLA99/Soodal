import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.css'
import router from './router';

const member_id = "admin"
const member_pwd = "admin"
const email = "admin@admin.com"
const member_name = "김건영"


const app = createApp(App);

// id와 pwd를 전역변수로 두어 로그인 가능하게 만든다.
app.config.globalProperties.$member_id = member_id;
app.config.globalProperties.$member_pwd = member_pwd;
app.config.globalProperties.$email = email;
app.config.globalProperties.$member_name = member_name;

app.use(router);
app.mount('#app');

