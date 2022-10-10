import { useQuery } from "@tanstack/react-query";
import apiClient from "../../http-common";

function AllObjects() {
  const { data, refetch: getAllObjects } = useQuery(
    ["query-objects"],
    async () => {
      return await apiClient.get(
        `/object?apikey=${process.env.REACT_APP_HARVARD_TOKEN}&page=27&size=100`
      );
    },
    {
      enabled: true,
    }
  );

  function handleGetObjects() {
    getAllObjects();
  }

  return (
    <>
      <div className="grid-container">
        {/* <button onClick={handleGetObjects}>View Full Collection</button> */}
        {data?.data.records.map((record) => (
          <p key={record.id}>
            {record.primaryimageurl ? (
              <img
                className="single-grid-image"
                key={record.id}
                src={record.primaryimageurl}
                alt="{record.title} by {record.people[0].name} "
              ></img>
            ) : (
              <div className="no-image"></div>
            )}
          </p>
        ))}
      </div>
    </>
  );
}

export default AllObjects;
