import React from "react";
import "../assets/map.css";
import GoogleMapReact from "google-map-react";

const Marker = ({ text }) => (
  <div
    style={{
      color: "white",
      background: "grey",
      padding: "15px 15px",
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
      <div id="map" className="Map bg-primary">
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyB6L8wEWqi-SCgiQQwDFuzlfx3c95lnJ_0" }}
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
