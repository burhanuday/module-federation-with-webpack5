import React, { useState } from "react";

function RemoteCounter() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => setCounter((count) => count + 1);

  return (
    <div>
      <h2>RemoteCounter</h2>
      <p>Counter state = {counter}</p>
      <button onClick={incrementCounter}>INCREMENT</button>
    </div>
  );
}

export default RemoteCounter;
