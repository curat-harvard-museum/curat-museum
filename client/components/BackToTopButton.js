import React, { useEffect, useState } from "react";
import { BsArrowUpSquare } from "react-icons/bs";
import { Icon } from "@chakra-ui/react";

function BackToTopButton() {
  const [backToTopButton, setBackToTopButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackToTopButton(true);
      } else {
        setBackToTopButton(false);
      }
    });
  }, []);

  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backToTopButton && (
        <button
          className="top-btn"
          style={{
            position: "fixed",
            bottom: "50px",
            right: "10px",
            height: "50px",
            width: "50px",
            fontSize: "40px",
          }}
          onClick={scrollUp}
        >
          <Icon as={BsArrowUpSquare} />
        </button>
      )}
    </div>
  );
}

export default BackToTopButton;
