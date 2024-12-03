<template>
  <div class="admin-panel">
    <nav class="sidebar">
      <div class="logo">
        <div><img src="../assets/logo.png" alt="" style="margin: 0px"/></div>

        <div><button class="logout-btn" style="margin: 0px" @click="logout">Đăng xuất</button></div>
      </div>

      <ul>
        <li><router-link to="/admin">Thông kê</router-link></li>
        <li><router-link to="/admin/customers">Khách hàng</router-link></li>

        <li><router-link to="/admin/posts">Sản phẩm</router-link></li>
        <li>
          <router-link to="/admin/orders">Đơn Hàng</router-link>
        </li>
      </ul>
    </nav>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

// Hàm logout
const router = useRouter();

const logout = () => {
  localStorage.removeItem("isLoggedIn");
  router.push("/login");
};
</script>

<style scoped>
.logo {
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
}
.logout-btn {
  height: 50px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 15px;
  margin-left: 10px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

img {
  margin-left: 20px;
  width: 100px;
  height: 100px;
  border-radius: 100%;
}
.main-content {
  display: flex;
}
/* Giao diện tổng thể */
.admin-panel {
  margin-top: 70px;
  display: flex;
  height: 100vh;
}
ul {
  margin-top: 250px;
}
/* Thanh bên trái (menu) */
.sidebar {
  background-color: #333;
  color: #fff;
  width: 200px;
  padding: 15px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  margin-bottom: 10px;
}

.sidebar a {
  text-decoration: none;
  color: #fff;
  display: block;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.sidebar a:hover {
  background-color: #575757;
}

/* Khu vực nội dung */
.content {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

/* Container */
.container {
  display: flex;
  min-height: 100vh; /* Chiều cao tối thiểu bằng chiều cao cửa sổ trình duyệt */
}

/* Sidebar (Bên trái) */
.sidebar {
  width: 250px; /* Độ rộng của sidebar */
  position: fixed; /* Sidebar cố định */
  top: 0;
  left: 0;
  height: 100vh; /* Chiều cao của sidebar chiếm toàn bộ màn hình */
  background-color: #333; /* Màu nền của sidebar */
  color: #fff;
  padding-top: 20px;
  z-index: 100; /* Đảm bảo sidebar hiển thị phía trên */
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  padding: 10px 20px;
}

.sidebar a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  display: block;
}

.sidebar a:hover {
  background-color: #555; /* Thay đổi màu khi hover */
}

/* Content (Phía bên phải) */
.content {
  margin-left: 250px; /* Để tránh nội dung bị che khuất phía sidebar */
  padding: 20px;
  width: calc(100% - 250px); /* Đảm bảo content chiếm phần còn lại */
  overflow-y: auto; /* Cho phép cuộn dọc nếu nội dung vượt quá chiều cao */
  height: 100vh; /* Chiều cao đầy đủ của content */
}
</style>
