import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Graph = () => {
  const [series, setSeries] = useState([
    {
      name: "XYZ MOTORS",
      data: [],
    },
  ]);

  const [options, setOptions] = useState({
    chart: {
      type: "area",
      stacked: false,
      height: 350,
      zoom: {
        type: "x",
        enabled: true,
        autoScaleYaxis: true,
      },
      toolbar: {
        autoSelected: "zoom",
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    title: {
      text: "Stock Price Movement",
      align: "left",
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90, 100],
      },
    },
    yaxis: {
      labels: {
        formatter: function (val) {
          return (val / 1000000).toFixed(0);
        },
      },
      title: {
        text: "Price",
      },
    },
    xaxis: {
      type: "datetime",
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return (val / 1).toFixed(0);
        },
      },
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/currency/single/Ethereum"
        );
        const fetchedData = response.data.map((item) => ({
          x: new Date(item.createdAt).getTime(),
          y: item.rate,
        }));
        setSeries([
          {
            name: "Ethereum",
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
    const intervalId = setInterval(fetchData, 4000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="area"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default Graph;
