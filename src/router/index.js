import { createRouter, createWebHistory } from 'vue-router';
import adminRoutes from './admin.js';


const Login = () => import('../pages/auth/Login.vue');



const routes = [

    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    ...adminRoutes
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

// Navigation Guard: kiểm tra trạng thái đăng nhập trước khi chuyển route
router.beforeEach((to, from, next) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Kiểm tra trạng thái đăng nhập

    // Chặn truy cập vào các route admin nếu chưa đăng nhập
    if (to.path.startsWith('/admin') && !isLoggedIn) {
        next('/login'); // Chuyển hướng đến trang đăng nhập
    } else {
        next(); // Cho phép tiếp tục
    }
});

export default router;
