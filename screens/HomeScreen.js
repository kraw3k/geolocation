import React from "react";
import { StyleSheet, View, Text } from "react-native";
import * as Font from 'expo-font'
import MyButton from "../components/MyButton";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontloaded: false };
  }

  static navigationOptions = {
    header: null,
    title: "HomeScreen",
    headerStyle: {
      backgroundColor: "#2c387e"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  componentWillMount = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf")
    });
    this.setState({ fontloaded: true });
  };

  render() {
    return this.state.fontloaded ? (
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.h1}>Geolocation</Text>
          <Text style={styles.h2}>Get and save your position</Text>
          <Text style={styles.h3}>made by Kacper Krawczyk</Text>
        </View>
        <View style={styles.content}>
          <MyButton text="START" PressFunction={()=>{this.props.navigation.navigate("MyPositions");}} />
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: "#3f51b5",
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  h1: {
    fontSize: 48,
    color: "#fff",
    fontFamily: "Montserrat-Regular"
  },
  h2: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "Montserrat-Regular"
  },
  h3: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "Montserrat-Regular"
  },
});
