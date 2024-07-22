import React from "react";
import Graph from "../../components/Graph";
import MiniGraph from "../../components/MiniGraph";

const Dashboard = () => {
  return (
    <div className="dash-main d-flex">
      <div className="dash-container">
        <div className="left-box"></div>
        <div className="mid-graph">
          <div className="graph-container">
            <Graph coin={"Bitcoin"} />
          </div>
          <div className="bottom-list">
            <div className="mini-graph">
              <MiniGraph coin={"Bitcoin"} />
            </div>
            <div className="mini-graph">
              <MiniGraph coin={"Ethereum"} />
            </div>
            <div className="mini-graph">
              <MiniGraph coin={"Tether"} />
            </div>
            <div className="mini-graph">
              <MiniGraph coin={"BNB"} />
            </div>
            <div className="mini-graph">
              <MiniGraph coin={"Solana"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
