import React from "react";
import axios from "axios";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: props.iss_position.lat,
      lng: props.iss_position.lng
    };
  }
  handleRequest = () => {
    var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
      this.state.lat
    },${
      this.state.lng
    }&radius=270000&type=locality&key=AIzaSyDhn-OzNyFepv3Jp0bsBPZeY30kvGugHo4`;
    axios
      .get(url)
      .then(response => {
        //Convert position coordinates strings to number and assign to this.state
        if (response.data.results.length > 0) {
          console.log(response.data.results);
          console.log(response.data.results[0].name);
          console.log(response.data.results[1].name);
        } else {
          console.log(response);
          console.log("No hay lugares cerca!");
        }
      })
      .catch(error => {
        // handle error
        console.log(error);
      });

    function callback(results, status) {
      console.log(results);
      console.log(status);
    }
  };
  componentWillReceiveProps(props) {
    this.setState({
      lat: props.iss_position.lat,
      lng: props.iss_position.lng
    });
  }
  render() {
    this.handleRequest();
    return <div />;
  }
}

export default Gallery;
