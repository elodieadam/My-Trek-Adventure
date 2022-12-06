import * as React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";

// import ParcourReservation from "./ParcourReservation";
// import ParcourDetail from "./ParcourDetail";

import MapView from "react-native-maps";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Marker } from "react-native-maps";

export default function Card(props) {
  const [select, setSelect] = React.useState(false);
  const [loc, setLoc] = React.useState(false);
  const [long, setLong] = React.useState();
  function openMap() {
    setSelect(true);
  }
  function closeMap() {
    setSelect(false);
  }
  let [coordState, setCoordState] = React.useState([]);
  let state = {
    markers: [],
  };

  function etape() {
    props.content.map((item, key) => {
      if (item.localisation.lat !== "" && item.localisation.long !== "") {
        state.markers.push({
          latitude: item.localisation[0].lat,
          longitude: item.localisation[0].long,
          nomEtape: item.nomEtape,
          description: item.descriptionEtape,
        });

        setCoordState(state);
        setLoc(true);
      }
    });
  }

  React.useEffect(() => {
    etape();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{props.children}</View>

      {!select ? (
        <View style={styles.mapPosition}>
          <Text style={styles.mapTitle}>Carte du parcours</Text>
          <Text style={styles.mapTitle} onPress={() => openMap()}>
            <Ionicons
              name="arrow-down-circle-outline"
              size={25}
              color="#dbc2a4"
            />
          </Text>
        </View>
      ) : (
        <View>
          <Text style={styles.mapTitle}>Carte du parcours</Text>
          <Text style={styles.mapTitle} onPress={() => closeMap()}>
            <Ionicons
              name="arrow-up-circle-outline"
              size={25}
              color="#dbc2a4"
            />
          </Text>
          {loc == true ? (
            <MapView style={styles.map}>
              {coordState.markers.map((marker, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  title={marker.nomEtape}
                  description={marker.description}
                />
              ))}
            </MapView>
          ) : (
            <MapView style={styles.map}></MapView>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e58e26",
    elevation: 15,
    backgroundColor: "#1f665e",
    shadowOffset: { width: 10, height: 3 },
    shadowColor: "#e58e26",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  cardContent: {
    marginHorizontal: 18,
    marginVertical: 10,
  },

  map: {
    height: Dimensions.get("window").height,
  },

  mapTitle: {
    fontWeight: "bold",
    color: "#dbc2a4",
    marginBottom: 5,
    marginLeft: 10,
  },

  mapPosition: {
    flexDirection: "row",

    alignItems: "center",
  },
});
