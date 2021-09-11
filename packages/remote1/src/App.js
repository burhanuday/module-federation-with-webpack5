import React, { useState } from "react";

import Button from "./Button";
import Heading from "./Heading";

const App = () => {
  const [counter, setCounter] = useState(0);

  return (
    <main>
      <h1>Remote 1: {counter}</h1>
      <button onClick={() => setCounter((counter) => counter + 1)}>inc</button>
      <Button />
      <Heading />
    </main>
  );
};

export default App;
