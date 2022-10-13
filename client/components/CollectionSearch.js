import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function CollectionSearch() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState([
    "century",
    "color",
    "culture",
    "exhibition",
    "gallery",
    "medium",
    "period",
    "person",
    "technique",
    "title",
    "yearmade",
  ]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    fetch(
      "https://api.harvardartmuseums.org/object?apikey=a58b1ca8-7853-40e4-8734-f634a87b9be7"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  const data = Object.values(items);
  console.log(data);

  //   function search(items) {
  //     return items.filter((item) => )
  //   }
}
