<template>
  <div>
    <h1>Cap nhat san pham</h1>
    <form @submit.prevent="updateProduct">
      <div>
        <label for="name">Ten:</label>
        <input type="text" v-model="product.name" id="name" required />
      </div>
      <div>
        <label for="price">Gia:</label>
        <input type="number" v-model="product.price" id="price" required />
      </div>
      <div>
        <label for="category">Danh muc:</label>
        <input type="text" v-model="product.category" id="category" required />
      </div>
      <div>
        <label for="quantity">So luong:</label>
        <input
          type="number"
          v-model="product.quantity"
          id="quantity"
          required
        />
      </div>
      <div>
        <label for="description">Mieu ta:</label>
        <input
          type="text"
          v-model="product.description"
          id="description"
          required
        />
      </div>
      <div>
        <label for="imageUrl">Anh:</label>
        <input type="text" v-model="product.imageUrl" id="imageUrl" required />
      </div>
      <button type="submit">Cap nhat</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const productID = route.params.id;
const product = ref({
  name: "",
  price: 0,
  category: "",
  quantity: 0,
  description: "",
  imageUrl: "",
});

const getProduct = async () => {
  try {
    const response = await axios.get(
      `http://localhost:3000/products/${productID}`
    );
    product.value = response.data;
  } catch (error) {
    console.error("Khong thay thong tin khach hang:", error);
  }
};
const updateProduct = async () => {
  try {
    const response = await axios.put(
      `http://localhost:3000/products/${productID}`,
      product.value
    );
    if (response.status === 200) {
      alert("Cap nhat thong tin thanh cong!");
      router.push("/admin/posts");
    }
  } catch (error) {
    console.error("Loi khi cap nhat thong tin:", error);
    alert("Cap nhat thong tin that bai!");
  }
};
onMounted(() => {
  getProduct();
});
</script>


<style scoped>
/* Bao quanh form */
form {
  max-width: 600px;
  margin: 0 auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Tiêu đề */
h1 {
  text-align: center;

  color: #333;
  margin-bottom: 20px;
}

/* Các nhóm label và input */
form div {
  display: flex;
  flex-direction: column;
}

form label {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

form input {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: border-color 0.3s;
}

form input:focus {
  border-color: #4caf50;
  outline: none;
}

/* Nút gửi */
button {
  padding: 10px;
  font-size: 16px;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #45a049;
}

/* Responsive cho màn hình nhỏ */
@media (max-width: 768px) {
  form {
    padding: 15px;
  }

  form label,
  form input,
  button {
    font-size: 14px;
  }
}
</style>
