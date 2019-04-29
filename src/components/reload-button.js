import React from 'react';
import '../assets/reload-button.css';

/**
 * Reload Button for reload the ISS Position and the Pictures
 *
 * @param {function} props function to handle click action
 * @returns
 */
function ReloadButton(props) {
    return (
        <div className="Reload-Button">
            <button onClick={props.handleClick}>
                <i className="fas fa-sync-alt"></i>
                Reload
            </button>
        </div>
    )
}
export default ReloadButton;