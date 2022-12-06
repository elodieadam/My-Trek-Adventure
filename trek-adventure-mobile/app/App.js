import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { userContext } from "./context/userContext";
import Ionicons from "@expo/vector-icons/Ionicons";

import HomeStackScreen from "./components/HomeStackScreen";
import SettingsStackScreen from "./components/SettingsStackScreen";

import Reservation from "./pages/Reservation";
import Profil from "./pages/Profil";
import Parcours from "./pages/Parcours";

export default function App(props) {
  const [email, setEmail] = React.useState("");
  const [pseudo, setPseudo] = React.useState("");
  const [profilPicture, setProfilPicture] = React.useState("");

  const Tab = createBottomTabNavigator();

  React.useEffect(() => {
    async function getUser() {
      const token = await AsyncStorage.getItem("Token");
      console.log(token);
      //const url = "http://192.168.1.130:8080/users/user";
      const url = "http://192.168.1.19:8080/users/user";
      const options = {
        method: "GET",
        headers: {
          Authorization: "bearer " + token,
        },
      };
      const response = await fetch(url, options);

      let result = await response.json();

      console.log(result);

      if (result.profil.identifiant) {
        console.log(result);
        setPseudo(result.profil.nom);
        setEmail(result.profil.identifiant);
        setProfilPicture(result.profil.photo_profil);
      } else {
        console.log(result);
      }
    }

    getUser();
  }, []);

  if (!email) {
    return (
      <userContext.Provider
        value={{
          email,
          setEmail,
          pseudo,
          setPseudo,
          profilPicture,
          setProfilPicture,
        }}
      >
        {props.children}
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name == "Accueil") {
                  iconName = "home-outline";
                } else if (route.name == "Contact") {
                  iconName = "settings-outline";
                }

                return <Ionicons name={iconName} size={25} color="#e58e26" />;
              },

              tabBarActiveTintColor: "#12413c",
              tabBarInactiveTintColor: "#e58e26",
            })}
          >
            <Tab.Screen name="Accueil" component={HomeStackScreen} />
            <Tab.Screen name="Contact" component={SettingsStackScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </userContext.Provider>
    );
  } else {
    return (
      <userContext.Provider
        value={{
          email,
          setEmail,
          pseudo,
          setPseudo,
          profilPicture,
          setProfilPicture,
        }}
      >
        {props.children}
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name == "Parcours") {
                  iconName = "images-outline";
                } else if (route.name == "Réservations") {
                  iconName = "today-outline";
                }

                if (route.name == "Profil") {
                  iconName = "person-circle-outline";
                }

                return <Ionicons name={iconName} size={25} color="#e58e26" />;
              },

              tabBarActiveTintColor: "#12413c",
              tabBarInactiveTintColor: "#e58e26",
            })}
          >
            <Tab.Screen name="Parcours" component={Parcours} />
            <Tab.Screen name="Réservations" component={Reservation} />
            <Tab.Screen name="Profil" component={Profil} />
          </Tab.Navigator>
        </NavigationContainer>
      </userContext.Provider>
    );
  }
}
