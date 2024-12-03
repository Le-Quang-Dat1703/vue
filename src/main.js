// src/main.js
import { createApp } from 'vue';

import App from './App.vue';
import router from './router/index.js'; // Đảm bảo import router
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


const app = createApp(App);
app.use(router); // Đăng ký router vào ứng dụng
app.mount('#app');
