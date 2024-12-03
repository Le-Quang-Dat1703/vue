const sellerRoutes = [
    {
        path: '/seller',
        component: () => import('../layouts/seller.vue'), // Layout seller
        children: [
            {
                path: '',
                name: 'seller.dashboard',
                component: () => import('../pages/seller/dashboard.vue') // Dashboard
            },
            {
                path: 'customers',
                name: 'seller.customers',
                component: () => import('../pages/seller/customers/index.vue') // Quản lý người dùng
            },
            {
                path: 'posts', // Khi truy cập "/seller/posts"
                name: 'seller.posts',
                component: () => import('../pages/seller/posts/index.vue') // Quản lý bài viết
            },
            {
                path: 'orders', // Khi truy cập "/seller/orders"
                name: 'seller.order',
                component: () => import('../pages/seller/order/index.vue') // Quản lý bài viết
            },

        ]
    }
];

export default sellerRoutes;
