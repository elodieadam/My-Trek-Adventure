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
import Card from "../components/Cards";
import ReservationDetail from "./ReservationDetail";
import ParcourReservation from "./ParcourReservation";
import { userContext } from "../context/userContext";
function Reservation() {
  const [parcours, setParcours] = React.useState([]);
  const [parcourListe, setParcourListe] = React.useState([]);
  const { email } = React.useContext(userContext);
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
  let parcourUser = {
    parcours: [],
  };
  console.log("resa", parcours.reservation);
  function filterParcour() {
    parcours.map((resPar, key) => {
      resPar.reservations.map((item, key) => {
        item.clients.map((client, key) => {
          console.log("client", client.identifiant);
          if (client.identifiant == email) {
            parcourUser.parcours.push({ parcour: resPar });
            setParcourListe(parcourUser);
            console.log("respar", resPar);
            return;
          }
        });
        return;
      });
    });
  }
  React.useEffect(() => {
    filterParcour();
  }, []);
  console.log("filtered", parcourListe.parcours);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={[styles.subText, styles.recent]}>Mes réservations</Text>
        {parcourListe.parcours ? (
          <View>
            {parcourListe.parcours.map((item, index) => (
              <ReservationDetail content={item} key={index} />
            ))}
          </View>
        ) : (
          <View></View>
        )}
        <Text style={[styles.subText, styles.recent]}>
          Parcours récemment réalisés
        </Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.recentParcours}>
            <View style={styles.point}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#12413c", fontWeight: "200" }]}
              >
                Nom du parcours avec lien cliquable ?{" "}
                <Text style={{ fontWeight: "300" }}>En route pour Etretat</Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentParcours}>
            <View style={styles.point}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#12413c", fontWeight: "200" }]}
              >
                Nom du parcours avec lien cliquable ?{" "}
                <Text style={{ fontWeight: "300" }}>
                  Sur la route de Frodon
                </Text>
              </Text>
            </View>
          </View>

          <View style={styles.recentParcours}>
            <View style={styles.point}></View>
            <View style={{ width: 250 }}>
              <Text
                style={[styles.text, { color: "#12413c", fontWeight: "200" }]}
              >
                Nom du parcours avec lien cliquable ?{" "}
                <Text style={{ fontWeight: "300" }}>hit the road jack</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
export default Reservation;

const styles = StyleSheet.create({
  //arrière blanc, ou noir en fonction du mode sombre ou clair de l'utilisateur du user
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  //police de l'écriture avec la couleur correspondante
  text: {
    //fontFamily: "",
    color: "#12413c",
  },
  //titre mes réservations et parcous récemment réalisés
  subText: {
    fontSize: 12,
    color: "#43a188",
    textTransform: "uppercase",
    fontWeight: "400",
  },

  //centrer les titres
  recent: {
    marginLeft: 78,
    marginTop: 32,
    marginBottom: 6,
    fontSize: 15,
  },

  //centrer la liste des parcours réalisés
  recentParcours: {
    flexDirection: "row",
    //alignItems: "flex-start",
    marginBottom: 5,
    marginTop: 10,
  },
  //les points devant chaque liste
  point: {
    backgroundColor: "#296e5b",
    padding: 4,
    height: 6,
    width: 6,
    borderRadius: 6,
    marginTop: 10,
    marginRight: 20,
  },
});
