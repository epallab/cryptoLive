const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Import the router
const routes = require("./routes/routes");

// Use the router
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Server Running");
});

// Import and start the periodic fetching of coin data
const { startFetchingData } = require("./controllers/fetchCoins");
startFetchingData();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
