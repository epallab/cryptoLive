const Currency = require("../models/Currency");
const { fetchDataForAllCoins } = require("./fetchCoins");

const getSingleCoin = async (req, res) => {
  const { name } = req.params;
  try {
    const data = await Currency.find({ name })
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

const getAllCoins = async (req, res) => {
  console.log("Called");
  const coins = ["Bitcoin", "Ethereum", "Tether", "BNB", "Solana"];
  try {
    const data = await Currency.find({ name: { $in: coins } })
      .sort({ createdAt: -1 })
      .limit(coins.length);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
};

const fetchCoins = async (req, res) => {
  try {
    fetchDataForAllCoins();
    res.status(200).send("Fetching coin data...");
  } catch (error) {
    res.status(500).send("Error fetching coin data");
  }
};

module.exports = { getSingleCoin, getAllCoins, fetchCoins };
