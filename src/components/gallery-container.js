import React from "react";
import axios from "axios";
import Gallery from "./gallery";

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

  componentWillReceiveProps(props) {
    this.setState(
      {
        lat: props.iss_position.latitude,
        lng: props.iss_position.longitude
      },
      this.handleRequest
    );
  }

  toggleState = () => {
    this.setState({
      requestEnabled: false
    });
    setTimeout(() => this.setState({
      requestEnabled: true
    }), 10000)
  }

  handleRequest = () => {
    var lat = (this.state.lat > 0) ? this.state.lat.toString().replace(',', '.') : this.state.lat.toString().replace(',', '.');
    var lng = (this.state.lng > 0) ? "%2B" + this.state.lng.toString().replace(',', '.') : this.state.lng.toString().replace(',', '.');
    var url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?location=${lat}${lng}&radius=1600`;
    var authOptions = {
      method: 'GET',
      url: url,
      headers: {
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
        "X-RapidAPI-Key": "374f29d493msh59490e39c22b678p13024djsn81c1ae804e5d"
      }
    }
    if (!this.state.requestEnabled) {
      return
    }
    axios(authOptions)
      .then(response => {
        //Convert position coordinates strings to number and assign to this.state
        let citiesNames = response.data.data.map(city => city);
        this.setState({
          cities: citiesNames
        });
        this.toggleState();
      })
      .catch(error => {
        // handle error
        console.log(error);
      });

  };

  render() {
    return <Gallery cities={this.state.cities} />;
  }
}

export default GalleryContainer;
