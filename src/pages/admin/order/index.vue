<template>
  <div class="order-table">
    <div class="order-header">
      <div><h1>Danh sách đơn hàng</h1></div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Khách hàng</th>
          <th>Sản phẩm</th>
          <th>Tổng giá</th>
          <th>Trạng thái</th>
          <th>Ngày đặt</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id">
          <td>{{ getCustomerName(order.customerId) }}</td>
          <td>
            <ul>
              <li
                v-for="product in getProductDetails(order.productIds)"
                :key="product.id"
              >
                {{ product.name }}
              </li>
            </ul>
          </td>
          <td>{{ order.totalPrice.toLocaleString() }} VND</td>
          <td>
            <select
              v-model="order.status"
              @change="updateOrderStatus(order.id, order.status)"
            >
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Đã giao">Đã giao</option>
            </select>
          </td>
          <td>{{ order.orderDate }}</td>
          <td class="order-actions" style="text-align: center">
            <button class="delete-btn" @click="deleteOrder(order.id)">
              Xóa
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);
const customers = ref([]);
const products = ref([]);

// Lấy dữ liệu từ API
const fetchData = async () => {
  try {
    const [orderResponse, customerResponse, productResponse] =
      await Promise.all([
        axios.get("http://localhost:3000/orders"),
        axios.get("http://localhost:3000/customers"),
        axios.get("http://localhost:3000/products"),
      ]);
    orders.value = orderResponse.data;
    customers.value = customerResponse.data;
    products.value = productResponse.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
  }
};

// Lấy tên khách hàng từ ID
const getCustomerName = (customerId) => {
  const customer = customers.value.find((c) => c.id == customerId);
  return customer ? customer.name : "Không xác định";
};

// Lấy chi tiết sản phẩm từ danh sách ID
const getProductDetails = (productIds) => {
  return products.value.filter((product) => productIds.includes(product.id));
};

// Cập nhật trạng thái đơn hàng
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    await axios.patch(`http://localhost:3000/orders/${orderId}`, {
      status: newStatus,
    });
    alert("Cập nhật trạng thái thành công!");
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái:", error);
    alert("Cập nhật trạng thái thất bại!");
  }
};

// Xóa đơn hàng
const deleteOrder = (orderId) => {
  if (confirm("Bạn có chắc chắn muốn xóa đơn hàng này không?")) {
    axios
      .delete(`http://localhost:3000/orders/${orderId}`)
      .then(() => {
        alert("Xóa đơn hàng thành công!");
        fetchData();
      })
      .catch((error) => {
        console.error("Lỗi khi xóa đơn hàng:", error);
        alert("Xóa đơn hàng thất bại!");
      });
  }
};

// Tải dữ liệu khi component được mount
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.order-table {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.order-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.order-header h1 {
  font-size: 24px;
  color: #333;
}
table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #007bff;
  color: white;
}

th,
td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #ddd;
}

th {
  font-weight: bold;
  text-transform: uppercase;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.delete-btn {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
}

.delete-btn:hover {
  background-color: #e60000;
}
</style>
