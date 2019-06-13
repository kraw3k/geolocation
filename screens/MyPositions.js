import React from "react";
import { StyleSheet, View, FlatList, Alert, AsyncStorage } from "react-native";
import * as Font from "expo-font";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";

import MyButton from "../components/MyButton";
import MyListItem from "../components/MyListItem";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { fontloaded: false, positionList: [] };
    this.GetAndSaveLocation = this.GetAndSaveLocation.bind(this);
    this.DeleteAllLocations = this.DeleteAllLocations.bind(this);
    this.GoToMap = this.GoToMap.bind(this);
  }

  static navigationOptions = {
    title: "My positions",
    headerStyle: {
      backgroundColor: "#2c387e"
    },
    headerTitleStyle: {
      color: "#fff",
      fontFamily: "Montserrat-Regular"
    }
  };

  setPermissions = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      alert("permissions denied");
    }
  };

  componentWillMount = async () => {
    await Font.loadAsync({
      "Montserrat-Regular": require("../assets/fonts/Montserrat-Regular.ttf")
    });
    this.setState({ fontloaded: true });
  };

  componentDidMount = async () => {
    this.setPermissions();
    this.getAllData();
  };

  GetAndSaveLocation = async () => {
    let pos = await Location.getCurrentPositionAsync({});

    let coordinates = {
      timestamp: pos.timestamp,
      longitude: pos.coords.longitude,
      latitude: pos.coords.latitude
    };

    Alert.alert(
      "We've got it!",
      "Save your location ?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Yes",
          onPress: () => {
            this.insertIntoStorage(JSON.stringify(coordinates));
            this.getAllData();
          }
        }
      ],
      { cancelable: false }
    );
  };

  insertIntoStorage = async coordinates => {
    let key = "key" + Math.round(Math.random() * 10000);
    AsyncStorage.getItem(key).then(item => {
      if (item) {
        this.insertIntoStorage();
      } else {
        AsyncStorage.setItem(key, coordinates);
        this.getAllData();
      }
    });
  };

  getAllData = async () => {
    let positionList = [];
    let keys = await AsyncStorage.getAllKeys();
    let stores = await AsyncStorage.multiGet(keys);
    let maps = stores.map((result, i, store) => {
      if (store[i][1]) {
        let obj = JSON.parse(store[i][1]);
        obj.key = `${i}`;
        positionList.push(obj);
      }
    });
    this.setState({ positionList: positionList });
  };

  DeleteAllLocations = async () => {
    AsyncStorage.clear();
    this.getAllData();
  };

  GoToMap() {
    this.props.navigation.navigate("MyMap", {
      positionList: this.state.positionList
    });
  }

  render() {
    return this.state.fontloaded ? (
      <View style={{ flexDirection: "column", flex: 1 }}>
        <View style={styles.buttons}>
          <MyButton
            text="GET YOUR LOCATION"
            PressFunction={this.GetAndSaveLocation}
          />
          <MyButton
            text="DELETE ALL LOCATIONS"
            PressFunction={this.DeleteAllLocations}
          />
          <MyButton text="GO TO MAP" PressFunction={this.GoToMap} />
        </View>
        <View style={styles.content}>
          <FlatList
            data={this.state.positionList}
            style={styles.list}
            renderItem={({ item, index }) => {
              return (
                <MyListItem
                  lon={item.longitude}
                  lat={item.latitude}
                  timestamp={item.timestamp}
                  key={index}
                />
              );
            }}
          />
        </View>
      </View>
    ) : null;
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    backgroundColor: "#fff"
  },
  content: {
    flex: 4,
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  list: {
    flex: 1,
    padding: 10
  }
});
