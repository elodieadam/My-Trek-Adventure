import * as React from "react";
import {
  Button,
  Text,
  View,
  TextInput,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { userContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SignUp({ navigation }) {
  const { email, setEmail } = React.useContext(userContext);
  const [inputPassword, setInputPassword] = React.useState(null);
  const [inputEmail, setInputEmail] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);

  async function onClick() {
    if (
      email != null &&
      inputPassword != null &&
      name != null &&
      firstname != null
    ) {
      const url = "http://192.168.1.19:8080/users/signup";
      // const url = "http://192.168.1.130:8080/users/signup";

      const userInfo = {
        password: inputPassword,
        identifiant: inputEmail,
        nom: name,
        prenom: firstname,

        role: "client",
      };
      const data = JSON.stringify(userInfo);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      });
      let result = await response.json();
      const res = JSON.stringify(result);

      if (res !== '{"message":"Echec"}') {
        Alert.alert("Inscription réussie");
        navigation.navigate("Connection");
      } else {
        Alert.alert("Une erreur est survenue, veuillez réessayer");
      }
    } else {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("app/assets/logo.png")}
      ></Image>

      <Text style={styles.title}>Bienvenue sur My Trek Adventure</Text>
      <Text style={styles.desc}>Inscrivez-vous et aventurez-vous !</Text>

      <StatusBar style="auto" />

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Nom"
          placeholderTextColor="#e58e26"
          onChangeText={setName}
          value={name}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Prénom"
          placeholderTextColor="#e58e26"
          onChangeText={setFirstname}
          value={firstname}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Email"
          placeholderTextColor="#e58e26"
          onChangeText={setInputEmail}
          value={inputEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Mot de passe"
          placeholderTextColor="#e58e26"
          secureTextEntry={true}
          onChangeText={setInputPassword}
          value={inputPassword}
        />
      </View>

      <TouchableOpacity
        onPress={() => onClick()}
        style={{
          backgroundColor: "#e58e26",
          padding: 10,
          borderRadius: 20,
          paddingHorizontal: 50,
        }}
      >
        <Text style={{ color: "#12413c", fontWeight: "bold" }}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12413c",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    color: "#e58e26",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  desc: {
    color: "#e58e26",
    marginBottom: 50,
    fontSize: 15,
  },

  logo: {
    width: 180,
    height: 180,
  },

  inputView: {
    borderColor: "#e58e26",
    width: "70%",
    height: 45,
    marginBottom: 20,
    borderWidth: 2,
    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    fontStyle: "italic",
  },
});

export default SignUp;
