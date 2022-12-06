import React from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  ImageBackground,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { withSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Cards";
import ParcourReservation from "./ParcourReservation";
import Ionicons from "@expo/vector-icons/Ionicons";

function ReservationDetail(props) {
  console.log("props", props);
  const imageName = props.content.imgIllustration;
  const reservation = props.content.reservations;
  const etapes = props.content.etape;

  return (
    <Card
      content={etapes}
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleParcours}>{props.content.nomParcours}</Text>
        {imageName ? (
          <Image
            style={styles.image}
            source={{
              // uri: `http://192.168.1.130:8080/parcours/${imageName}`,
              uri: `http://192.168.1.19:8080/parcours/${imageName}`,
            }}
          ></Image>
        ) : (
          <View></View>
        )}

        <Text style={styles.desc1}>Description du parcours</Text>
        <Text style={styles.desc}>{props.content.description}</Text>
        <View style={styles.timeLevel}>
          <Text style={styles.time1}>Durée : </Text>
          <Text style={styles.time}> {props.content.dureeParcours} </Text>
          <Text style={styles.level1}> / Niveau de difficulté :</Text>
          <Text style={styles.level}>
            {" "}
            {props.content.niveauDifficulte}
            <Ionicons name="star-sharp" size={15} color="#dba41a" />
          </Text>
        </View>

        <View style={styles.priceAlign}>
          <Text style={styles.price1}> Prix :</Text>
          <Text style={styles.price}> {props.content.prix}</Text>
        </View>
        <Text style={styles.step}>Etapes du parcours</Text>
        <Text style={styles.date}>Sessions disponibles</Text>

        <ScrollView>
          {reservation.map((item, key) => (
            <ParcourReservation
              content={item}
              key={key}
              parcours={props.content._id}
            />
          ))}
        </ScrollView>
      </View>
    </Card>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  image: {
    flex: 1,
    justifyContent: "center",
    width: 300,
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  time1: {
    color: "#e58e26",
    fontWeight: "bold",
  },
  time: {
    color: "#dbc2a4",
  },
  desc: {
    color: "#dbc2a4",
  },
  desc1: {
    color: "#e58e26",
    fontWeight: "bold",
  },

  price1: {
    color: "#e58e26",
    fontWeight: "bold",
  },
  price: {
    color: "#dbc2a4",
  },

  priceAlign: {
    flexDirection: "row",
  },

  level1: {
    color: "#e58e26",
    fontWeight: "bold",
  },
  level: {
    color: "#dbc2a4",
    marginLeft: 2,
  },
  step: {
    color: "#e58e26",
    fontWeight: "bold",
  },
  titleParcours: {
    fontSize: 20,
    color: "#e58e26",
    fontWeight: "bold",
    marginBottom: 10,
  },
  date: {
    color: "#e58e26",
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: "bold",
  },

  timeLevel: {
    flexDirection: "row",
    fontWeight: "bold",
  },
});
export default ReservationDetail;
