import React, { Suspense, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Heading from "remote1/Heading";

import "./index.css";

const Button = React.lazy(() => import("remote1/Button"));

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
          local state{count}:{" "}
          <button onClick={() => setCount((count) => count + 1)}>
            increment
          </button>
          <br />
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
            <li>
              <Link to="/heading">Heading</Link>
            </li>
          </ul>
        </nav>
        <Suspense fallback={"loading..."}>
          <Switch>
            <Route path="/button">
              <Button />
            </Route>
            <Route path="/heading">
              <Heading />
            </Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
