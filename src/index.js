import React from "react";
import ReactDOM from "react-dom";
import Schedule from "./Schedule";
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOVE":
      return {
        count: state.count + 1
      };
    case "HATE":
      return {
        count: state.count - 1
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => {
  return <Schedule />;
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);