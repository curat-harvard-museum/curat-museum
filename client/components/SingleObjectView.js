import React from "react";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";
import { useParams } from "react-router-dom";

function SingleObjectView() {
  const { id } = useParams();
  const { data } = useQuery(["query-single-object"], async () => {
    return await apiClient.get(
      `/object/${id}?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=83&size=100`
    );
  });

  console.log(data);

  //   return (
  //     <>
  //       <div className="grid-container">
  //         {data?.data.record
  //           .map((record) => (
  //             <div key={record.id}>
  //               <>
  //                 <img
  //                   className="single-image"
  //                   key={record.id}
  //                   src={record.primaryimageurl}
  //                   alt="{record.title} by {record.people[0].name} "
  //                 ></img>
  //                 <div className="caption-text title-caption-text">
  //                   {record.title}
  //                 </div>
  //                 <div className="caption-text person-caption-text">
  //                   {/* {record.people[0].name ? record.people[0].name : null} */}
  //                 </div>
  //                 <div className="caption-text classification-caption-text">
  //                   {record.classification}
  //                 </div>
  //               </>
  //             </div>
  //           ))}
  //       </div>
  //     </>
  //   );
}

export default SingleObjectView;
