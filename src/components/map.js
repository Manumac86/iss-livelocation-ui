import React from "react";
import "../assets/map.css";
import GoogleMapReact from "google-map-react";
import Marker from './marker';

/**
 * Map React Component. Render the Map from Google Maps and the Marker inside. 
 *
 * @class Map
 * @extends {React.Component}
 */
class Map extends React.Component {
  /**
   * Define statics default props in case the fetch to ISS position fails.
   * @static
   * @memberof Map
   * @private
   */
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
            text={"ISS"}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
export default Map;
