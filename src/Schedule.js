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
  .booked {
    background-color: red;
  }
`;

class Schedule extends Component {
  state = {
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

  activateModal = (e, i) => {
      let value = e.target.innerHTML;
      let updatedNewUser = { ...this.state.newUser };
      if (this.state.availableTimes[i].isTimeBooked === false){
        updatedNewUser["timeslot"] = value;
        this.setState({ timeslot: value, newUser: updatedNewUser });
    } else {
        let bookedUser = this.state.users.filter(user => {
            return user.timeslot === value
        })
        updatedNewUser = bookedUser[0]
        this.setState({newUser: updatedNewUser})
    }
  };

  handleInput = e => {
    const updatedNewUser = { ...this.state.newUser };
    updatedNewUser[e.target.name] = e.target.value;
    this.setState({ newUser: updatedNewUser });
  };

  handleSubmit = (e) => {
    let updatedNewUser = { ...this.state.newUser };
    let allUsers = [...this.state.users];
    const currentUser = allUsers.filter(user => user.timeslot === updatedNewUser.timeslot)
    let combinedUsers
    if (currentUser[0]){
        const filteredUsers = allUsers.filter(user => user.timeslot !== updatedNewUser.timeslot)
        combinedUsers = filteredUsers.concat([this.state.newUser])
    } else {
        combinedUsers = [...this.state.users, this.state.newUser];
    }

    let updatedAvailability = [...this.state.availableTimes]
    const currentTime = updatedAvailability.filter(time => time.time === this.state.timeslot)
    const newAvailableTimes = updatedAvailability.map(newTime => {
        if (newTime.time === currentTime[0].time){
            newTime.isTimeBooked = true
        }   
        return newTime
    })
    updatedNewUser["name"] = ""
    updatedNewUser["number"] = ""
    updatedNewUser["timeslot"] = ""
    this.setState({ users: combinedUsers, newUser: updatedNewUser, availableTimes: newAvailableTimes });
  };

  render() {
    const returnTimes = this.state.availableTimes.map((timeslot, i) => {
      return (
        <div
          key={i}
          data-toggle="modal"
          data-target="#exampleModalCenter"
          onClick={e => this.activateModal(e, i)}
          className={timeslot.isTimeBooked === true ? "timeslot booked" : "timeslot"}
          id={i}
        >
          {timeslot.time}
        </div>
      );
    });
    return (
      <div>
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
                  value={this.state.newUser.name || "" }
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="modal-body">
                <input
                  onChange={this.handleInput}
                  value={this.state.newUser.number || ""}
                  name="number"
                  type="text"
                  placeholder="Your Number"
                />
              </div>
              <div className="modal-footer">
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