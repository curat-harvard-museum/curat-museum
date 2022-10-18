import React from "react";
import BackToTopButton from "./BackToTopButton";
import Century from "./BarCentury";
import Hues from "./Hues";

const Visualizations = (props) => {
  return (
    <div className="visualization-header">
      <Century />
      <br></br>
      <Hues />
      <BackToTopButton />
    </div>
  );
};

export default Visualizations;
