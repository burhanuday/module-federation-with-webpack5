import React from "react";
import { useHistory } from "react-router-dom";

const Button = () => {
  let history = useHistory();

  function handleClick() {
    history.push("/home");
  }

  return <button onClick={handleClick}>from remote1: GO HOME</button>;
};

export default Button;
