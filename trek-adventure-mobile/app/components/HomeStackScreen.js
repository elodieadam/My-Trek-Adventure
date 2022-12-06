import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../pages/HomeScreen";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
function HomeStackScreen() {
  const HomeStack = createNativeStackNavigator();

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Connection" component={SignIn} />
      <HomeStack.Screen name="Inscription" component={SignUp} />
    </HomeStack.Navigator>
  );
}

export default HomeStackScreen;
