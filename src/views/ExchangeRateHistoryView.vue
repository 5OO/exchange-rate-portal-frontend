<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'

const route = useRoute()
const currency = route.params.currency
const exchangeRates = ref([])
const currencyName = ref('')
const currencyLocation = ref('')
const currentPage = ref(0)
const pageSize = ref(250)
const totalPages = ref(0)
const loading = ref(true)
const error = ref(null)

const fetchRates = async (page, size) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/exchange-rates/history/${currency}`, {
      params: {
        page,
        size
      }
    })

    const data = response.data._embedded.exchangeRateDTOList
    exchangeRates.value = data
    totalPages.value = response.data.page.totalPages

    if (exchangeRates.value.length > 0) {
      currencyName.value = exchangeRates.value[0].currencyName
      currencyLocation.value = exchangeRates.value[0].entityLocation
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'An error occurred while fetching exchange rates history'
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchRates(currentPage.value, pageSize.value)
})

const goToPage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    fetchRates(currentPage.value, pageSize.value)
  }
}

const formatRate = (rate) => {
  return rate.toFixed(4)
}
</script>

<template>
  <main class="container mt-5">
    <h1 class="mb-4">Exchange Rate History for {{ currency }}</h1>
    <p>The exchange rates of the euro against foreign currencies of the European Central Bank (included in database
      since 30/09/2014) are presented according to their announcement date.</p>
    <div v-if="loading">
      <p>Loading exchange rates history...</p>
    </div>
    <div v-else>
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
      <div v-else-if="exchangeRates.length">
        <p>Currency name: {{ currencyName }}</p>
        <p>Currency location: {{ currencyLocation }}</p>
        <table class="table table-striped">
          <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Currency</th>
            <th scope="col">Rate</th>
            <th scope="col">Currency Name</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="rate in exchangeRates" :key="rate.date">
            <td>{{ rate.date }}</td>
            <td>{{ rate.currency }}</td>
            <td>{{ formatRate(rate.rate) }}</td>
            <td>{{ rate.currencyName }}</td>
          </tr>
          </tbody>
        </table>
        <div class="pagination">
          <button @click="goToPage(currentPage.value - 1)" :disabled="currentPage.value === 0">Previous</button>
          <span>Page {{ currentPage.value + 1 }} of {{ totalPages }}</span>
          <button @click="goToPage(currentPage.value + 1)" :disabled="currentPage.value === totalPages.value - 1">Next
          </button>
        </div>
      </div>
      <div v-else>
        <p>No exchange rate history found.</p>
      </div>
    </div>
  </main>
</template>

<style>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
  display: flex;
  align-items: center;
}
</style>
