<template>
  <div class="dashboard">
    <h1>Thống kê tổng quan</h1>
    <div class="stats">
      <div class="stat-card">
        <h2>Tổng doanh thu</h2>
        <p>{{ totalRevenue }} VND</p>
      </div>
      <div class="stat-card">
        <h2>Số lượng đơn hàng</h2>
        <p>{{ totalOrders }}</p>
      </div>
      <div class="stat-card">
        <h2>Sản phẩm bán chạy nhất</h2>
        <p>{{ mostSoldProduct }}</p>
      </div>
      <div class="stat-card">
        <h2>Số lượng khách hàng</h2>
        <p>{{ totalCustomers }}</p>
      </div>
      <div class="stat-card">
        <h2>Số đơn hàng chưa xử lý</h2>
        <p>{{ pendingOrders }}</p>
      </div>
    </div>
    <div>
      <thongkesanpham />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

// Các biến lưu dữ liệu
const products = ref([]); // Dữ liệu sản phẩm
const users = ref([]); // Dữ liệu người dùng
const totalRevenue = ref(0); // Tổng doanh thu
const totalOrders = ref(0); // Số lượng đơn hàng
const mostSoldProduct = ref(""); // Sản phẩm bán chạy nhất
const totalCustomers = ref(0); // Số khách hàng
const pendingOrders = ref(0); // Số đơn hàng chưa xử lý

// Hàm lấy dữ liệu sản phẩm
const fetchProducts = async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    products.value = response.data;
  } catch (error) {
    console.error("Lỗi khi lấy sản phẩm:", error);
  }
};

// Hàm lấy dữ liệu người dùng
const fetchUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3000/users");
    users.value = response.data;
    totalCustomers.value = users.value.length; // Tính số khách hàng
  } catch (error) {
    console.error("Lỗi khi lấy người dùng:", error);
  }
};

// Hàm lấy dữ liệu đơn hàng và tính tổng doanh thu
const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3000/orders");
    const orders = response.data;

    // Tính tổng doanh thu
    totalRevenue.value = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    );
    totalOrders.value = orders.length;

    // Tính sản phẩm bán chạy nhất
    const productSaleCount = {};
    orders.forEach((order) => {
      order.productIds.forEach((productId) => {
        productSaleCount[productId] = (productSaleCount[productId] || 0) + 1;
      });
    });

    const mostSoldProductId = Object.keys(productSaleCount).reduce((a, b) =>
      productSaleCount[a] > productSaleCount[b] ? a : b
    );
    const mostSoldProductData = products.value.find(
      (product) => product.id === parseInt(mostSoldProductId)
    );
    mostSoldProduct.value = mostSoldProductData
      ? mostSoldProductData.name
      : "Không có dữ liệu";

    // Tính số đơn hàng chưa xử lý
    pendingOrders.value = orders.filter(
      (order) => order.status === "Chờ xác nhận"
    ).length;
  } catch (error) {
    console.error("Lỗi khi lấy đơn hàng:", error);
  }
};

// Gọi các hàm lấy dữ liệu khi component được mounted
onMounted(() => {
  fetchProducts();
  fetchUsers();
  fetchOrders(); // Gọi thêm hàm lấy đơn hàng
});
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.stat-card {
  background: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
h2 {
  font-size: 18px;
  color: #333;
}
p {
  font-size: 24px;
  color: #007bff;
  font-weight: bold;
}
</style>
