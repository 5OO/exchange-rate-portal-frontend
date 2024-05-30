<script setup>
import { ref } from 'vue';
import axios from 'axios';

const amount = ref(0);
const selectedCurrency = ref('');
const convertedAmount = ref(null);

const currencies = ['USD', 'EUR', 'GBP']; // Add more as needed

const convertCurrency = async () => {
  try {
    const response = await axios.get(`/api/exchange-rates?currency=${selectedCurrency.value}`);
    const rate = response.data.rate;
    convertedAmount.value = amount.value * rate;
  } catch (error) {
    console.error("Error converting currency:", error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Currency Calculator</h1>
    <form @submit.prevent="convertCurrency">
      <div class="mb-3">
        <label for="amount" class="form-label">Amount</label>
        <input type="number" id="amount" v-model="amount" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="currency" class="form-label">Currency</label>
        <select id="currency" v-model="selectedCurrency" class="form-select" required>
          <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Convert</button>
    </form>
    <div v-if="convertedAmount !== null" class="mt-4">
      <p>Converted Amount: {{ convertedAmount }}</p>
    </div>
  </div>
</template>

<style scoped>

</style>