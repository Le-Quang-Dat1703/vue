


<template>
  <div class="customer-table">
    <div class="product-list">
      <div><h1>Danh sách sản phẩm</h1></div>
      <div>
        <button>
          <router-link to="/seller/add_customers">Thêm sản phẩm</router-link>
        </button>
      </div>
    </div>
    <table>
      <thead>
        <tr>
          <th>Tên</th>
          <th>Email</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Sửa/Xóa</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <td>{{ customer.address }}</td>
          <td class="product-actions" style="text-align: center">
            <button class="edit-btn">
              <router-link
                class="edit-link"
                :to="`/seller/update_customers/${customer.id}`"
                >Sửa</router-link
              >
            </button>
            <button class="delete-btn" @click="deleteProduct(customer.id)">
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

const customers = ref([]);

const fetchData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/customers");
    customers.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = (id) => {
  if (confirm("Ban co chac chan muon xoa khach hang nay khong?")) {
    axios
      .delete(`http://localhost:3000/customers/${id}`)
      .then(() => {
        alert("Xoa khach hang thanh cong!");
        fetchData();
      })
      .catch((error) => {
        alert("Xoa khach hang that bai!");
        console.error("Loi khi xoa khach hang:", error);
      });
  }
};
onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.product-actions {
  display: flex;
  justify-content: space-evenly;
  gap: 5px;
}

.edit-btn,
.delete-btn {
  padding: 10px;
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
.customer-table {
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
}
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

table {
  width: 100%;
  border-collapse: collapse;
}

thead {
  background-color: #a1a1a1;
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
</style>
