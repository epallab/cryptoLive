import React, { useState } from "react";
import Graph from "../../components/Graph";
import MiniGraph from "../../components/MiniGraph";
import CoinStats from "../../components/CoinStats";

const Dashboard = () => {
  const [coinName, setCoinName] = useState("Bitcoin");

  const handleCoinChange = (val) => {
    setCoinName(val);
  };

  return (
    <div className="dash-main d-flex">
      <div className="dash-container">
        <div className="left-box">
          <CoinStats coin={coinName} />
        </div>
        <div className="mid-graph">
          <div className="graph-container">
            <Graph coin={coinName} />
          </div>
          <div className="bottom-list">
            <div
              role="button"
              className={
                coinName === "Bitcoin" ? "mini-graph-active" : "mini-graph"
              }
              onClick={() => handleCoinChange("Bitcoin")}
            >
              <MiniGraph coin={"Bitcoin"} />
            </div>
            <div
              role="button"
              className={
                coinName === "Ethereum" ? "mini-graph-active" : "mini-graph"
              }
              onClick={() => handleCoinChange("Ethereum")}
            >
              <MiniGraph coin={"Ethereum"} />
            </div>
            <div
              role="button"
              className={
                coinName === "Tether" ? "mini-graph-active" : "mini-graph"
              }
              onClick={() => handleCoinChange("Tether")}
            >
              <MiniGraph coin={"Tether"} />
            </div>
            <div
              className={
                coinName === "BNB" ? "mini-graph-active" : "mini-graph"
              }
              role="button"
              onClick={() => handleCoinChange("BNB")}
            >
              <MiniGraph coin={"BNB"} />
            </div>
            <div
              className={
                coinName === "Solana" ? "mini-graph-active" : "mini-graph"
              }
              role="button"
              onClick={() => handleCoinChange("Solana")}
            >
              <MiniGraph coin={"Solana"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
