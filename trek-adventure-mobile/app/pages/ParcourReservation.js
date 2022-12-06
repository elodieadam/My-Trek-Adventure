import React from "react";
import {
  Pressable,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { userContext } from "../context/userContext";

function ParcourReservation(props, { navigation }) {
  const { email } = React.useContext(userContext);
  const [select, setSelect] = React.useState(false);
  const [resaOk, setResaOk] = React.useState(false);
  const [resaFull, setResaFull] = React.useState(false);
  function onClick() {
    setSelect(true);
  }
  function clickOff() {
    setSelect(false);
  }
  console.log(props);
  async function postResa() {
    const token = await AsyncStorage.getItem("Token");

    // const url = "http://192.168.1.130:8080/reservations/user";
    const url = "http://192.168.1.19:8080/reservations/user";

    const userResa = {
      resaId: props.content._id,
      parcoursId: props.parcours,
    };
    const data = JSON.stringify(userResa);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: data,
    };
    const response = await fetch(url, options);
    const res = response.json();
    console.log("result", res);
    setResaOk(true);
  }
  function resaCheck() {
    const user = props.content.clients.map((item, key) => {
      if (item.identifiant == email) {
        return setResaOk(true);
      }
    });
  }
  function checkDispo() {
    const clientNomber = props.content.clients;
    const maxClient = props.content.maxClients;

    if (clientNomber.length >= maxClient) {
      setResaFull(true);
    }
  }
  React.useEffect(() => {
    resaCheck();
    checkDispo();
  }, []);
  return (
    <View
      style={[styles.container,
        { flexDirection: "column"}]}>
      {!resaFull ? (
        <View>
          {!resaOk ? (
            <View>
              {!select ? (
                <Text style={styles.date} onPress={() => onClick()}>
                  {props.content.dateReservation}
                </Text>
              ) : (
                <View style={styles.resa}>
                  <Text>{props.content.openResa}</Text>
                  <Text style={styles.date}>
                    {props.content.dateReservation}
                  </Text>
                  <Text style={styles.idGuide}>
                    {" "}
                    Guide : {props.content.idGuide}
                  </Text>
                  <Text style={styles.maxClients}>
                    {" "}
                    Nombre de clients maximum : {props.content.maxClients}
                  </Text>
                  <Text style={styles.maxClients}>
                    {" "}
                    Client Inscrit : {props.content.clients.length}
                  </Text>
                  <View style={styles.buttonReturnAndReserve}>
                    <Text
                      style={styles.buttonReturn}
                      onPress={() => clickOff()}
                    >
                      <Ionicons
                        name="arrow-back-circle-outline"
                        size={32}
                        color="#e58e26"
                      />
                    </Text>

                    <TouchableOpacity
                      onPress={() => postResa()}
                      style={{
                        backgroundColor: "#e58e26",
                        padding: 10,
                        borderRadius: 20,
                        paddingHorizontal: 30,
                      }}
                    >
                      <Text style={{ color: "#12413c", fontWeight: "bold" }}>
                        Réserver
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={styles.dateAndCheck}>
              <Text style={styles.date}>
                {props.content.dateReservation}
              </Text>
              <Ionicons name="checkmark-outline" size={25} color="#47bf47" />
              <Text style={{ color: "#47bf47" }}> Réservé </Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.dateAndCheck}>
          <Ionicons name="close-outline" size={25} color="#c25534" />
          <Text style={{ color: "#c25534" }}> Session complète </Text>
          <Text style={styles.date}>
            {props.content.dateReservation}
          </Text>
        </View>
      )}
    </View>
  );
}

export default ParcourReservation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // resa:{

  //     flex: 2, flexDirection: "row"
  // },
  buttonReturnAndReserve: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 70,
  },
  buttonReturn: {
    marginRight: 5,
  },
  date: {
    borderColor: "#e58e26",
    borderWidth: 1,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    padding: 3,
    margin: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: "#e58e26",
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 20,
    fontWeight: "bold",
    color: "#dbc2a4",
    alignContent: "center",
    textAlign:"center"
  },
  idGuide: {
    color: "#dbc2a4",
  },
  maxClients: {
    color: "#dbc2a4",
  },

  dateAndCheck: {
    flexDirection: "row",
    alignItems: "center"
  },
 
  resa:{
    textAlign:"center"
  }
});
