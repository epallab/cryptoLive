import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import { getColor } from "./CoinStats";

const MiniGraph = ({ coin }) => {
  const [series, setSeries] = useState([
    {
      name: coin,
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "line", // Use line type for a simple graph line
      height: 100, // Smaller height for a mini graph
      sparkline: {
        enabled: true, // Enable sparkline for a minimal graph
      },
    },
    stroke: {
      width: 2,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: false, // Hide x-axis labels
      },
      axisBorder: {
        show: false, // Hide x-axis border
      },
      axisTicks: {
        show: false, // Hide x-axis ticks
      },
    },
    yaxis: {
      labels: {
        show: false, // Hide y-axis labels
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    tooltip: {
      enabled: false, // Disable tooltips
    },
    markers: {
      size: 0,
    },
  });

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:80/api/currency/single/20/${coin}`
        );
        const fetchedData = response.data.map((item) => ({
          x: new Date(item.createdAt).getTime(),
          y: item.rate,
        }));
        setSeries([
          {
            name: coin,
            data: fetchedData,
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Initial fetch
    fetchData();

    // Fetch every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2px",
        }}
      >
        <h4
          style={{ color: coinData?.color || "#4285F5", margin: 0, padding: 0 }}
        >
          {coinData?.name}
        </h4>
        <div className="d-flex">
          <p
            style={{
              color: getColor(coinData?.delta?.day - 1),
              fontWeight: 600,
              fontSize: ".8em",
            }}
          >
            {(coinData?.delta?.day - 1).toFixed(2)}% {"(1D)"}
          </p>
        </div>
      </div>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={50}
      />
    </>
  );
};

export default MiniGraph;
