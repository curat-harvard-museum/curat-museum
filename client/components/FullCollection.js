import React, { useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteQuery } from "react-query";
import apiClient from "../../http-common";
import { Link } from "react-router-dom";

function AllObjects() {
  const size = 10;
  const observerElem = useRef(null);

  const fetchObjects = async (page) => {
    const response = await fetch(
      `https://api.harvardartmuseums.org/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${page}&size=${size}`
    );
    return response.json();
  };

  const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery(
      "query-objects",
      ({ pageParam = 1 }) => fetchObjects(pageParam),
      {
        getNextPageParam: (lastPage, allPages) => {
          const nextPage = allPages.length + 1;
          return lastPage.items.length !== 0 ? nextPage : undefined;
        },
      }
    );

  const handleObserver = useCallback(
    (entries) => {
      const [target] = entries;
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

  console.log(data?.data.info.next);

  return (
    <>
      <div className="grid-container">
        {isSuccess &&
          data?.data.records
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
        <div className="loader" ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "loading..." : "fin."}
        </div>
      </div>
    </>
  );
}

export default AllObjects;
