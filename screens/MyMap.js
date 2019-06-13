import React, { Component } from "react";
import MapView from "react-native-maps";

export default class MyMap extends Component {
  constructor(props) {
    super(props);
    this.state = { markers: this.props.navigation.state.params.positionList };
  }
  static navigationOptions = {
    title: "Map",
    headerStyle: {
      backgroundColor: "#2c387e"
    },
    headerTitleStyle: {
      color: "#fff"
    }
  };

  render() {
    return (
      <MapView
        style={{
          flex: 1
        }}
        initialRegion={{
          latitude: 50.060827,
          longitude: 19.95168,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.state.markers.map((marker, index) => {
          const coords = {
            latitude: marker.latitude,
            longitude: marker.longitude
          };

          const metadata = `latitude: ${marker.latitude}, longitude: ${
            marker.longitude
          }`;

          return (
            <MapView.Marker
              key={index}
              coordinate={coords}
              title={"Saved position"}
              description={metadata}
            />
          );
        })}
      </MapView>
    );
  }
}
