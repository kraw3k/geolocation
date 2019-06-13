import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Font from 'expo-font'

export default class MyButton extends Component {
  constructor(props) {
    super(props);
    this.state = { fontloaded: false };
  }

  componentWillMount = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf")
    });
    this.setState({ fontloaded: true });
  };

  render() {
    return this.state.fontloaded ? (
      <TouchableOpacity
        onPress={this.props.PressFunction}
        style={styles.Touchable}
      >
        <Text style={styles.Text}> {this.props.text} </Text>
      </TouchableOpacity>
    ) : null;
  }
}

MyButton.propTypes = {
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  Touchable: {
    padding: 5
  },
  Text: {
    fontFamily: "Montserrat-Regular"
  }
});
