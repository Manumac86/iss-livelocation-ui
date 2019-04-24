import React from "react";
import Map from "./components/map";
import Header from "./components/header";
import "./assets/App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then(response => {
        //Convert position coordenates strings to number and assign to this.state
        location.latitude = parseFloat(response.data.iss_position.latitude);
        location.longitude = parseFloat(response.data.iss_position.longitude);
        this.setState({ location });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }

  handleReload = () => {
    axios
      .get("http://api.open-notify.org/iss-now.json")
      .then(response => {
        //Convert position coordinates strings to number and assign to this.state
        location.latitude = parseFloat(response.data.iss_position.latitude);
        location.longitude = parseFloat(response.data.iss_position.longitude);
        this.setState({ location });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };

  render() {
    var center = {
      lat: this.state.location.latitude,
      lng: this.state.location.longitude
    };
    return (
      <div className="Container">
        <Header />
        <Map newCenter={center} zoom={5} />
        <button onClick={this.handleReload}>Reload!</button>
      </div>
    );
  }
}

export default App;
