<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const currency = route.params.currency;
const exchangeRates = ref([]);
const currencyName = ref('');
const currencyLocation = ref('');

onMounted(async () => {
  try {
    const response = await axios.get(`http://localhost:8080/api/exchange-rates/history/${currency}`);
    exchangeRates.value = response.data;

    if (exchangeRates.value.length > 0) {
      currencyName.value = exchangeRates.value[0].currencyName;
      currencyLocation.value = exchangeRates.value[0].entityLocation;
    }
  } catch (error) {
    console.error("Error fetching exchange rates history:", error);
  }
});


function formatRate(rate) {
  return rate.toFixed(4); // Adjust the number of decimal places as needed
}
</script>

<template>
  <main class="container mt-5">
    <h1 class="mb-4">Exchange Rate History for {{ currency }}</h1>
    <p>The exchange rates of the euro against foreign currencies of the European Central Bank (included in database since 30/09/2014) are presented according to their announcement date.</p>
    <div v-if="exchangeRates.length">
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
    </div>
    <div v-else>
      <p>Loading exchange rates history...</p>
    </div>
  </main>
</template>

<style>

</style>
