import React from "react";
import Graph from "../../components/Graph";

const Dashboard = () => {
  return (
    <div className="dash-main d-flex">
      <div className="dash-container">
        <div className="left-box"></div>
        <div className="mid-graph">
          <Graph />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
