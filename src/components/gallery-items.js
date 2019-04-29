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
        this.fetchDefault();
    }
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
    toggleState = () => {
        this.setState({
            requestEnabled: false
        });
        setTimeout(() => this.setState({
            requestEnabled: true
        }), 60000)
    }
    render() {
        if (!this.props.images[0] || !this.state.requestEnabled) {
            return (
                <div className="Gallery-Error col-12">
                    <p>
                        No cities around this point! <br></br>
                        You can see the latest sea pictures here!
                    </p>
                    <ul className="Gallery-List row">
                        {this.state.api.map(image => {
                            return (
                                <li className="Gallery-Item col-sm-12 col-md-4" key={image.id} style={{ background: `url(${image.webformatURL}) center center / cover no-repeat` }}>
                                    <div className="Gallery-Title">
                                        <i className="fas fa-user"></i>
                                        <p>{image.user}</p>
                                    </div>
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
                    slicedImage = image.slice(image.length - 15, image.length).reverse();
                    return (
                        <li className="Gallery-Item col-sm-12 col-md-4" key={slicedImage.id} style={{ background: `url(${slicedImage.webformatURL}) center center / cover no-repeat` }}>
                            <div className="Gallery-Title">
                                <p>Image Title</p>
                            </div>
                        </li>
                    )
                })}
            </ul>
        )
    }
}
export default GalleryItems;