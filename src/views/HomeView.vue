<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const exchangeRates = ref([]);

onMounted(async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/exchange-rates');
    exchangeRates.value = response.data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
  }
});
</script>

<template>
  <main class="container mt-5">
    <h1 class="mb-4">Exchange Rates</h1>
    <p>
      The most recent exchange rates of the euro against foreign currencies are displayed below. For historical exchange rates, click on the respective currency link.
    </p>
    <div v-if="exchangeRates.length">
      <table class="table table-striped">
        <thead>
        <tr>
          <th scope="col">Currency</th>
          <th scope="col">Currency Name</th>
          <th scope="col">Location</th>
          <th scope="col">Rate</th>
          <th scope="col">Date</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="rate in exchangeRates" :key="rate.id">
          <td>
            <RouterLink :to="{ name: 'history', params: { currency: rate.currency } }">{{ rate.currency }}</RouterLink>
          </td>
          <td>{{ rate.currencyName }}</td>
          <td>{{ rate.entityLocation }}</td>
          <td>{{ rate.rate }}</td>
          <td>{{ rate.date }}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>Loading exchange rates...</p>
    </div>
  </main>
</template>
