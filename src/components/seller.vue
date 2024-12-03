<template>
  <div class="bg-infoo">
    <nav class="container">
      <ul class="d-flex navigation">
        <li class="left">
          <router-link to="/seller">Trang chủ</router-link>
        </li>
        <li class="right">
          <button class="logout-btn" @click="logout">Đăng xuất</button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem("isLoggedIn");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Nút đăng xuất */
.logout-btn {
  height: 50px;
  background-color: #e74c3c;
  color: #fff;
  border: none;
  padding: 10px 15px;

  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* Đặt thanh điều hướng nằm sát lề phải */
.bg-infoo {
  background-color: #888888; /* Màu nền */
  padding: 10px 0;
  border-bottom: 3px solid #999999; /* Viền dưới */
  position: absolute; /* Để có thể căn vào lề */
  top: 0;
  right: 0; /* Đưa phần tử về phía bên phải */
  width: 84%; /* Chiếm toàn bộ chiều rộng */
}

/* Kiểu dáng cho thanh điều hướng */
.navigation {
  list-style-type: none; /* Loại bỏ dấu chấm đầu dòng */
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;

  align-items: center;
}

.navigation li {
  margin: 0 10px; /* Khoảng cách giữa các mục */
}

.navigation a {
  text-decoration: none; /* Bỏ gạch chân */
  color: rgb(255, 255, 255); /* Màu chữ */
  font-weight: bold;
  transition: color 0.3s ease; /* Hiệu ứng khi di chuột */
}

.navigation a:hover {
  color: yellow; /* Đổi màu khi di chuột */
}
/* Căn phần tử "Trang chủ" sang trái */
.left {
  margin-left: 0;
}

/* Căn phần tử "Đăng xuất" sang phải */
.right {
  margin-left: auto;
}
</style>
