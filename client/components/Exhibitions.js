import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";
import Carousel from "react-bootstrap/Carousel";

function Exhibitions() {
  const { data, refetch: getExhibitions } = useQuery(
    ["query-exhibitions"],
    async () => {
      return await apiClient.get(
        `/exhibition?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&status=current&venue=HAM`
      );
    }
  );

  function handleGetExhibitions() {
    getAllExhibitions();
  }

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <h2>Current Exhibitions</h2>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <div className="grid-container">
            {data?.data.records.map((record) => (
              <div key={record.id}>
                <>
                  {record.primaryimageurl ? (
                    <img
                      className="exhibition-image"
                      key={record.id}
                      src={record.primaryimageurl}
                      alt="{record.title} by {record.people[0].name} "
                    ></img>
                  ) : null}
                  <Carousel.Caption>
                    <div>{record.title}</div>
                    <br></br>
                    End Date: {record.enddate}
                    <br></br>
                    Gallery Location:
                    <li>Name: {record.venues[0].galleries[0].name}</li>
                    <li>Floor: {record.venues[0].galleries[0].floor}</li>
                    <li>
                      Gallery Number:{" "}
                      {record.venues[0].galleries[0].gallerynumber}
                    </li>
                  </Carousel.Caption>
                </>
              </div>
            ))}
          </div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}

export default Exhibitions;

// import Carousel from "react-bootstrap/Carousel";

// function Exhibitions() {
//   return (
//     <Carousel fade>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=First slide&bg=373940"
//           alt="First slide"
//         />
//         <Carousel.Caption>
//           <h3>First slide label</h3>
//           <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Second slide&bg=282c34"
//           alt="Second slide"
//         />

//         <Carousel.Caption>
//           <h3>Second slide label</h3>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//       <Carousel.Item>
//         <img
//           className="d-block w-100"
//           src="holder.js/800x400?text=Third slide&bg=20232a"
//           alt="Third slide"
//         />

//         <Carousel.Caption>
//           <h3>Third slide label</h3>
//           <p>
//             Praesent commodo cursus magna, vel scelerisque nisl consectetur.
//           </p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default Exhibitions;
