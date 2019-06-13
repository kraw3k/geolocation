import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

export default class MyListItem extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.image}
        />
        <View style={styles.coordinates}>
          <Text style={styles.text}> timestmap: {this.props.timestamp} </Text>
          <Text style={styles.text}> longtitude: {this.props.lon} </Text>
          <Text style={styles.text}> latitude: {this.props.lat} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    marginBottom: 10
  },
  image: {
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  coordinates: {
    flex: 3,
    flexDirection: "column",
    alignItems: "center"
  },
  text: {
    flex: 3,
    color: "#000"
  }
});
