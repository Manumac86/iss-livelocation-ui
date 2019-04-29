import React from "react";
import "../assets/map.css";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "rgba(155, 0, 0, .6)",
      boxShadow: "0 0 40px 40px rgba(155, 0, 0, .4)",
      padding: "15px 15px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%"
    }}
  >
    {text}
  </div>
);
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
