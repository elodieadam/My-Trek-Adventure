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
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import { userContext } from "../context/userContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImageManipulator from "expo-image-manipulator";

function Profil() {
  const { email, setEmail, profilPicture, setProfilPicture } =
    React.useContext(userContext);
  const [image, setImage] = React.useState();
  const [firstName, setFirstName] = React.useState();
  const [description, setDescription] = React.useState();
  const [pseudo, setPseudo] = React.useState();
  const [inputPassword, setInputPassword] = React.useState();

  async function deco() {
    AsyncStorage.removeItem("Token");
    setEmail("");
  }
  const pickImage = async () => {
    const token = await AsyncStorage.getItem("Token");

    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const manipResult = await ImageManipulator.manipulateAsync(
      result.localUri || result.uri,
      [{ resize: { height: 500, width: 500 } }],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );
    setImage(manipResult);
    console.log(manipResult);

    //setImage(result.uri);

    const response = await FileSystem.uploadAsync(
      "http://192.168.1.19:8080/users/pictureUser/",
      //"http://192.168.1.130:8080/users/pictureUser/",
      manipResult.uri,
      {
        httpMethod: "POST",
        uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        fieldName: "file",
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    const res = response.body;
    console.log(response.body);
    const imgId = JSON.parse(res);
    const profilPictureId = imgId.message;
    setProfilPicture(profilPictureId);
  };
  React.useEffect(() => {
    async function getProfilUser() {
      const token = await AsyncStorage.getItem("Token");
      console.log(token);
      //const url = "http://192.168.1.130:8080/users/profilUser";
      const url = "http://192.168.1.19:8080/users/profilUser";
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
        setFirstName(result.profil.prenom);
        setDescription(result.profil.description);
      } else {
        console.log(result);
      }
    }

    getProfilUser();
  }, []);

  async function postProfilUser() {
    const token = await AsyncStorage.getItem("Token");
    console.log(token);

    //const url = "http://192.168.1.130:8080/users/modifyProfilUser";
    const url = "http://192.168.1.19:8080/users/modifyProfilUser";

    const userInfo = {
      identifiant: email,
      nom: pseudo,
      prenom: firstName,
      description: description,
      password: inputPassword,
    };
    const data = JSON.stringify(userInfo);
    console.log(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "bearer " + token,
      },
      body: data,
    };
    const response = await fetch(url, options);

    let result = await response.json();

    console.log(result);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity
            title="Choose file"
            onPress={pickImage}
            style={styles.editImg}
          >
            <Ionicons
              name="camera-outline"
              style={styles.iconCameraOutline}
            ></Ionicons>
          </TouchableOpacity>
          {profilPicture && (
            //  <Image source={{ uri: image }} style={styles.profileImage} />
            <Image
              source={{
                uri: `http://192.168.1.19:8080/users/${profilPicture}`,
                //uri: `http://192.168.1.130:8080/users/${profilPicture}`,
              }}
              style={styles.profileImage}
            />
          )}
        </View>

        <Text style={[styles.text, styles.textName]}>
          {pseudo}
          {firstName}
        </Text>

        <View style={styles.statsContainer}>
          <View
            style={[
              styles.statsBox,
              {
                borderColor: "#DFD8C8",
                borderLeftWidth: 1,
                borderRightWidth: 1,
              },
            ]}
          >
            <Text style={[styles.text, { fontSize: 24 }]}>10</Text>
            <Text style={[styles.text, styles.subText]}>Parcours réalisés</Text>
          </View>
          <View style={styles.statsBox}>
            <Text style={[styles.text, { fontSize: 24 }]}>3</Text>
            <Text style={[styles.text, styles.subText]}>Parcours en cours</Text>
          </View>
        </View>

        <View style={{ padding: 30 }}>
          {/* Input nom */}
          <View style={styles.viewInput}>
            <Text style={styles.textInput}>
              <FontAwesome name="user-o" color="#333333" size={16} /> Nom
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nom"
              defaultValue={pseudo}
              onChangeText={setPseudo}
            ></TextInput>
          </View>

          {/* Input Prénom */}
          <View style={styles.viewInput}>
            <Text style={styles.textInput}>
              <FontAwesome name="user" color="#333333" size={20} /> Prénom
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Prénom"
              defaultValue={firstName}
              onChangeText={setFirstName}
            ></TextInput>
          </View>

          {/* Input mail */}
          <View style={styles.viewInput}>
            <Text style={styles.textInput}>
              <FontAwesome name="envelope" color="#333333" size={16} /> Mail
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Mail"
              defaultValue={email}
              onChangeText={setEmail}
            ></TextInput>
          </View>

          {/* Input Mot de passe */}
          <View style={styles.viewInput}>
            <Text style={styles.textInput}>
              <FontAwesome name="lock" color="#333333" size={20} /> Mot de passe
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              defaultValue={inputPassword}
              onChangeText={setInputPassword}
              secureTextEntry={true}
            ></TextInput>
          </View>

          {/* Input Descritpion */}
          <View style={styles.viewInput}>
            <Text style={styles.textInput}>
              <FontAwesome name="user" color="#333333" size={20} /> Description
            </Text>
            <TextInput
              placeholder="Description"
              defaultValue={description}
              onChangeText={setDescription}
              style={styles.input}
            ></TextInput>
          </View>

          {/* Button SAVE */}
          <TouchableOpacity
            onPress={() => postProfilUser()}
            style={styles.buttonSave}
          >
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>

        {/* // Button DECO */}
        <TouchableOpacity onPress={() => deco()} style={styles.buttonDeco}>
          <Text style={styles.buttonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Profil;

const styles = StyleSheet.create({
  //arrière blanc, ou noir en fonction du mode sombre ou clair de l'utilisateur du user
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },

  //police de l'écriture avec la couleur correspondante
  text: {
    color: "#12413c",
  },

  //titre mes réservations et parcous récemment réalisés
  subText: {
    fontSize: 12,
    color: "#43a188",
    textTransform: "uppercase",
    fontWeight: "400",
  },

  // dimension photo de profil
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 30,
  },

  //icone pour modifier la photo de profil
  editImg: {
    backgroundColor: "#1f665e",
    position: "absolute",
    bottom: -25,
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#0d3027",
  },

  iconCameraOutline: {
    marginTop: 3,
    marginLeft: 5,
    color: "#DFD8C8",
    fontSize: 26,
  },

  textName: {
    fontWeight: "200",
    fontSize: 30,
    textAlign: "center",
    marginTop: 60,
  },

  //afficher  le parcous realisé et en cours, aligné sur la meme ligne
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 30,
  },

  //centrer  le parcours realisé et en cours
  statsBox: {
    alignItems: "center",
    flex: 1,
  },

  buttonDeco: {
    backgroundColor: "#e58e26",
    padding: 10,
    borderRadius: 20,
    paddingHorizontal: 40,
    marginLeft: 180,
    marginRight: 20,
    marginBottom: 20,
    alignItems: "center",
  },

  buttonSave: {
    backgroundColor: "#e58e26",
    padding: 10,
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 180,
    marginRight: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#12413c",
    fontWeight: "bold",
  },

  input: {
    fontSize: 16,
    borderBottomWidth: 1,
    marginTop: 10,
    borderColor: "#CDCDCD",
  },

  viewInput: {
    paddingVertical: 10,
  },

  textInput: {
    opacity: 0.7,
    marginTop: 5,
    fontSize: 12,
  },
});
