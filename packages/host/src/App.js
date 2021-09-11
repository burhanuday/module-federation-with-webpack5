import React, { Suspense, useState } from "react";
import Heading from "remote1/Heading";

const Button = React.lazy(() => import("remote1/Button"));

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <div
        style={{
          margin: "10px",
          padding: "10px",
          textAlign: "center",
          backgroundColor: "greenyellow",
        }}
      >
        <h1>hosts</h1>
        {count}:{" "}
        <button onClick={() => setCount((count) => count + 1)}>inc</button>
      </div>
      <Suspense fallback={"loading..."}>
        <Button />
        <Heading />
      </Suspense>
    </div>
  );
};

export default App;
