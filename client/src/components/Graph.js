import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

const Graph = ({ coin }) => {
  const [series, setSeries] = useState([
    {
      name: coin,
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
    stroke: {
      width: 3, // Remove the graph line
    },
    grid: {
      show: false, // Remove the background horizontal lines
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
          return (val / 1).toFixed(2);
        },
        style: {
          fontFamily: "inherit",
          fontWeight: 500,
        },
      },
      title: {
        text: "Price",
        style: {
          fontFamily: "inherit",
          fontWeight: 500,
        },
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        style: {
          fontFamily: "inherit",
          fontWeight: 500,
        },
      },
    },
    tooltip: {
      shared: false,
      y: {
        formatter: function (val) {
          return `$${val.toFixed(2)}`;
        },
      },
      style: {
        fontFamily: "inherit",
        fontWeight: 500,
      },
    },
  });

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
        setOptions((prevOptions) => ({
          ...prevOptions,
          title: {
            text: `${coin} Price Movement`,
            align: "left",
            style: {
              fontFamily: "inherit",
              fontWeight: 500,
            },
          },
        }));
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
  }, [coin]);

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="area"
      height={"100%"}
    />
  );
};

export default Graph;
