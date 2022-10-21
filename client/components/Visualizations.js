import React from "react";
import BackToTopButton from "./BackToTopButton";
import Century from "./Century";
import Classification from "./Classification";
import Hues from "./Hues";
import { Show, Divider } from "@chakra-ui/react";
import Footer from "./Footer";

const Visualizations = (props) => {
  return (
    <div className="visualization-header">
      <Century />
      <br></br>
      <Classification />
      <br></br>
      <Hues />
      <br></br>
      <Divider />
      <br></br>
      <Footer />
      <Show breakpoint="(max-width: 658px)">
        <BackToTopButton />
      </Show>
    </div>
  );
};

export default Visualizations;
