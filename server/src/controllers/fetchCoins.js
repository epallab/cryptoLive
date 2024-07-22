const axios = require("axios");
const Currency = require("../models/Currency"); // Adjust the path as needed
const cron = require("node-cron");

const coins = ["BTC", "ETH", "USDT", "BNB", "SOL"];
const apiUrl = "https://api.livecoinwatch.com/coins/single";
const apiKey = process.env.LIVECOINWATCH_API_KEY;

async function fetchAndStoreCoinData(coin) {
  try {
    const response = await axios.post(
      apiUrl,
      {
        currency: "USD",
        code: coin,
        meta: true,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey,
        },
      }
    );

    const data = response.data;

    const newCurrency = new Currency({
      name: data.name,
      symbol: data.code,
      rank: data.rank,
      age: data.age,
      color: data.color,
      png32: data.png32,
      png64: data.png64,
      webp32: data.webp32,
      webp64: data.webp64,
      exchanges: data.exchanges,
      markets: data.markets,
      pairs: data.pairs,
      categories: data.categories,
      allTimeHighUSD: data.allTimeHighUSD,
      circulatingSupply: data.circulatingSupply,
      totalSupply: data.totalSupply,
      maxSupply: data.maxSupply,
      links: data.links,
      rate: data.rate,
      volume: data.volume,
      cap: data.cap,
      liquidity: data.liquidity,
      delta: data.delta,
    });

    await newCurrency.save();
    // console.log(`Data for ${coin} saved successfully`);
  } catch (error) {
    console.error(`Error fetching or saving data for ${coin}:`, error);
  }
}

function fetchDataForAllCoins() {
  coins.forEach((coin) => {
    fetchAndStoreCoinData(coin);
  });
}

// Function to start the periodic fetching using node-cron
function startFetchingData() {
  // Schedule the task to run every 20 seconds
  cron.schedule("*/5 * * * * *", () => {
    fetchDataForAllCoins();
  });

  // Initial call to start the cycle immediately
  fetchDataForAllCoins();
}

module.exports = { startFetchingData, fetchDataForAllCoins };
