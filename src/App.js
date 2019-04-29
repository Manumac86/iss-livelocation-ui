import React from "react";
import Map from "./components/map";
import Header from "./components/header";
import "./assets/App.css";
import axios from "axios";
import GalleryContainer from "./components/gallery-container";
import ReloadButton from './components/reload-button';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    };
  }

  componentDidMount() {
    this.requestIssPosition();
  }

  /**
   * @function requestIssPosition
   * @desc: request ISS position coordinates
   */
  requestIssPosition = () => {
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

  handleReload = () => {
    this.requestIssPosition();
  };

  render() {
    var center = {
      lat: this.state.location.latitude,
      lng: this.state.location.longitude
    };
    return (
      <div className="Container">
        <Header />
        <Map newCenter={center} zoom={3} />
        <ReloadButton handleReload={this.handleReload}></ReloadButton>
        <GalleryContainer iss_position={this.state.location} />
      </div>
    );
  }
}

export default App;
