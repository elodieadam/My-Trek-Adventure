import SettingsScreen from "../pages/SettingsScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import * as React from "react";
function SettingsStackScreen() {
  const SettingsStack = createNativeStackNavigator();
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Setting" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}
export default SettingsStackScreen;
