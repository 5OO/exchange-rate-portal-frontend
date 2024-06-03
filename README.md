# Exchange Rate Portal Frontend

## Description

This is the frontend for the Exchange Rate Portal, a web application that provides functionalities for viewing ECB central bank exchange rates, historical exchange rates, and currency conversion. The frontend is built using Vue 3, Vite, and Bootstrap for styling.

## Technologies Used

- **Framework**: Vue 3
- **Build Tool**: Vite
- **CSS Framework**: Bootstrap

## Functionality

1. **Home View**:
    - Displays the latest exchange rates fetched from the Bank of Lithuania.
    - Provides links to view historical exchange rates for each currency.
![Screenshot 2024-06-03 at 01.57.59.png](..%2F..%2F..%2F..%2FUsers%2FKristi%2FDocuments%2Fekraanit%C3%B5mmis%2FScreenshot%202024-06-03%20at%2001.57.59.png)
2. **Exchange Rate History View**:
    - Displays the historical exchange rates for a selected currency.
    - Supports pagination for easy navigation through historical data.
![Screenshot 2024-06-03 at 01.58.20.png](..%2F..%2F..%2F..%2FUsers%2FKristi%2FDocuments%2Fekraanit%C3%B5mmis%2FScreenshot%202024-06-03%20at%2001.58.20.png)
3. **Currency Converter View**:
    - Allows users to enter an amount and select currencies to convert between.
    - Displays the converted amount using the latest exchange rates.
![Screenshot 2024-06-03 at 02.15.04.png](..%2F..%2F..%2F..%2FUsers%2FKristi%2FDocuments%2Fekraanit%C3%B5mmis%2FScreenshot%202024-06-03%20at%2002.15.04.png)

    - ![Screenshot 2024-06-03 at 01.59.11.png](..%2F..%2F..%2F..%2FUsers%2FKristi%2FDocuments%2Fekraanit%C3%B5mmis%2FScreenshot%202024-06-03%20at%2001.59.11.png)
## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/5OO/exchange-rate-portal-frontend
   cd exchange-rate-portal-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

   After running the development server, the application will be available at:
   ```
   ➜  Local:   http://localhost:5173/
   ➜  Network: use --host to expose
   ➜  Vue DevTools: Open http://localhost:5173/__devtools__/ as a separate window
   ➜  Vue DevTools: Press Option(⌥)+Shift(⇧)+D in App to toggle the Vue DevTools
   ```
### Compile and Minify for Production

   ```bash
   npm run build
   ```
## Project Structure

- **HomeView**: Lists the latest exchange rates.
- **ExchangeRateHistoryView**: Displays the historical exchange rates for a selected currency with pagination.
- **CurrencyConverterView**: Facilitates currency conversion using the latest exchange rates.

## API Integration

- The frontend communicates with the backend https://github.com/5OO/exchange-rate-portal service to fetch exchange rates and historical data.
- The rates are retrieved from the Bank of Lithuania server.
