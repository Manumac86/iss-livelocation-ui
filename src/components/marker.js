import React from 'react';
import '../assets/marker.css'

/**
 * Marker UI for the ISS Position on the Map
 *
 * @param {String} props Text for the marker
 * @export Marker React Pure Component 
 */
function Marker(props) {
    return (
        <div className="Marker">
            {props.text}
        </div>
    );
}
export default Marker;