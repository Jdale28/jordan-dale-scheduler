import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const TimeTable = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  border: 1px solid black;
  margin: 10vh 25vw 0vh 25vw;
  .timeslot {
    border: 1px solid black;
    width: 30vw;
    text-align: center;
  }
`;

class Schedule extends Component {
  state = {
    timeslot: "",
    newUser: {
      name: "",
      number: ""
    },
    blankUser: {
      name: "",
      number: ""
    },
    availableTimes: [
      "9 a.m.",
      "10 a.m.",
      "11 a.m.",
      "12 p.m.",
      "1 p.m.",
      "2 p.m.",
      "3 p.m.",
      "4 p.m.",
      "5 p.m."
    ],
    timebooked: false
  };

  activateModal = e => {
      if (e.target.style.backgroundColor !== "red"){
          e.target.style.backgroundColor = "red";
          let value = e.target.innerHTML;
          this.setState({ timeslot: value });
          this.setState({ timebooked: false})
      }
  };

  handleInput = e => {
    const updatedNewUser = { ...this.state.newUser };
    updatedNewUser[e.target.name] = e.target.value;
    this.setState({ newUser: updatedNewUser });
  };

//   clearInput = e => {
//     let elements = document.querySelectorAll(".timeslot");
//     for (var i = 0; i < elements.length; i++) {
//       elements[i].style.backgroundColor = "white";
//     }
//     this.setState({ newUser: this.state.blankUser });
//   };

  changeColor = () => {
    if (this.state.timebooked === true) {
        console.log("let's change to red")
    } else {
        console.log("let's do nothing")
    }
  }
  handleSubmit = e => {
    this.setState(prevState => ({
      timebooked: !prevState.timebooked
    }));
    this.changeColor()
  };

  render() {
    const returnTimes = this.state.availableTimes.map((timeslot, i) => {
      return (
        <div
          key={i}
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={this.activateModal}
          className="timeslot"
          id={i}
        >
          "{timeslot}"
        </div>
      );
    });
    return (
      <div className="board">
        <TimeTable>
          <div>{returnTimes}</div>
        </TimeTable>

        {/* Modal Code for React-strap */}
        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalCenterTitle">
                  Please enter your name and number to confirm your{" "}
                  {this.state.timeslot} appointment
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span onClick={this.clearInput} aria-hidden="true">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={this.handleInput}
                  value={this.state.newUser.name}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="modal-body">
                <input
                  onChange={this.handleInput}
                  value={this.state.newUser.number}
                  name="number"
                  type="text"
                  placeholder="Your Number"
                />
              </div>
              <div className="modal-footer">
                {/* <button
                  onClick={this.clearInput}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Cancel All Appointments
                </button> */}
                <button
                  onClick={this.handleSubmit}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Book Apppointment
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* End Modal Code from React-strap */}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  timeslot: state.timeslot
});

export default connect(mapStateToProps)(Schedule);
