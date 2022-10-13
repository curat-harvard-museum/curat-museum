import React, { useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "react-query";
import apiClient from "../../http-common";
import { Link } from "react-router-dom";

function AllObjects() {
  const observerElem = useRef(null);

  const fetchPage = async (page) => {
    const response = await fetch(
      `https://api.harvardartmuseums.org/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${page}&size=10`
    );
    return await response.json();
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(["objects"], ({ pageParam = 1 }) => fetchPage(pageParam), {
      getNextPageParam: (lastPage) => {
        const { page, total_pages: totalPages } = lastPage.data;
        return page < totalPages ? page + 1 : undefined;
      // getNextPageParam: (lastPage, allPages) => lastPage.nextCursor,
      // getPreviousPageParam: (firstPage, allPages) => firstPage.prevCursor,
      // getNextPageParam: (lastPage, allPages) => {
      // // const allPagesLength = data?.pages[0].info.pages  
      // const nextPage = allPagesLength + 1;
      //   return lastPage.items.length !== 0 ? nextPage : undefined;
      }
    })
  }

  console.log("pages data", data?.pages[0].info)

  useEffect(() => {
    let fetching = false;
    const handleScroll = async (e) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;
      if (!fetching && scrollHeight - scrollTop <= clientHeight * 1.2) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage]);

  const handleObserver = useCallback(
    (records) => {
      const [target] = records;
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  console.log("data", data?.pages[0].records);

  return (
    <>
      <div className="grid-container">
        {isSuccess &&
          data?.pages[0].records
            .filter((record) => record.primaryimageurl)
            .map((record) => (
              <Link key={record.id} to={`/object/${record.id}`}>
                <>
                  <img
                    className="single-grid-image"
                    src={record.primaryimageurl}
                    alt="{record.title} by {record.people[0].name} "
                  ></img>
                  <div className="caption-text title-caption-text">
                    {record.title}
                  </div>
                  <div className="caption-text person-caption-text">
                    {/* {record.people[0].name ? record.people[0].name : null} */}
                  </div>
                  <div className="caption-text classification-caption-text">
                    {record.classification}
                  </div>
                </>
              </Link>
            ))}

        <div ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "loading..." : "fin."}
        </div>
      </div>
    </>
  );
}

export default AllObjects;

// function AllObjects() {
//   const { data, refetch: getAllObjects } = useQuery(
//     ["query-objects"],

//     async () => {
//       return await apiClient.get(
//         `/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=83&size=100`
//       );
//     }
//   );

//   function handleGetObjects() {
//     getAllObjects();
//   }

//   console.log(data?.data.info.next);
// }

// function AllObjects() {
//   const { data, refetch: getAllObjects } = useQuery(
//     ["query-objects"],

//     async () => {
//       return await apiClient.get(
//         `/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=83&size=100`
//       );
//     }
//   );

//   function handleGetObjects() {
//     getAllObjects();
//   }

//   console.log(data?.data.info.next);

//   return (
//     <>
//       <div className="grid-container">
//         {data?.data.records
//           .filter((record) => record.primaryimageurl)
//           .map((record) => (
//             <Link key={record.id} to={`/object/${record.id}`}>
//               <>
//                 <img
//                   className="single-grid-image"
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
//             </Link>
//           ))}
//       </div>
//     </>
//   );
// }

// export default AllObjects;
