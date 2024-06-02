<script setup>
import { ref } from 'vue';
import axios from 'axios';

const conversionRequest = ref({
  fromCurrency: '',
  toCurrency: '',
  amount: null
});

const convertedAmount = ref(null);

const convertCurrency = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/convert', conversionRequest.value);
    convertedAmount.value = response.data.convertedAmount;
  } catch (error) {
    console.error('Error converting currency:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Currency Converter</h1>
    <form @submit.prevent="convertCurrency">
      <div class="form-group">
        <label for="fromCurrency">From Currency:</label>
        <input v-model="conversionRequest.fromCurrency" type="text" id="fromCurrency" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="toCurrency">To Currency:</label>
        <input v-model="conversionRequest.toCurrency" type="text" id="toCurrency" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="amount">Amount:</label>
        <input v-model="conversionRequest.amount" type="number" id="amount" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Convert</button>
    </form>
    <div v-if="convertedAmount !== null" class="mt-4">
      <h2>Converted Amount: {{ convertedAmount }}</h2>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}
</style>