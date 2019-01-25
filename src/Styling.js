import styled from "styled-components";

export const Body = styled.div`
  @import url("https://fonts.googleapis.com/css?family=PT+Sans|Raleway");
  * {
    text-align: center;
  }
  .modal-title {
    font-family: "PT Sans";
  }
  input {
    width: 25vw;
    @media screen and (max-width: 800px) {
      width: 60vw;
      border: 1px solid black;
    }
  }
  img {
    margin-top: 2vh;
    width: 400px;
    height: auto;
    @media screen and (max-width: 800px) {
      width: 350px;
      height: auto;
    }
  }
  .btn {
    background-color: rgb(0, 82, 138);
  }
  .headline {
    margin-top: 3vh;
    font-size: 3rem;
    font-family: "PT Sans";
    color: rgb(0, 82, 138);
    @media screen and (max-width: 800px) {
      font-size: 2rem;
    }
  }
  .tagline {
    font-size: 1rem;
    font-family: "Raleway";
    @media screen and (max-width: 800px) {
      font-size: 1rem;
      margin-left: 1vw;
      margin-right: 1vw;
    }
  }
  .poll-container {
    margin-top: 2vh;
    .count {
      font-size: 1.5rem;
    }
    .poll-button {
      border: 1px solid black;
      opacity: 0.5;
      border-radius: 25px;
      font-size: 1.25rem;
      padding: 10px;
      margin: 0.5vh 1vw 0vh 1vw;
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
        background-color: #9e1316;
        color: white;
      }
    }
  }
  .poll-headline,
  .time-table-tagline {
    font-family: "PT Sans";
    color: rgb(0, 82, 138);
    font-size: 1.75rem;
    @media screen and (max-width: 800px) {
      font-size: 1.75rem;
      margin-top: 2vh;
    }
  }
`;

export const TimeTable = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 50%;
  margin: 3vh 25vw 0vh 25vw;
  .timeslot {
    border: 1px solid black;
    width: 25vw;
    text-align: center;
    border-radius: 25px;
    font-size: 1.5rem;
    font-family: "Raleway";
    &:hover {
      background-color: rgb(0, 82, 138);
      color: white;
    }
    @media screen and (max-width: 800px) {
      width: 75vw;
    }
  }

  .booked {
    background-color: red;
    &:hover {
      background-color: red;
      color: yellow;
    }
  }
  @media screen and (max-width: 800px) {
    width: 100vw;
    margin: 0;
  }
`;
