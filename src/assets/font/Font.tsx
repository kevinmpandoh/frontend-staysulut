import React from "react";

import { inter, sora } from ".";

const Font = () => {
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-sora: ${sora.style.fontFamily};
          }
        `}
      </style>
    </>
  );
};

export default Font;
