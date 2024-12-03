<template>
  <div>
    <canvas id="salesChart"></canvas>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Chart } from "chart.js";

// Đăng ký các thành phần của Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

export default defineComponent({
  setup() {
    const chartData = ref({});
    const products = ref([]);
    const orders = ref([]);

    // Lấy dữ liệu sản phẩm và đơn hàng
    onMounted(async () => {
      try {
        // Lấy dữ liệu sản phẩm và đơn hàng
        const productResponse = await axios.get(
          "http://localhost:3000/products"
        );
        const orderResponse = await axios.get("http://localhost:3000/orders");

        products.value = productResponse.data;
        orders.value = orderResponse.data;

        // Tính số lượng bán ra của từng sản phẩm
        const sales = calculateSales(products.value, orders.value);

        // Vẽ biểu đồ
        renderChart(sales);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    });

    function calculateSales(products, orders) {
      const salesData = {};

      // Duyệt qua các đơn hàng
      orders.forEach((order) => {
        order.productIds.forEach((productId) => {
          // Tìm sản phẩm tương ứng và tính số lượng bán
          const product = products.find((p) => p.id === String(productId));
          if (product) {
            if (salesData[product.name]) {
              salesData[product.name]++;
            } else {
              salesData[product.name] = 1;
            }
          }
        });
      });

      return salesData;
    }

    function renderChart(sales) {
      const labels = Object.keys(sales);
      const data = Object.values(sales);

      // Vẽ biểu đồ
      new Chart(document.getElementById("salesChart"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Số lượng bán",
              data: data,
              backgroundColor: "#007bff",
              borderColor: "#0056b3",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: "Sản phẩm",
              },
            },
            y: {
              title: {
                display: true,
                text: "Số lượng bán",
              },
              beginAtZero: true,
            },
          },
        },
      });
    }

    return { chartData };
  },
});
</script>

<style scoped>
#salesChart {
  width: 100%;
  height: 400px;
}
</style>
