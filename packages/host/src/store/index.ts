import { createStore } from "redux";
import counter from "remote1/reducer";

const store = createStore(counter);

export default store;
