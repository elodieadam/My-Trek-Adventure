import * as React from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function SettingsScreen({ navigation }) {
  const [inputEmail, setInputEmail] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [firstname, setFirstname] = React.useState(null);
  const [inputText, setInputText] = React.useState(null);

  async function onClick() {
    if (
      email != null &&
      inputText != null &&
      name != null &&
      firstname != null
    ) {
      //const url = "http://192.168.1.19:8080/users/signup";
      const url = "http://192.168.1.130:8080/users/signup";

      //   const userInfo = {
      //     password: inputPassword,
      //     identifiant: inputEmail,
      //     nom: name,
      //     prenom: firstname,

      //     role: "client",
      //   };
      //   const data = JSON.stringify(userInfo);
      //   const response = await fetch(url, {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: data,
      //   });
      //   let result = await response.json();
      //   const res = JSON.stringify(result);

      //   if (res !== '{"message":"Echec"}') {
      //     Alert.alert("Inscription réussie");
      //     navigation.navigate("Connection");
      //   } else {
      //     Alert.alert("Une erreur est survenue, veuillez réessayer");
      //   }
      // } else {
      //   Alert.alert("Erreur", "Veuillez remplire tous les champs");
    }
  }



  //  à compléter pour que cela soit actif pour le bouton envoyer
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require("app/assets/logo.png")}
      ></Image>

      <Text style={styles.title}>Formulaire de contact</Text>
      <Text style={styles.desc}>Besoin d'aide ? Envoyez-nous votre demande ! </Text>

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
          style={styles.input}
          placeholder="Veuillez entrer votre demande ..."
          placeholderTextColor="#e58e26"
          onChangeText={setInputText}
          value={inputText}
          multiline={true}
          numberOfLines={3}
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
        <Text style={{ color: "#12413c", fontWeight: "bold" }}>Envoyer</Text>
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
    marginBottom: 30,
    fontSize: 15,
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
  logo: {
    width: 180,
    height: 180,
    marginTop: -100
  },
  input:{
    margin: 10,
    
  }
});

export default SettingsScreen;

