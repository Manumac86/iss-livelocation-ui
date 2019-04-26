import React from "react";
import axios from "axios";
import Gallery from "./gallery";

class GalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.iss_position.lat,
      lng: props.iss_position.lng,
      cities: {}
    };
  }
  handleRequest = () => {
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      this.state.lat
    },${
      this.state.lng
    }&radius=13820&type=cities&key=AIzaSyDhn-OzNyFepv3Jp0bsBPZeY30kvGugHo4`;
    axios
      .get(url)
      .then(response => {
        //Convert position coordinates strings to number and assign to this.state
        if (response.data.results.length > 0) {
          this.setState({
            cities: response.data.results
          });
        } else {
          console.log(response);
          console.log("No cities to show!");
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  };
  componentWillReceiveProps(props) {
    this.setState({
      lat: props.iss_position.lat,
      lng: props.iss_position.lng
    });
  }
  render() {
    this.handleRequest();
    return <Gallery cities={this.state.cities} />;
  }
}

export default GalleryContainer;
