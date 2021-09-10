import React, { Suspense } from "react";
const Button = React.lazy(() => import("remote1/Button"));
const Heading = React.lazy(() => import("remote1/Heading"));

const App = () => {
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
        <h1>HOSSSSTTT</h1>
      </div>
      <Suspense fallback={"loading..."}>
        <Button />
        <Heading />
      </Suspense>
    </div>
  );
};

export default App;
