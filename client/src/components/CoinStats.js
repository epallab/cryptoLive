import React, { useState, useEffect } from "react";
import axios from "axios";

const CoinStats = ({ coin }) => {
  const [coinData, setCoinData] = useState(null);

  useEffect(() => {
    const fetchCoinData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/currency/single/1/${coin}`
        );
        setCoinData(response.data[0]); // Assuming the response is an array with a single object
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    // Initial fetch
    fetchCoinData();

    // Fetch every 5 seconds
    const intervalId = setInterval(fetchCoinData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [coin]);

  if (!coinData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="coin-stats">
      <div className="coin-head">
        <img src={coinData?.webp32} alt="" />
        <h2 style={{ color: coinData?.color }}>{coinData?.name}</h2>
        <div
          className="coin-rank"
          style={{ backgroundColor: coinData?.color || "#4285F5" }}
        >
          <p> Rank: {coinData?.rank}</p>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <h1> ${coinData?.rate.toFixed(2)}</h1>
        <div className="d-flex">
          <p
            style={{
              color: getColor(coinData?.delta?.day - 1),
              fontWeight: 600,
            }}
          >
            {(coinData?.delta?.day - 1).toFixed(2)}%
          </p>
          <p className="day-change-hour">24h</p>
        </div>
      </div>
      <div className="coin-details">
        <div className="coin-details-box">
          <p>{coinData?.age} days</p>
          <p>Age</p>
        </div>
        <div className="coin-details-box">
          <p>${coinData?.allTimeHighUSD.toLocaleString()}</p>
          <p>All-Time High</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.circulatingSupply.toLocaleString()}</p>
          <p>Circulating Supply</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.totalSupply.toLocaleString()}</p>
          <p>Total Supply</p>
        </div>
        {coinData?.maxSupply && (
          <div className="coin-details-box">
            <p> {coinData?.maxSupply.toLocaleString()}</p>
            <p>Max Supply:</p>
          </div>
        )}
        <div className="coin-details-box">
          <p>{coinData?.exchanges}</p>
          <p>Exchanges</p>
        </div>
        <div className="coin-details-box">
          <p> {coinData?.markets}</p>
          <p>Markets</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.pairs}</p>
          <p>Pairs</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.cap}</p>
          <p>Cap</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.volume}</p>
          <p>Volume</p>
        </div>
        <div className="coin-details-box">
          <p>{coinData?.liquidity}</p>
          <p>liquidity</p>
        </div>
      </div>
      <p style={{ fontSize: ".8em" }}>
        Categories: {coinData?.categories.join(", ")}
      </p>
      <div className="coin-links">
        {coinData?.links.whitepaper && (
          <a href={coinData?.links.whitepaper}>Whitepaper</a>
        )}
      </div>
    </div>
  );
};

export default CoinStats;

export const getColor = (value) => {
  return value < 0 ? "red" : "green";
};
