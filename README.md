# Blockchain Price Tracker API

This is a blockchain price tracker built with Nest.js that tracks the price of Ethereum and Polygon, allows setting price alerts, and provides swap rate calculations. The API automatically saves prices every 5 minutes, checks for significant price changes, and sends email alerts when the price change exceeds a defined threshold.

## Features

- **Automatic Price Tracking**: The prices of Ethereum and Polygon are saved automatically every 5 minutes.
- **Email Alerts**: An email is sent to `hyperhire_assignment@hyperhire.in` if the price of Ethereum or Polygon increases by more than 3% compared to its price one hour ago.
- **Price History API**: Get the prices for Ethereum and Polygon for each hour in the past 24 hours.
- **Price Alert API**: Set price alerts for specific chains and receive email notifications when the target price is reached.
- **Swap Rate API**: Get the swap rate for Ethereum to Bitcoin, including fees.

## APIs

### 1. **Price History API**

- **Endpoint**: `/prices`
- **Description**: Returns the prices of Ethereum and Polygon for the past 24 hours (one price per hour).

### 2. **Set Price Alert API**

- **Endpoint**: `/alerts`
- **Description**: Set an alert for a specific price. If the price of the specified chain (e.g., Ethereum) reaches the target value, an email will be sent to the provided address.
- **Request Parameters**:
  - `assetSymbol`: The chain symbol (e.g., ETH, BTC).
  - `targetPrice`: The target price in USD.
  - `email`: The email address to send the alert to.

**Example Request**:

```json
{
  "assetSymbol": "ETH",
  "targetPrice": 1000,
  "email": "hyperhire_assignment@hyperhire.in"
}
```

### 3. **Swap Rate API**

- **Endpoint**: `/swap`
- **Description**: Get the swap rate from Ethereum to Bitcoin for a given amount of Ethereum, including the total fee (0.03%).
- **Request Parameters**:
  - `source`: The source asset (ETH).
  - `target`: The target asset (BTC).
  - `amount`: The amount of Ethereum to swap.

**Example Request**:

```json
{
  "source": "ETH",
  "target": "BTC",
  "amount": "1500"
}
```

## Running the Project with Docker

To run this project locally using Docker, follow these steps:

1. Clone the repository.
2. Ensure Docker is installed on your machine.
3. Run the following command to build and start the project:
   ```bash
   docker compose up --build
   ```

This will build the Docker image, set up the application along with the necessary services (like the database), and run everything.

## Swagger Documentation

The API documentation is available through Swagger UI. You can access it at:

```
http://localhost:3000/docs
```

This interface allows you to test all the available API endpoints directly from your browser.

## Data Flow

- **Price Tracking**: The application uses the Moralis SDK to automatically save the prices of Ethereum and Polygon every 5 minutes.
- **Price Change Alerts**: Every hour, the application checks whether the price of Ethereum or Polygon has increased by more than 3% compared to the price an hour ago. If so, an email is automatically sent.
- **Price History API**: Users can request price data for Ethereum and Polygon for each hour within the last 24 hours.
- **Price Alert API**: Users can set alerts for specific prices, and an email will be sent once the price is reached.
- **Swap Rate API**: Users can calculate how much Bitcoin they would receive for a specific amount of Ethereum, including the total fees.

## Email Notifications

When the price of Ethereum or Polygon increases by more than 3% compared to its price an hour ago, the system automatically sends an email notification to `hyperhire_assignment@hyperhire.in`. Similarly, users can set their own price alerts, and emails will be sent when their target price is reached.
