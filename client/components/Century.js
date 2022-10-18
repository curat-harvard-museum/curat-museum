import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Heading, Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Century() {
  const [century, setCentury] = useState([]);
  const apiLink = `https://api.harvardartmuseums.org/century?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=50`;

  const fetchCentury = async () => {
    await fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setCentury(data.records))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchCentury();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    layout: {
      padding: {
        left: 50,
        right: 50,
        top: 0,
        bottom: 0,
      },
    },
  };

  const data = {
    labels: century.map((o) => o.name),
    datasets: [
      {
        label: "Object Count",
        data: century.map((o) => parseFloat(o.objectcount)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <Heading textAlign={"center"}>Century</Heading>
      <br></br>
      <Text textAlign={"center"} size="sm">
        We have different types of artworks that ranges over 47 centuries. Come
        check out our collection!
      </Text>
      <br></br>
      <div className="graph-chart">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
}

export default Century;
