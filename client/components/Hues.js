import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Heading, Text } from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

function Hues() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const data = {
    labels: [
      "Red",
      "Blue",
      "Yellow",
      "Orange",
      "Green",
      "Violet",
      "Brown",
      "Black",
      "White",
      "Grey",
    ],
    datasets: [
      {
        label: "Collection Hues",
        data: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(177, 144, 127, 0.5)",
          "rgba(0, 0, 0, 0.5)",
          "rgba(255, 255, 255, 0.5)",
          "rgba(136, 139, 141, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(177, 144, 127, 1)",
          "rgba(0, 0, 0, 1)",
          "rgba(0, 0, 0, 0.2)",
          "rgba(136, 139, 141, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <Heading textAlign={"center"}>Hue</Heading>
      <br></br>
      <Text textAlign={"center"} size="sm">
        Did you know that our collection consist of the following 10 hues and
        over 147 colors? Check out each artwork to see which colors are used.
      </Text>
      <br></br>
      <div className="graph-chart">
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
}

export default Hues;
