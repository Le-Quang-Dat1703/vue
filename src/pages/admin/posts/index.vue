<template>
  <div class="dashboard">
    <div class="product-list">
      <div><h1>Danh sách sản phẩm</h1></div>
      <div>
        <button>
          <router-link to="/admin/add_produc">Thêm sản phẩm</router-link>
        </button>
      </div>
    </div>
    <div class="product-info">
      <div v-for="product in products" :key="product.id" class="product-card">
        <img
          :src="product.imageUrl || '/default-product.jpg'"
          alt="Product Image"
          class="product-image"
        />
        <div class="product-details">
          <p>
            <strong>{{ product.name }}</strong>
          </p>
          <p>Giá: {{ formatPrice(product.price) }} VND</p>
          <p>Số lượng: {{ product.quantity }}</p>
        </div>
        <div class="product-actions">
          <button class="edit-btn">
            <router-link
              class="edit-link"
              :to="`/admin/update_produc/${product.id}`"
              >Sửa</router-link
            >
          </button>
          <button @click="deleteProduct(product.id)" class="delete-btn">
            Xóa
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const products = ref([]); // Dữ liệu sản phẩm

// Hàm lấy dữ liệu sản phẩm
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    products.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

// Hàm định dạng giá sản phẩm
const formatPrice = (price) => {
  return price.toLocaleString();
};

// Hàm xóa sản phẩm
const deleteProduct = (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
    axios
      .delete(`http://localhost:3000/products/${id}`)
      .then(() => {
        alert("Xóa sản phẩm thành công!");
        fetchProducts();
      })
      .catch((error) => {
        alert("Xóa sản phẩm thất bại!");
        console.error("Lỗi khi xóa sản phẩm:", error);
      });
  }
};

// Gọi dữ liệu khi component được mounted
onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.product-list {
  display: flex;
  justify-content: space-between;
}
.product-list div h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}
.product-list div button {
  background-color: #4caf50; /* Màu nền xanh */
  color: white; /* Màu chữ */
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.product-list button:hover {
  background-color: #45a049; /* Màu khi hover */
}

.product-list button a {
  text-decoration: none; /* Loại bỏ gạch chân */
  color: inherit; /* Màu giống button */
}
.dashboard {
  padding: 20px;
}

.product-info {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.product-card {
  background: #f1f1f1;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

.product-details {
  margin-top: 10px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
}

p {
  font-size: 14px;
  color: #333;
}

strong {
  font-size: 16px;
  font-weight: bold;
}

.product-actions {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  color: #fff;
}

.edit-btn {
  background-color: #3498db;
  transition: background-color 0.3s;
}
.edit-link {
  text-decoration: none;
  color: #fff;
}

.edit-btn:hover {
  background-color: #2980b9;
}

.delete-btn {
  background-color: #e74c3c;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #c0392b;
}
</style>
