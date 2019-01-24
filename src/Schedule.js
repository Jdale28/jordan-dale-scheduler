import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

const Body = styled.div`
  @import url("https://fonts.googleapis.com/css?family=PT+Sans|Raleway");
  * {
    text-align: center;
  }
  .headline {
    margin-top: 3vh;
    font-size: 4rem;
    font-family: "PT Sans";
  }
  .tagline {
    font-size: 1.25rem;
    font-family: "Raleway";
  }
  .poll-container {
    margin-top: 5vh;
    .count {
        font-size: 1.5rem;
    }
    .poll-button {
      border: 1px solid black;
      opacity: 0.5;
      border-radius: 25px;
      font-size: 1.25rem;
      padding: 10px;
      margin: 2vh 1vw 0vh 1vw;
      &:hover {
        opacity: 1;
      }
    }
    #love {
        &:hover {
            background-color: hotpink;
        }
    }
    #hate {
        &:hover {
            background-color: black;
            color: yellow;
        }
    }
  }
  .poll-headline,
  .time-table-tagline {
    font-family: "PT Sans";
  }
`;

const TimeTable = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 5vh 25vw 0vh 25vw;
  .timeslot {
    border: 1px solid black;
    width: 25vw;
    text-align: center;
    border-radius: 25px;
    font-size: 1.5rem;
    font-family: "Raleway";
    &:hover {
      background-color: blue;
      color: white;
    }
  }
  .booked {
    background-color: red;
    &:hover {
      background-color: red;
      color: yellow;
    }
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

  // When Modal activates, this function runs to determine whether time is available or not, and corresponding actions
  updateModalFields = (e, i) => {
    // saves the timeslot selected
    let value = e.target.innerHTML;
    let activeUser = { ...this.state.newUser };
    // IF the time has not been booked, update the timeslot in newUser's information
    if (this.state.availableTimes[i].isTimeBooked === false) {
      activeUser["timeslot"] = value;
      this.setState({ timeslot: value, newUser: activeUser });
    }
    // ELSE, because time has been booked, populated the booked user's information in the modal input fields
    else {
      let bookedUser = this.state.users.filter(user => {
        return user.timeslot === value;
      });
      activeUser = bookedUser[0];
      this.setState({ newUser: activeUser });
    }
  };

  // Set data from input field into newUser object
  handleInput = e => {
    const updatedNewUser = { ...this.state.newUser };
    updatedNewUser[e.target.name] = e.target.value;
    this.setState({ newUser: updatedNewUser });
  };

  handleSubmit = e => {
    let updatedNewUser = { ...this.state.newUser };
    let allUsers = [...this.state.users];
    const currentUser = allUsers.filter(
      user => user.timeslot === updatedNewUser.timeslot
    );
    let combinedUsers;
    if (currentUser[0]) {
      const filteredUsers = allUsers.filter(
        user => user.timeslot !== updatedNewUser.timeslot
      );
      combinedUsers = filteredUsers.concat([this.state.newUser]);
    } else {
      combinedUsers = [...this.state.users, this.state.newUser];
    }
    let updatedAvailability = [...this.state.availableTimes];
    const currentTime = updatedAvailability.filter(
      time => time.time === this.state.timeslot
    );
    const newAvailableTimes = updatedAvailability.map(newTime => {
      if (newTime.time === currentTime[0].time) {
        newTime.isTimeBooked = true;
      }
      return newTime;
    });
    updatedNewUser["name"] = "";
    updatedNewUser["number"] = "";
    updatedNewUser["timeslot"] = "";
    this.setState({
      users: combinedUsers,
      newUser: updatedNewUser,
      availableTimes: newAvailableTimes
    });
  };

  loveModals = () => {
    this.props.dispatch({ type: "LOVE" });
  };

  hateModals = () => {
    this.props.dispatch({ type: "HATE" });
  };

  render() {
    const returnTimes = this.state.availableTimes.map((timeslot, i) => {
      return (
        <div
          key={i}
          data-toggle="modal"
          data-target="#modalCenter"
          onClick={e => this.updateModalFields(e, i)}
          className={
            timeslot.isTimeBooked === true ? "timeslot booked" : "timeslot"
          }
          id={i}
        >
          {timeslot.time}
        </div>
      );
    });
    return (
      <Body>
        <h1 className="headline"> Welcome to Our Offices</h1>
        <h4 className="tagline">
          Please utilize our interactive scheduling software to book an
          appointment
        </h4>
        <h4 className="tagline">
          Please note that booked appointments are in highlighted in red
        </h4>
        <h4 className="tagline">
          We apologize... we are very forgetful, if you leave this page, your
          bookings will refresh
        </h4>

        <TimeTable>
          <h1 className="time-table-tagline">Please Select a Time Below</h1>
          <div>{returnTimes}</div>
        </TimeTable>

        {/* Modal Code */}
        <div
          className="modal fade"
          id="modalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="modalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="modalCenterTitle">
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
                  value={this.state.newUser.name || ""}
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
        {/* End Modal Code */}

        {/* Start of Poll Code */}
        <div className="poll-container">
          <h1 className="poll-headline">Poll:</h1>
          <h2 className="tagline">Love or Hate Modals?</h2>
          <div>
            <button className="poll-button" id="hate" onClick={this.hateModals}>
              Hate
            </button>
            <span className="count">{this.props.count}</span>
            <button className="poll-button" id="love" onClick={this.loveModals}>
              Love
            </button>
          </div>
        </div>
      </Body>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(Schedule);