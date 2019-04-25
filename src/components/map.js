import React from "react";
import "../assets/map.css";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "10px 10px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%"
    }}
  >
    {text}
  </div>
);
console.log(GoogleMapReact);
class Map extends React.Component {
  static defaultProps = {
    center: {
      lat: -40,
      lng: -65
    },
    zoom: 3,
    location: {}
  };

  render() {
    return (
      <div className="Map bg-primary">
        <GoogleMapReact
          id="map"
          bootstrapURLKeys={{ key: "AIzaSyDhn-OzNyFepv3Jp0bsBPZeY30kvGugHo4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.props.newCenter}
          heatmapLibrary={true}
        >
          <Marker
            lat={this.props.newCenter.lat}
            lng={this.props.newCenter.lng}
            text="ISS"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;
