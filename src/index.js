import React from "react";
import ReactDOM from "react-dom";
import Schedule from "./Schedule";
import { createStore } from "redux";
import { Provider } from "react-redux";

const initialState = {
  count: 0,
  timeslot: "",
  users: [],
  newUser: {
    name: "",
    number: "",
    timeslot: ""
  },
  blankUser: {
    name: "",
    number: "",
    timeslot: ""
  },
  availableTimes: [
    {
      time: "9 a.m.",
      isTimeBooked: false
    },
    {
      time: "10 a.m.",
      isTimeBooked: false
    },
    {
      time: "11 a.m.",
      isTimeBooked: false
    },
    {
      time: "12 a.m.",
      isTimeBooked: false
    },
    {
      time: "1 p.m.",
      isTimeBooked: false
    },
    {
      time: "2 p.m.",
      isTimeBooked: false
    },
    {
      time: "3 p.m.",
      isTimeBooked: false
    },
    {
      time: "4 p.m.",
      isTimeBooked: false
    },
    {
      time: "5 p.m.",
      isTimeBooked: false
    }
  ]
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