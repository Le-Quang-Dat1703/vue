<template>
  <div class="add-customer">
    <h1>Thêm khách hàng</h1>
    <form @submit.prevent="addCustomer">
      <div>
        <label for="name">Tên:</label>
        <input type="text" v-model="customers.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="customers.email" id="email" required />
      </div>
      <div>
        <label for="phone">Số điện thoại:</label>
        <input type="text" v-model="customers.phone" id="phone" required />
      </div>
      <div>
        <label for="address">Địa chỉ:</label>
        <input type="text" v-model="customers.address" id="address" required />
      </div>
      <button type="submit">Thêm khách hàng</button>
    </form>
  </div>
</template>


<script setup>
import { nextTick, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const customers = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});
const message = ref("");
const router = useRouter();

const addCustomer = async () => {
  try {
    const response = await axios.post(
      "http://localhost:3000/customers",
      customers.value
    );
    if (response.status === 201) {
      message.value = "Khách hàng đã được thêm thành công!";
      customers.value = {
        name: "",
        email: "",
        phone: "",
        address: "",
      };
      // Điều hướng sau khi thêm thành công
      router.push("/admin/customers");
    }
    console.log(response.data);
  } catch (error) {
    console.error("Lỗi khi thêm khách hàng", error);
  }
};
</script>
<style scoped>
.add-customer {
  max-width: 400px; /* Chiều rộng vừa phải */
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* Màu nền nhẹ */
  border-radius: 8px; /* Bo tròn góc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Thêm bóng mờ */
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Khoảng cách giữa các phần tử */
}

form label {
  font-weight: bold;
  margin-bottom: 5px; /* Khoảng cách giữa label và input */
  font-size: 14px;
  color: #333;
}

form input {
  width: 100%; /* Đồng nhất chiều rộng */
  padding: 10px;
  font-size: 14px; /* Font chữ vừa phải */
  border: 1px solid #ccc; /* Thêm viền cho input */
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #4caf50; /* Viền màu xanh khi focus */
  outline: none; /* Loại bỏ viền mặc định */
}

button {
  padding: 10px 15px; /* Kích thước nút gọn hơn */
  font-size: 14px; /* Font chữ phù hợp */
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  align-self: flex-end; /* Căn nút về cuối */
}

button[type="submit"]:hover {
  background-color: #45a049;
  transform: scale(1.05); /* Phóng to nhẹ khi hover */
}
</style>

