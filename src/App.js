import React from "react";
import Map from "./components/map";
import Header from "./components/header";
import "./assets/App.css";
import axios from "axios";
import Gallery from "./components/gallery";

/* const handleRequest = () => {
  var map;
  var service;
  initialize();

  function initialize() {
    var example = new google.maps.LatLng(-28, -65);

    map = new google.maps.Map(document.getElementById("map"), {
      center: example,
      zoom: 8
    });

    var request = {
      location: example,
      radius: "27000",
      type: ["locality"]
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
  }

  function callback(results, status) {
    console.log(results);
    console.log(status);
  }
};
handleRequest(); */
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

  componentDidUpdate() {
    setTimeout(() => {
      this.handleReload();
    }, 10000);
  }

  render() {
    var center = {
      lat: this.state.location.latitude,
      lng: this.state.location.longitude
    };

    /*  this.handleReload(center, map); */
    return (
      <div className="Container">
        <Header />
        <Map newCenter={center} zoom={6} />
        <Gallery iss_position={center} />
      </div>
    );
  }
}

export default App;
