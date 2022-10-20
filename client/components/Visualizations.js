import React from "react";
import BackToTopButton from "./BackToTopButton";
import Century from "./Century";
import Classification from "./Classification";
import Hues from "./Hues";
import { Show } from "@chakra-ui/react";

const Visualizations = (props) => {
  return (
    <div className="visualization-header">
      <Century />
      <br></br>
      <Classification />
      <br></br>
      <Hues />
      <br></br>
      <Show breakpoint="(max-width: 658px)">
        <BackToTopButton />
      </Show>
    </div>
  );
};

export default Visualizations;
