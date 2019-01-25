import React, { Component } from "react";

class Modal extends Component {
  render() {
    return (
      <div>
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
                  Please enter your name and number to confirm your {this.props.timeslot} appointment
                </h5>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  onChange={this.props.handleInput}
                  value={this.props.newUser.name || ""}
                  name="name"
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="modal-body">
                <input
                  onChange={this.props.handleInput}
                  onBlur={this.props.validatePhone}
                  value={this.props.newUser.number || ""}
                  name="number"
                  type="text"
                  id="number"
                  placeholder="Tel# Ex) XXX-XXX-XXXX"
                />
              </div>
              <div className="modal-footer">
                <button
                  onClick={this.props.handleSubmit}
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                  disabled={this.props.invalid === true ? true : false}
                >
                  Book Apppointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;