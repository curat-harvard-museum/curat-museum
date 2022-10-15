import React, { useEffect, useRef, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import FilterButtons from "./FilterButtons";
import Search from "./Search";
import BackToTopButton from "./BackToTopButton";
import { Tab, Tabs, TabPanel, TabList, TabPanels } from "@chakra-ui/react";

function AllObjects() {
  const observerElem = useRef(null);
  let [searchParams] = useSearchParams();
  const classification = searchParams.get("classification");
  const century = searchParams.get("century");
  const culture = searchParams.get("culture");

  const fetchObjects = async ({ pageParam = 1 }) => {
    const res = await fetch(
      `https://api.harvardartmuseums.org/object?classification=${classification}&apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${pageParam}`
    );
    return await res.json();
  };

  // const fetchObjects = async ({ pageParam = 1 }) => {
  //   const res = await fetch(
  //     `https://api.harvardartmuseums.org/object?${
  //       classification ? `classification=${classification}&` : ""
  //     }
  //     ${century ? `century=${century}&` : ""}
  //     ${culture ? `culture=${culture}&` : ""}
  //     apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7&page=${pageParam}`
  //   );
  //   return await res.json();
  // };

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

  const menuItems = [
    ...new Set(
      data?.pages.map((collection) =>
        collection.records
          .filter((record) => record.primaryimageurl)
          .map((record) => record.classification)
      )
    ),
  ];

  return (
    <>
      {/* <Search /> */}
      <Tabs variant="soft-rounded" colorScheme="gray">
        <TabList>
          <Tab>Classification</Tab>
          <Tab>Century</Tab>
          <Tab>Culture</Tab>
          <Tab>Gallery</Tab>
          <Tab>Medium</Tab>
          <Tab>Period</Tab>
          <Tab>Artist</Tab>
          <Tab>Place</Tab>
          <Tab>Technique</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <FilterButtons filterType={"classification"} />
          </TabPanel>
          <TabPanel>
            <FilterButtons filterType={"century"} />
          </TabPanel>
          <TabPanel>
            <FilterButtons filterType={"culture"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
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
                  <div className="caption-text person-caption-text">
                    {" "}
                    {record.people ? record.people[0].name : null}
                  </div>
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
