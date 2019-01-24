import React from "react";
import ReactDOM from "react-dom";
import Schedule from "./Schedule";
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  timeslot: "",
  modals: []
};

function reducer(state = initialState, action) {
  switch (action.type) {
    // case "MODALPOPUP":
    //   return [...state, {
    //       timeslot: action.timeslot

    //   }]
    default:
      return state;
  }
}

const store = createStore(reducer);

const App = () => {
  return <Schedule />;
};

ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById("root")
);