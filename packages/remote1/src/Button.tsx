import React from "react";
import { useHistory } from "react-router-dom";

const Button = (): JSX.Element => {
  // let history = useHistory();

  function handleClick() {
    // history.push("/home");
  }

  return <button onClick={handleClick}>from remote1: GO HOME</button>;
};

export default Button;
