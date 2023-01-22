import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import RemoteCounter from "remote1/RemoteCounter";

import "./index.css";

const App = (): JSX.Element => {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <div>
        <div
          className="container"
          style={{
            margin: "10px",
            padding: "10px",
            textAlign: "center",
          }}
        >
          <h1>HOST</h1>
          local state {count}:{" "}
          <button onClick={() => setCount((count) => count + 1)}>
            increment
          </button>
          <br />
        </div>
        <RemoteCounter />
      </div>
    </Router>
  );
};

export default App;
