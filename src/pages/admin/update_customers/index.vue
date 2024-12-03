<template>
  <div>
    <h1>Cập nhật khách hàng</h1>
    <form @submit.prevent="updateCustomer">
      <div>
        <label for="name">Tên:</label>
        <input type="text" v-model="customer.name" id="name" required />
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="customer.email" id="email" required />
      </div>
      <div>
        <label for="phone">Số điện thoại:</label>
        <input type="text" v-model="customer.phone" id="phone" required />
      </div>
      <div>
        <label for="address">Địa chỉ:</label>
        <input type="text" v-model="customer.address" id="address" required />
      </div>
      <button type="submit">Cập nhật</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const customerId = route.params.id;
const customer = ref({
  name: "",
  email: "",
  phone: "",
  address: "",
});

const fetchCustomerData = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/customers/${customerId}`
    );
    customer.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khách hàng:", error);
  }
};

const updateCustomer = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3000/customers/${customerId}`,
      customer.value
    );
    if (response.status === 200) {
      alert("Cập nhật thông tin thành công!");
      router.push("/admin/customers"); // Điều hướng về trang danh sách khách hàng
    } else {
      alert("Cập nhật thông tin thất bại!");
    }
  } catch (error) {
    console.error("Có lỗi khi cập nhật thông tin:", error);
    alert("Cập nhật thông tin thất bại!");
  }
};

onMounted(() => {
  fetchCustomerData();
});
</script>


<style scoped>
.edit-customer {
  max-width: 400px; /* Giảm chiều rộng form để cân đối */
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9; /* Nền nhẹ */
  border-radius: 8px; /* Bo tròn góc */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Bóng mờ nhẹ */
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Khoảng cách giữa các phần tử */
}

form .form-group {
  display: flex;
  flex-direction: column;
}

form label {
  font-weight: bold;
  margin-bottom: 5px; /* Khoảng cách dưới label */
  font-size: 14px; /* Font chữ nhỏ hơn cho label */
  color: #333;
}

form input {
  width: 100%; /* Đồng nhất chiều rộng */
  padding: 10px;
  font-size: 14px; /* Font chữ phù hợp */
  border: 1px solid #ccc; /* Viền input */
  border-radius: 4px;
  box-sizing: border-box; /* Đảm bảo không bị tràn */
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #4caf50; /* Viền xanh khi focus */
  outline: none; /* Loại bỏ viền mặc định */
}

button {
  padding: 10px 15px; /* Rút ngắn kích thước nút */
  font-size: 14px; /* Font chữ nhỏ hơn để cân đối */
  cursor: pointer;
  border: none;
  border-radius: 4px;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button[type="submit"] {
  background-color: #4caf50;
  color: white;
  align-self: flex-end; /* Căn nút về phía cuối */
}

button[type="submit"]:hover {
  background-color: #45a049;
  transform: scale(1.05);
}

button[type="button"] {
  background-color: #f44336;
  color: white;
}

button[type="button"]:hover {
  background-color: #d32f2f;
  transform: scale(1.05);
}
</style>

