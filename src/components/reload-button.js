import React from 'react';
import '../assets/reload-button.css';

function ReloadButton(props) {
    return (
        <div className="Reload-Button">
            <button onClick={props.handleReload}><i className="fas fa-sync-alt"></i> Reload</button>
        </div>
    )
}
export default ReloadButton;