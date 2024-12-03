<template>
  <div class="dashboard">
    <h1>Thêm Sản Phẩm</h1>
    <form @submit.prevent="addProduct">
      <div>
        <label for="name">Tên sản phẩm:</label>
        <input type="text" v-model="product.name" id="name" required />
      </div>

      <div>
        <label for="price">Giá:</label>
        <input type="number" v-model="product.price" id="price" required />
      </div>

      <div>
        <label for="category">Danh mục:</label>
        <input type="text" v-model="product.category" id="category" required />
      </div>

      <div>
        <label for="quantity">Số lượng:</label>
        <input
          type="number"
          v-model="product.quantity"
          id="quantity"
          required
        />
      </div>

      <div>
        <label for="description">Mô tả:</label>
        <textarea
          v-model="product.description"
          id="description"
          required
        ></textarea>
      </div>

      <div>
        <label for="imageUrl">URL Hình ảnh:</label>
        <input type="text" v-model="product.imageUrl" id="imageUrl" required />
      </div>

      <button type="submit">Thêm sản phẩm</button>
    </form>

    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

// Dữ liệu sản phẩm
const product = ref({
  name: "",
  price: 0,
  category: "",
  quantity: 0,
  description: "",
  imageUrl: "",
});

// Thông báo sau khi thêm sản phẩm thành công
const message = ref("");

// Hàm thêm sản phẩm
const addProduct = async () => {
  try {
    // Gửi yêu cầu POST đến API để thêm sản phẩm
    const response = await axios.post(
      "http://localhost:3000/products",
      product.value
    );

    // Kiểm tra thành công và hiển thị thông báo
    if (response.status === 201) {
      message.value = "Sản phẩm đã được thêm thành công!";

      // Reset form sau khi thêm
      product.value = {
        name: "",
        price: 0,
        category: "",
        quantity: 0,
        description: "",
        imageUrl: "",
      };
    }
  } catch (error) {
    message.value = "Có lỗi xảy ra khi thêm sản phẩm.";
    console.error("Lỗi khi thêm sản phẩm:", error);
  }
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

form div {
  margin-bottom: 10px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

p {
  color: green;
  font-weight: bold;
}
</style>
