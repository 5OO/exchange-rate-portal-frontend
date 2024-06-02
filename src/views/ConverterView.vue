<script setup>
import { ref } from 'vue';
import axios from 'axios';

const currencies = ref([
  'AED', 'AFN', 'ALL', 'AMD', 'ARS', 'AUD', 'AZN', 'BAM', 'BDT', 'BGN', 'BHD', 'BOB', 'BRL', 'BYN', 'CAD', 'CHF', 'CLP', 'CNY', 'COP', 'CZK', 'DJF', 'DKK', 'DZD', 'EGP', 'ETB', 'GBP', 'GEL', 'GNF', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JOD', 'JPY', 'KES', 'KGS', 'KRW', 'KWD', 'KZT', 'LBP', 'LKR', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MNT', 'MXN', 'MYR', 'MZN', 'NOK', 'NZD', 'PAB', 'PEN', 'PHP', 'PKR', 'PLN', 'QAR', 'RON', 'RSD', 'RUB', 'SAR', 'SEK', 'SGD', 'SYP', 'THB', 'TJS', 'TMT', 'TND', 'TRY', 'TWD', 'TZS', 'UAH', 'USD', 'UYU', 'UZS', 'VES', 'VND', 'XAF', 'XOF', 'YER', 'ZAR'
]);

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
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label for="fromCurrency">From Currency:</label>
            <select v-model="conversionRequest.fromCurrency" id="fromCurrency" class="form-control" required>
              <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="toCurrency">To Currency:</label>
            <select v-model="conversionRequest.toCurrency" id="toCurrency" class="form-control" required>
              <option v-for="currency in currencies" :key="currency" :value="currency">{{ currency }}</option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <div class="form-group">
            <label for="amount">Amount:</label>
            <input v-model="conversionRequest.amount" type="number" id="amount" class="form-control" required>
          </div>
        </div>
        <div class="col-md-6 d-flex align-items-end">
          <button type="submit" class="btn btn-primary w-100">Convert</button>
        </div>
      </div>
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

.row {
  display: flex;
  align-items: center;
}

button {
  height: 100%;
  margin-top: 20px;
}
</style>