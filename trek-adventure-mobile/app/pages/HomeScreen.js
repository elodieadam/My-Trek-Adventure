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
  Image,
  TouchableOpacity
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      
      <ImageBackground source={require("app/assets/bg.jpg")} resizeMode="cover" style={styles.image} >
      <Image
        style={styles.logo}
        source={require("app/assets/logo.png")}
      ></Image>

      <Text style={styles.title}>My Trek Adventure</Text>

         <TouchableOpacity
        onPress={() => navigation.navigate("Connection")}
        style={styles.buttons}
      >
        <Text style={styles.buttonText} >CONNEXION</Text>
      </TouchableOpacity>

     
      <TouchableOpacity
        onPress={() => navigation.navigate("Inscription")}
        style={styles.buttons}
      >
        <Text style={styles.buttonText}>INSCRIPTION</Text>
      </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({

    container:{
      flex: 1,
      justifyContent: "center",
    },

buttons: {
    backgroundColor: "#e58e26",
      padding: 10,
      borderRadius: 20,
      paddingHorizontal: 50,
      marginBottom: 30,
      marginLeft:70,
      marginRight:70,
},
   buttonText :{ 
    color: "#12413c", 
    fontWeight: "bold", 
    textAlign:"center",
    alignItems: "center",
  },

  image: {
    flex: 1,
    justifyContent: "center",
  },

  logo: {
    width: 180,
    height: 180,
    marginLeft: "28%",
    marginBottom: -40,
  },

  title: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 100,
    textAlign: "center",
  }

})
export default HomeScreen;
