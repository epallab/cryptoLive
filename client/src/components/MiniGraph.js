import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/currency/single/${coin}`
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
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={"100%"}
    />
  );
};

export default MiniGraph;
