// import React, { useState, useEffect } from "react";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { Pie } from "react-chartjs-2";
// import { Heading, Text } from "@chakra-ui/react";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function Gender() {
//   const [gender, setGender] = useState([]);
//   const apiLink = `https://api.harvardartmuseums.org/person?&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&size=100&page=87`;

//   const fetchGender = async () => {
//     await fetch(apiLink)
//       .then((res) => res.json())
//       .then((data) => setGender(data.records))
//       .catch((error) => console.log(error));
//   };

//   useEffect(() => {
//     fetchGender();
//   }, []);

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "top",
//       },
//     },
//   };

//   let femaleArr = [];

//   const genderRecFemale = gender
//     .map((record) => record.gender)
//     .filter((gender) => gender !== "unknown")
//     .map((gender) => (gender === "female" ? femaleArr.push(1) : null));

//   const data = {
//     labels: gender
//       .map((record) => record.gender)
//       .filter((gender) => gender !== "unknown"),
//     datasets: [
//       {
//         label: "Gender Representation",
//         data: gender
//           .map((record) => record.gender)
//           .filter((gender) => gender !== "unknown")
//           .map((gender) => parseFloat(femaleArr.length)),
//         backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 99, 132, 0.5)"],
//       },
//     ],
//   };

//   //   console.log("femArrLength", femaleArr.length);

//   //   const initialValue = 0;
//   //   //   let maleArr = [];
//   //   const sumWithInitial = femaleArr.reduce(
//   //     (previousValue, currentValue) => previousValue + currentValue,
//   //     initialValue
//   //   );

//   //   console.log("femArr.length", sumWithInitial);

//   //   console.log("GRR", femaleArr);
//   console.log("person object", gender);
//   //   console.log("genderRecFemale", genderRecFemale);

//   return (
//     <div>
//       <Heading textAlign={"center"}>Gender Representation</Heading>
//       <br></br>
//       <Text textAlign={"center"} size="sm"></Text>
//       <br></br>
//       <div className="graph-chart">
//         <Pie options={options} data={data} />
//       </div>
//     </div>
//   );
// }

// export default Gender;
