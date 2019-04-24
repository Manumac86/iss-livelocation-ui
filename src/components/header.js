import React from "react";
import "../assets/header.css";

class Header extends React.Component {
  render() {
    return (
      <div className="Header container-fluid bg-dark">
        <h1>ISS Live Location</h1>
        <p>React Live Tracker for International Space Station</p>
      </div>
    );
  }
}

export default Header;
