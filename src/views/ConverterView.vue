<script setup>
import { computed, ref, watch } from 'vue'
import axios from 'axios'

const currencies = ref([
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'Pound Sterling' },
  { code: 'USD', name: 'US Dollar' },
  { code: 'DKK', name: 'Danish Krone' },
  { code: 'NOK', name: 'Norwegian Krone' },
  { code: 'SEK', name: 'Swedish Krona' },
  { code: 'PLN', name: 'Zloty' },
  { code: 'HUF', name: 'Forint' },
  { code: 'CZK', name: 'Czech Koruna' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'ISK', name: 'Iceland Krona' },
  { code: 'AED', name: 'UAE Dirham' },
  { code: 'AFN', name: 'Afghani' },
  { code: 'ALL', name: 'Lek' },
  { code: 'AMD', name: 'Armenian Dram' },
  { code: 'ARS', name: 'Argentine Peso' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'AZN', name: 'Azerbaijan Manat' },
  { code: 'BAM', name: 'Convertible Mark' },
  { code: 'BDT', name: 'Taka' },
  { code: 'BGN', name: 'Bulgarian Lev' },
  { code: 'BHD', name: 'Bahraini Dinar' },
  { code: 'BOB', name: 'Boliviano' },
  { code: 'BRL', name: 'Brazilian Real' },
  { code: 'BYN', name: 'Belarusian Ruble' },
  { code: 'CLP', name: 'Chilean Peso' },
  { code: 'CNY', name: 'Yuan Renminbi' },
  { code: 'COP', name: 'Colombian Peso' },
  { code: 'DJF', name: 'Djibouti Franc' },
  { code: 'DZD', name: 'Algerian Dinar' },
  { code: 'EGP', name: 'Egyptian Pound' },
  { code: 'ETB', name: 'Ethiopian Birr' },
  { code: 'GEL', name: 'Lari' },
  { code: 'GNF', name: 'Guinean Franc' },
  { code: 'HKD', name: 'Hong Kong Dollar' },
  { code: 'IDR', name: 'Rupiah' },
  { code: 'ILS', name: 'New Israeli Sheqel' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'IQD', name: 'Iraqi Dinar' },
  { code: 'IRR', name: 'Iranian Rial' },
  { code: 'JOD', name: 'Jordanian Dinar' },
  { code: 'JPY', name: 'Yen' },
  { code: 'KES', name: 'Kenyan Shilling' },
  { code: 'KGS', name: 'Som' },
  { code: 'KRW', name: 'Won' },
  { code: 'KWD', name: 'Kuwaiti Dinar' },
  { code: 'KZT', name: 'Tenge' },
  { code: 'LBP', name: 'Lebanese Pound' },
  { code: 'LKR', name: 'Sri Lanka Rupee' },
  { code: 'LYD', name: 'Libyan Dinar' },
  { code: 'MAD', name: 'Moroccan Dirham' },
  { code: 'MDL', name: 'Moldovan Leu' },
  { code: 'MGA', name: 'Malagasy Ariary' },
  { code: 'MKD', name: 'Denar' },
  { code: 'MNT', name: 'Tugrik' },
  { code: 'MXN', name: 'Mexican Peso' },
  { code: 'MYR', name: 'Malaysian Ringgit' },
  { code: 'MZN', name: 'Mozambique Metical' },
  { code: 'NZD', name: 'New Zealand Dollar' },
  { code: 'PAB', name: 'Balboa' },
  { code: 'PEN', name: 'Sol' },
  { code: 'PHP', name: 'Philippine Peso' },
  { code: 'PKR', name: 'Pakistan Rupee' },
  { code: 'QAR', name: 'Qatari Rial' },
  { code: 'RON', name: 'Romanian Leu' },
  { code: 'RSD', name: 'Serbian Dinar' },
  { code: 'RUB', name: 'Russian Ruble' },
  { code: 'SAR', name: 'Saudi Riyal' },
  { code: 'SGD', name: 'Singapore Dollar' },
  { code: 'SYP', name: 'Syrian Pound' },
  { code: 'THB', name: 'Baht' },
  { code: 'TJS', name: 'Somoni' },
  { code: 'TMT', name: 'Turkmenistan New Manat' },
  { code: 'TND', name: 'Tunisian Dinar' },
  { code: 'TRY', name: 'Turkish Lira' },
  { code: 'TWD', name: 'New Taiwan Dollar' },
  { code: 'TZS', name: 'Tanzanian Shilling' },
  { code: 'UAH', name: 'Hryvnia' },
  { code: 'UYU', name: 'Peso Uruguayo' },
  { code: 'UZS', name: 'Uzbekistan Sum' },
  { code: 'VES', name: 'Bolívar Soberano' },
  { code: 'VND', name: 'Dong' },
  { code: 'XAF', name: 'CFA Franc BEAC' },
  { code: 'XOF', name: 'CFA Franc BCEAO' },
  { code: 'YER', name: 'Yemeni Rial' },
  { code: 'ZAR', name: 'Rand' }
])

const conversionRequest = ref({
  fromCurrency: '',
  toCurrency: '',
  amount: null
})

const conversionResult = ref(null)

const convertCurrency = async () => {
  if (conversionRequest.value.fromCurrency && conversionRequest.value.toCurrency && conversionRequest.value.amount && conversionRequest.value.fromCurrency !== conversionRequest.value.toCurrency) {
    try {
      const response = await axios.post('http://localhost:8080/api/convert', conversionRequest.value)
      conversionResult.value = response.data
    } catch (error) {
      console.error('Error converting currency:', error)
    }
  }
}

const isEuroInvolved = computed(() => {
  return conversionRequest.value.fromCurrency === 'EUR' || conversionRequest.value.toCurrency === 'EUR';
});

watch(conversionRequest, () => {
  if (conversionRequest.value.fromCurrency && conversionRequest.value.toCurrency && conversionRequest.value.amount) {
    convertCurrency();
  }
}, { deep: true });

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
              <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="toCurrency">To Currency:</label>
            <select v-model="conversionRequest.toCurrency" id="toCurrency" class="form-control" required>
              <option v-for="currency in currencies" :key="currency.code" :value="currency.code">
                {{ currency.code }} - {{ currency.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-6">
          <div class="form-group">
            <label for="amount">Amount to be converted:</label>
            <input v-model="conversionRequest.amount" type="number" id="amount" class="form-control" required>
          </div>
        </div>
      </div>
    </form>
    <div v-if="conversionResult !== null" class="mt-4">
      <h2>Converted Amount: {{ conversionResult.convertedAmount.toFixed(5) }} {{conversionRequest.toCurrency}}</h2>
      <p v-if="!isEuroInvolved">From {{conversionRequest.fromCurrency}} to EUR Currency Rate: {{ conversionResult.fromCurrencyRate }}</p>
      <p v-if="!isEuroInvolved">From EUR to {{conversionRequest.toCurrency}} Currency Rate: {{ conversionResult.toCurrencyRate }}</p>
      <p v-else-if="conversionRequest.fromCurrency === 'EUR'">From EUR to {{conversionRequest.toCurrency}} Currency Rate: {{ conversionResult.toCurrencyRate }}</p>
      <p v-else>From {{conversionRequest.fromCurrency}} to EUR Currency Rate: {{ conversionResult.fromCurrencyRate }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

</style>