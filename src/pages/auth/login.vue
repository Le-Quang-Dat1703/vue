<template>
  <div class="login-container">
    <h1>Đăng nhập</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label for="username">Tên đăng nhập:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn-submit">Đăng nhập</button>
    </form>
    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      error: null,
      users: [], // Dữ liệu người dùng từ db.json
    };
  },
  methods: {
    async handleLogin() {
      try {
        // Lấy danh sách người dùng từ db.json
        const response = await axios.get("http://localhost:3000/users");
        this.users = response.data;

        // Kiểm tra thông tin đăng nhập
        const user = this.users.find(
          (user) =>
            user.username === this.username && user.password === this.password
        );

        if (user) {
          localStorage.setItem("isLoggedIn", "true");
          this.$router.push("/admin"); // Chuyển đến trang quản lý
        } else {
          this.error = "Tên đăng nhập hoặc mật khẩu không đúng.";
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        this.error = "Có lỗi xảy ra, vui lòng thử lại!";
      }
    },
  },
};
</script>

<style scoped>
/* Container chung */
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  font-family: Arial, sans-serif;
}

/* Tiêu đề */
.login-container h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #343a40;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group label {
  font-weight: bold;
  color: #495057;
  margin-bottom: 5px;
  display: block;
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
}

.form-group input:focus {
  outline: none;
  border-color: #80bdff;
  box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

/* Nút submit */
.btn-submit {
  padding: 10px 15px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-submit:hover {
  background-color: #0056b3;
}

/* Thông báo lỗi */
.error-message {
  color: #dc3545;
  margin-top: 15px;
  font-size: 14px;
}
</style>
