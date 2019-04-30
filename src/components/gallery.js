import React from "react";
import axios from "axios";
import GalleryItems from "./gallery-items";


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      cities: [],
      fetchedCities: [],
      src: []
    };
  }

  componentWillReceiveProps(props) {
    let fetchedCities = [];

    // ISS takes 90 minutes to orbit Earth, so this expire [cities] that were fetched more than 30 min (1800000 ms) ago
    this.state.fetchedCities.forEach(function (city) {
      if (city.time + 1800000 > new Date().getTime()) {
        //if city values have less than 30 min, add the new city to fetchedCities. 
        fetchedCities.push(city);
      }
    });
    // Set fetchedCities updated state and save props received to new state.
    // When state is updated, call loopCites 
    this.setState({
      cities: props.cities,
      fetchedCities: fetchedCities
    }, this.loopCities);
  }

  // Loop through each city in [cities] and fetch images based on the city name. 
  loopCities = () => {
    this.state.cities.forEach(city => this.fetchData(city));
  }

  // Fetch images from API, if the request is unique within the last 30 min
  // @param city [Object]
  // @return  {}  Set State for fetched images
  // @private
  fetchData = (city) => {
    // alreadyFetched must be false in order to fetch pictures. When is true, it means that pictures have been already requested. 
    let alreadyFetched = false, fetchedCities = this.state.fetchedCities;

    // Check if new city has already been fetched. 
    fetchedCities.forEach(currCity => {
      if (currCity.city == city.city) {
        alreadyFetched = true;
      }
    });
    if (alreadyFetched) {
      return;
    }

    // Add new city and the now time to the accumulator to register the moment the city got fetched.
    fetchedCities.push({
      city: city.city,
      time: new Date().getTime()
    });
    // Update the state of fetchesCities
    this.setState({
      error: null,
      loading: false,
      fetchedCities: fetchedCities
    });

    // Fetch images
    const url = `https://pixabay.com/api/?key=12293791-e1438841e69971c4d4ccb4944&category=places&q=${city.city}&order=popular&per_page=15&page=1`;
    axios.get(url).then(response => {
      if (!response.data.hits) {
        return
      }
      if (!response.data.hits.length) {
        return
      }
      let newSrc = this.state.src.concat(response.data.hits);
      let slicedSrc = newSrc.slice(newSrc.length - 15, newSrc.length).reverse();
      this.setState({
        src: slicedSrc,
        loading: false,
        error: null
      })
    }).catch(error => {
      this.setState({
        error: error,
        loading: false
      });
    });

  }

  render() {
    let images = this.state.src
    return (
      <GalleryItems images={images} />
    );
  }
}

export default Gallery;
