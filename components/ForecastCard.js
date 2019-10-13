import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

export default class ForecastCard extends Component {
  render = () => {
    return <Card containerStyle={styles.card}></Card>;
  };
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(56, 172, 236, 1)',
    borderWidth: 0,
    borderRadius: 20
  }
});
