import React from "react";

import "./index.css";

interface HeadingProps {
  text?: string;
}

const Heading = ({ text }: HeadingProps): JSX.Element => {
  return <h1>This is the heading: {text || ""}</h1>;
};

export default Heading;
