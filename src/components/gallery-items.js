import React from 'react';
import '../assets/gallery.css';
import axios from 'axios';


class GalleryItems extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            api: [],
            requestEnabled: true
        }
    }
    componentDidMount() {
        if (!this.props.images[0]) {
            this.fetchDefault();
        }
    }

    /**
     * Fetch a collection of Sea Pictures to show when there are no cities around ISS Position
     * Set the state of api with the response. 
     */
    fetchDefault = () => {
        const url = `https://pixabay.com/api/?key=12293791-e1438841e69971c4d4ccb4944&q=sea+sky&order=latest&per_page=15&page=1`;
        axios.get(url).then(response => {
            if (!response.data.hits) {
                return
            }
            this.setState({
                api: response.data.hits
            })
            this.toggleState();
        });
    }

    /**
     * Avoid multiple request to the same endpoint within 1 sec, to prevent error responses
     */
    toggleState = () => {
        this.setState({
            requestEnabled: false
        });
        setTimeout(() => this.setState({
            requestEnabled: true
        }), 1000)
    }
    render() {
        if (!this.props.images[0] || !this.state.requestEnabled) {
            return (
                <div className="Gallery-Error col-12">
                    <p>
                        We couldn't find Photos for cities around this point! <br></br>
                        You can see the latest sea pictures here!
                    </p>
                    <ul className="Gallery-List row">
                        {this.state.api.map(image => {
                            return (
                                <li className="Gallery-Item col-sm-12 col-md-4" key={image.id} style={{ background: `url(${image.webformatURL}) center center / cover no-repeat` }}>
                                    <a href={image.largeImageURL} target="_blank">
                                        <div className="Gallery-Title">
                                            <i className="fas fa-user"></i>
                                            <p>{image.user}</p>
                                            <p>{image.tags}</p>
                                        </div>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div >
            )
        }
        return (
            <ul className="Gallery-List row">
                {this.props.images.map((image) => {
                    return (
                        <li className="Gallery-Item col-sm-12 col-md-4" key={image.id} style={{ background: `url(${image.webformatURL}) center center / cover no-repeat` }}>
                            <a href={image.largeImageURL} target="_blank">
                                <div className="Gallery-Title">
                                    <i className="fas fa-user"></i>
                                    <p>{image.user}</p>
                                    <p>{image.tags}</p>
                                </div>
                            </a>
                        </li>
                    )
                })}
            </ul>
        );
    }
}
export default GalleryItems;