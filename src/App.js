import React from "react";
import Map from "./components/map";
import Header from "./components/header";
import axios from "axios";
import GalleryContainer from "./components/gallery-container";
import ReloadButton from './components/reload-button';

// App Component. Renders App components and handles ISS position requests
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {}
    };
  }

  //Once the App component is mounted, do the ISS Position fetch 
  componentDidMount() {
    this.requestIssPosition();
  }

  // Request ISS position coordinates
  // @function requestIssPosition
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
        // To Do: Show an Error Message to User if the fetch fails
        console.log(error);
      });
  };

  // Handles the reload button action. Fetch the new ISS position.
  handleReload = () => {
    this.requestIssPosition();
  };
  render() {
    //Object to be passed as prop to the Map Component with lat and lng parameters.
    var center = {
      lat: this.state.location.latitude,
      lng: this.state.location.longitude
    }
    return (
      <div className="Container">
        <Header />
        <Map newCenter={center} zoom={3} />
        <ReloadButton handleClick={this.handleReload} />
        <GalleryContainer iss_position={this.state.location} />
      </div>
    );
  }
}

export default App;
