import React from "react";
import axios from "axios";

/* var state = {
  loading: true,
  error: null,
  data: undefined
}; */
class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.getMedia();
  }
  state = {
    src: ""
  };
  componentWillReceiveProps(props) {
    this.getMedia();
  }
  getMedia = () => {
    let cities = this.props.cities;
    console.log(cities);
    let qUrl = "";
    for (var q in cities) {
      qUrl += q + "+";
    }
    qUrl = qUrl.substring(0, qUrl.length - 1);
    console.log(qUrl);

    let url = `https://pixabay.com/api/?key=12293791-e1438841e69971c4d4ccb4944&category=places&q=${qUrl}&category=places&order=popular&per_page=15&page=1`;
    axios.get(url).then(response => {
      let data = response.data.hits[0].webformatURL;
      this.setState({
        src: data
      });
    });
  };

  render() {
    return (
      <div>
        <img src={this.state.src} />
      </div>
    );
  }
}
export default Gallery;
