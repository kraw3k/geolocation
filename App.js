import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from "./screens/HomeScreen";
import MyPosition from "./screens/MyPositions";
import MyMap from "./screens/MyMap";

const MainNavigator = createStackNavigator({
  HomeScreen: { screen: HomeScreen },
  MyPositions: { screen: MyPosition },
  MyMap: { screen: MyMap }
});

const App = createAppContainer(MainNavigator);

export default App;
