const express = require("express");
const router = express.Router();
const controllers = require("../controllers/currencyController");

router.get("/currency/single/:name", controllers.getSingleCoin);
router.get("/currency/all/coins", controllers.getAllCoins);
router.get("/fetch/coins", controllers.fetchCoins);
router.get("/", async (req, res) => {
  res.status(200).send("Success");
});

module.exports = router;
