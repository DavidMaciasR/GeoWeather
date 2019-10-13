import React, { Component } from 'react';
import { StyleSheet, FlatList, Text } from 'react-native';
import ForecastCard from './components/ForecastCard';

export default class App extends Component {
  // let latitude, longitude, forecast, error;

  constructor(props) {
    super(props);

    this.state = {
      latitude: 0,
      longitude: 0,
      forecast: [],
      error: ''
    };
  }

  componentDidMount() {
    // Get the user's location
    this.getLocation();
  }

  render() {
    return (
      <FlatList
        data={this.state.forecast.list}
        style={{ marginTop: 20 }}
        keyExtractor={item => item.dt_txt}
        renderItem={({ item }) => (
          <ForecastCard
            detail={item}
            location={this.state.forecast.city.name}
          />
        )}
      />
    );
  }

  getLocation() {
    // Get the current position of the user
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState(
          prevState => ({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }),
          () => {
            this.getWeather();
          }
        );
      },
      error => this.setState({ forecast: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  getWeather() {
    // Construct the API url to call
    let url =
      'https://api.openweathermap.org/data/2.5/forecast?lat=' +
      this.state.latitude +
      '&lon=' +
      this.state.longitude +
      '&units=metric&appid=90313be7e8e5f4cb47423f1c3cd523db';

    console.log(url);
    // Call the API, and set the state of the weather forecast
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState((prevState, props) => ({
          forecast: data
        }));
      });
  }
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
