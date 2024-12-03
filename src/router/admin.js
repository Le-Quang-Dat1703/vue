const adminRoutes = [
    {
        path: '/admin',
        component: () => import('../layouts/admin.vue'), // Layout admin
        children: [
            {
                path: '',
                name: 'admin.dashboard',
                component: () => import('../pages/admin/dashboard.vue') // Dashboard
            },
            {
                path: 'customers',
                name: 'admin.customers',
                component: () => import('../pages/admin/customers/index.vue') // Quản lý người dùng
            },
            {
                path: 'add_customers',
                name: 'admin.add_customers',
                component: () => import('../pages/admin/add_customers/index.vue') // Quản lý người dùng

            },
            {
                path: "update_customers/:id",
                name: "admin.update_customers",
                component: () => import('../pages/admin/update_customers/index.vue'),
            },

            {
                path: 'add_produc', // Khi truy cập "/admin/products"
                name: 'admin.add_produc',
                component: () => import('../pages/admin/add_produc/index.vue') // Quản lý sản phẩm
            },
            {
                path: 'update_produc/:id', // Khi truy cập "/admin/products"
                name: 'admin.update_produc',
                component: () => import('../pages/admin/update_produc/index.vue') // Quản lý sản phẩm
            },
            {
                path: 'posts', // Khi truy cập "/admin/posts"
                name: 'admin.posts',
                component: () => import('../pages/admin/posts/index.vue') // Quản lý bài viết
            },
            {
                path: 'orders', // Khi truy cập "/admin/orders"
                name: 'admin.order',
                component: () => import('../pages/admin/order/index.vue') // Quản lý bài viết
            },

        ]
    }
];

export default adminRoutes;
