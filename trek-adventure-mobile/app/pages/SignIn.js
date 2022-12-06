import * as React from "react";
import { useEffect, useState } from "react";
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
function SignIn({ navigation }) {
  const { email, setEmail } = React.useContext(userContext);
  const [inputPassword, setInputPassword] = useState(null);
  const [inputEmail, setInputEmail] = useState(null);

  async function onClick() {
    if (email != null && inputPassword != null) {
      const url = "http://192.168.1.19:8080/users/signin";
      //  const url = "http://192.168.1.130:8080/users/signin";

      const userInfo = {
        password: inputPassword,
        identifiant: inputEmail,
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
        // const stringToken = JSON.stringify(result.token)
        const stringToken = result.token;
        await AsyncStorage.setItem("Token", stringToken);
        const token = await AsyncStorage.getItem("Token");

        console.log(token);
        setEmail(inputEmail);
      } else {
        console.log("Email ou MDP incorrect");
      }
    } else {
      Alert.alert("Erreur", "email ou mot de passe incorrects");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("app/assets/logo.png")}
      ></Image>

      <Text style={styles.title}>Bienvenue sur My Trek Adventure</Text>
      <Text style={styles.desc}>Connectez-vous et aventurez-vous !</Text>

      <StatusBar style="auto" />

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

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onClick()}
        style={{
          backgroundColor: "#e58e26",
          padding: 10,
          borderRadius: 20,
          paddingHorizontal: 50,
        }}
      >
        <Text style={{ color: "#12413c", fontWeight: "bold" }}>
          Se connecter
        </Text>
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
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },

  desc: {
    color: "#e58e26",
    marginBottom: 50,
    fontSize: 20,
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

  forgot_button: {
    height: 30,
    marginBottom: 30,
    fontStyle: "italic",
  },
});

export default SignIn;
