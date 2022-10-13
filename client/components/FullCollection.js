import React, { useEffect, useRef, useCallback } from "react";
<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
=======
>>>>>>> main
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";

function AllObjects() {
<<<<<<< HEAD
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
=======
  const observerElem = useRef(null);
  const fetchObjects = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://api.harvardartmuseums.org/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${pageParam}`
    );
    return await res.json();
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(["objects"], fetchObjects, {
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length + 1;
      return nextPage;
    },
  });

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
>>>>>>> main
      if (target.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = observerElem.current;
    const option = { threshold: 0 };
<<<<<<< HEAD

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);
=======
>>>>>>> main

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <>
      <div className="grid-container">
<<<<<<< HEAD
        {isSuccess &&
          data?.data.records
=======
        {data?.pages.map((collection) =>
          collection.records
>>>>>>> main
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
<<<<<<< HEAD
                  <div className="caption-text person-caption-text">
                    {/* {record.people[0].name ? record.people[0].name : null} */}
                  </div>
=======
                  <div className="caption-text person-caption-text"></div>
>>>>>>> main
                  <div className="caption-text classification-caption-text">
                    {record.classification}
                  </div>
                </>
              </Link>
<<<<<<< HEAD
            ))}
        <div className="loader" ref={observerElem}>
=======
            ))
        )}

        <div ref={observerElem}>
>>>>>>> main
          {isFetchingNextPage && hasNextPage ? "loading..." : "fin."}
        </div>
      </div>
    </>
  );
}

export default AllObjects;
