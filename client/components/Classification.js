import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Heading, Text } from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Classification() {
  const [classification, setClassification] = useState([]);
  const apiLink = `https://api.harvardartmuseums.org/classification?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100`;

  const fetchClassification = async () => {
    await fetch(apiLink)
      .then((res) => res.json())
      .then((data) => setClassification(data.records))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchClassification();
  }, []);

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
    labels: classification.map((o) => o.name),
    datasets: [
      {
        label: "Object Count",
        data: classification.map((o) => parseFloat(o.objectcount)),
        backgroundColor: "rgba(255, 159, 64, 0.8)",
      },
    ],
  };

  return (
    <div>
      <Heading textAlign={"center"}>Classification</Heading>
      <br></br>
      <Text textAlign={"center"} size="sm">
        Classification labels have been created and assigned by curators for
        over 200,000+ artworks.
      </Text>
      <br></br>
      <div className="graph-chart">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Classification;
