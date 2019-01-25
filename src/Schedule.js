import React, { Component } from "react";
import { connect } from "react-redux";
import { Body, TimeTable } from "./Styling";
import Modal from "./Modal";

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
        time: "9 a.m. - 10 a.m.",
        isTimeBooked: false
      },
      {
        time: "10 a.m. - 11 a.m.",
        isTimeBooked: false
      },
      {
        time: "11 a.m. - 12 p.m.",
        isTimeBooked: false
      },
      {
        time: "12 p.m. - 1 p.m.",
        isTimeBooked: false
      },
      {
        time: "1 p.m. - 2 p.m.",
        isTimeBooked: false
      },
      {
        time: "2 p.m. - 3 p.m.",
        isTimeBooked: false
      },
      {
        time: "3 p.m. - 4 p.m.",
        isTimeBooked: false
      },
      {
        time: "4 p.m. - 5 p.m.",
        isTimeBooked: false
      }
    ],
    invalid: false
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
        this.setState({ timeslot: value})
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
    if (this.state.invalid !== true) {
      let updatedNewUser = { ...this.state.newUser };
      let allUsers = [...this.state.users];
      // Finds currentUser based on matching timeslot
      const currentUser = allUsers.filter(
        user => user.timeslot === updatedNewUser.timeslot
      );
      let combinedUsers;
      // If user exists, then update
      if (currentUser[0]) {
        // Find all who are NOT currentUser via timeslot
        const filteredUsers = allUsers.filter(
          user => user.timeslot !== updatedNewUser.timeslot
        );
        // Combine non-currentUser with currentUser's input
        combinedUsers = filteredUsers.concat([this.state.newUser]);
      } else {
        // ELSE create new user
        combinedUsers = [...this.state.users, this.state.newUser];
      }
      let updatedAvailability = [...this.state.availableTimes];
      // Determine whether timeslot has been previously booked
      const currentTime = updatedAvailability.filter(
        time => time.time === this.state.timeslot
      );
      // Change currentTime to booked
      const newAvailableTimes = updatedAvailability.map(newTime => {
        // IF it equals currentTime then update isTimeBooked boolean
        if (newTime.time === currentTime[0].time) {
          newTime.isTimeBooked = true;
        }
        return newTime;
      });
      // Reset newUser in state to allow unique inputs on timeslot's without bookings
      updatedNewUser["name"] = "";
      updatedNewUser["number"] = "";
      updatedNewUser["timeslot"] = "";
      this.setState({
        users: combinedUsers,
        newUser: updatedNewUser,
        availableTimes: newAvailableTimes
      });
    }
  };

  loveModals = () => {
    this.props.dispatch({ type: "LOVE" });
  };

  hateModals = () => {
    this.props.dispatch({ type: "HATE" });
  };

  validatePhone = () => {
    //validates phone number input based on regular expression
    var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!this.state.newUser.number.match(phoneno)) {
      document.getElementById("number").style.backgroundColor = "red";
      this.setState({ invalid: true });
    } else {
      document.getElementById("number").style.backgroundColor = "white";
      this.setState({ invalid: false });
    }
  };

  render() {
    // Loops from State of availableTimes and produce divs for each one
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
        <div>
          <img
            src="https://i.imgur.com/2qWGonz.png"
            alt="Cox Automotive Logo"
          />
        </div>
        <h1 className="headline"> Welcome to Our Offices</h1>
        <h4 className="tagline">
          Please utilize our interactive scheduling software to book an
          appointment.
        </h4>
        <h4 className="tagline">
          Please note that booked appointments are highlighted in red.
        </h4>
        <h4 className="tagline">
          We apologize... we are very forgetful. If you leave this page, your
          bookings will reset.
        </h4>
        <TimeTable>
          <h1 className="time-table-tagline">Please Select a Time Below</h1>
          <div>{returnTimes}</div>
        </TimeTable>
        {/* Start of Modal Code - Passed down relevant functions; info*/}
        <Modal
          availableTimes={this.state.availableTimes}
          newUser={this.state.newUser}
          users={this.state.users}
          timeslot={this.state.timeslot}
          invalid={this.state.invalid}
          updateModalFields={this.updateModalFields}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
          validatePhone={this.validatePhone}
        />
        {/* End Modal Code
    
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
        {/* End of Poll Code */}
      </Body>
    );
  }
}

const mapStateToProps = state => ({
  count: state.count
});

export default connect(mapStateToProps)(Schedule);
