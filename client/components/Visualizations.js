import React from "react";
import BackToTopButton from "./BackToTopButton";
import Century from "./Century";
import Classification from "./Classification";
import Hues from "./Hues";

const Visualizations = (props) => {
  return (
    <div className="visualization-header">
      <Century />
      <br></br>
      <Classification />
      <br></br>
      <Hues />
      <br></br>
      <BackToTopButton />
    </div>
  );
};

export default Visualizations;
