import * as React from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import ParcourDetail from "./ParcourDetail";

function Parcours() {
  const [parcours, setParcours] = React.useState([]);
  async function getParcours() {
    const url = "http://192.168.1.19:8080/parcours/";
    //const url = "http://192.168.1.130:8080/parcours/";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let result = await response.json();
    const res = JSON.stringify(result);
    if (res !== '{"message":"Echec"}') {
      setParcours(result);
      // navigate("/");
    } else {
      console.log("Impossible d'envoyer un post");
    }
  }

  React.useEffect(() => {
    getParcours();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
      }}
    >
      <ScrollView>
        {parcours.map((item, key) => (
          <ParcourDetail content={item} key={key} />
        ))}
      </ScrollView>
    </View>
  );
}
export default Parcours;
