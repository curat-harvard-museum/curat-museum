import React, { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import BackToTopButton from "./BackToTopButton";

function AllObjects() {
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

  return (
    <>
      <div className="grid-container">
        {data?.pages.map((collection) =>
          collection.records
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
                  <div className="caption-text person-caption-text"></div>
                  <div className="caption-text classification-caption-text">
                    {record.classification}
                  </div>
                </>
              </Link>
            ))
        )}

        <div ref={observerElem}>
          {isFetchingNextPage && hasNextPage ? "loading..." : "fin."}
        </div>
        <BackToTopButton />
      </div>
    </>
  );
}

export default AllObjects;
