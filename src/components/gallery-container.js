import React from "react";
import axios from "axios";
import Gallery from "./gallery";

// GalleryContainer Component. Renders the Gallery UI and fetch the cities near ISS Location
// If there is a city near ISS Location, renders the gallery and sends an array of [cities] to Gallery Component 
class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "360",
      lng: "360",
      cities: [],
      requestEnabled: true
    };
  }

  // Set the state for ISS position when props are received
  // and calls the request method to get the cities. 
  // props received ISS Location from App Component
  componentWillReceiveProps(props) {
    this.setState(
      {
        lat: props.iss_position.latitude,
        lng: props.iss_position.longitude
      },
      this.handleRequest
    );
  }

  /**
   * Toggle a requestEnabled state to prevent multiple requests to cities
   * if other request were done within the last 10 sec. After that, enables again the requests
   * @memberof GalleryContainer 
   */
  toggleState = () => {
    this.setState({
      requestEnabled: false
    });
    setTimeout(() => this.setState({
      requestEnabled: true
    }), 1000)
  }

  /**
   * Fetch nearby ISS position cities from the GeoDB Cities API.
   */
  handleRequest = () => {
    // Set format of position to make the correct request. 
    // To Do: Separate formatting in a new method.  
    var lat = (this.state.lat > 0) ? this.state.lat.toString().replace(',', '.') : this.state.lat.toString().replace(',', '.');
    var lng = (this.state.lng > 0) ? "%2B" + this.state.lng.toString().replace(',', '.') : this.state.lng.toString().replace(',', '.');
    var url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${lat}${lng}&radius=17000&languageCode=en`;
    var authOptions = {
      method: 'GET',
      url: url,
      headers: {
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": "374f29d493msh59490e39c22b678p13024djsn81c1ae804e5d"
      }
    }
    //Checks if requestEnabled is true or false to avoid duplicated requests
    if (!this.state.requestEnabled) {
      return
    }
    // Request the cities nearby ISS position
    // @param   {Object}  authOptions  Config Options for axios request
    // @return  If the request hava a valid response, set an array with [citiesNames] to [cities] state.
    axios(authOptions)
      .then(response => {
        let citiesNames = response.data.data.map(city => city);
        this.setState({
          cities: citiesNames
        });
        this.toggleState();
      })
      .catch(error => {
        // To Do: Display an Error Message to the User
        console.log(error);
      });
  };

  render() {
    return (
      <Gallery cities={this.state.cities} />
    );
  }
}

export default GalleryContainer;
