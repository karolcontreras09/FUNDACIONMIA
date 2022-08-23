import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";
import { Form, Item } from "native-base";
//import { Api } from "../Backend/Api";
import env from "../env.json";
import { useNavigation } from "@react-navigation/native";

export default function App() {
  const navigation = useNavigation();

  const [document, setDocument] = useState("");

  const [error, setError] = useState("");
  const handlePressTouch = () => {
    let lError = ""
    if (document && document !== "" && (almuerzo || complementoam || complementopm)) {
      setError("");
      navigation.navigate("valido", { document, complemento: almuerzo ? "ALMUERZO" : complementoam ? "COMPLEMENTO_AM" : complementopm ? "COMPLEMENTO_PM" : "" });
    }
    
    if (document == "") lError = lError + "El campo documento es obligatorio \n";
    if (!(almuerzo || complementoam || complementopm)) lError = lError + "Debes seleccionar una opción \n";
    setError(lError);
  };
  const [almuerzo, setAlmuerzo] = useState(false);
  const [complementoam, setComplementoam] = useState(false);
  const [complementopm, setComplementopm] = useState(false);

  const toggleSwitchAlmuerzo = () => {
    setAlmuerzo(!almuerzo);
    setComplementoam(false);
    setComplementopm(false);
  }

  const toggleSwitchComplementoam = () => {
    setComplementoam(!complementoam);
    setAlmuerzo(false);
    setComplementopm(false);
  }

  const toggleSwitchComplementopm = () => {
    setComplementopm(!complementopm);
    setAlmuerzo(false);
    setComplementoam(false);
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <View
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 2,
          marginTop: 20,
        }}
      >
        <Image
          style={{
            margin: 2,
            resizeMode: "center",
            alignSelf: "center",
            height: 290,
            width: 250,
          }}
          source={require("../assets/logomia.png")}
        />
      </View>
      
        <Form>
          <Text style={styles.inputtext}>Documento</Text>
          <Item style={styles.document}>
            <TextInput
              style={styles.doc}
              placeholder="Documento"
              value={document}
              onChangeText={(text) => setDocument(text)}
            />
          </Item>
        </Form>
      <View style={styles.Switch}>
        <Switch style={styles.Switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={almuerzo ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchAlmuerzo}
        value={almuerzo}
        />
      <Switch style={styles.Switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={complementoam ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchComplementoam}
        value={complementoam}
        />
        <Switch style={styles.Switch}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={complementopm ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchComplementopm}
        value={complementopm}
        />
      </View>
      <View style={styles.switchtext}>
          <Text style={styles.almu}>
            Almuerzo
          </Text> 
          <Text style={styles.am}>
            Complemento {'\n'} a.m
          </Text>
          <Text style={styles.pm}>
            Complemento {'\n'} p.m
          </Text>
      </View>
      <TouchableOpacity
        onPress={() => handlePressTouch() }
        style={{
          backgroundColor: "#3296F3",
          padding: 10,
          marginTop: 70,
          width: 250,
          alignSelf: "center",
          borderRadius: 15,
          borderColor: "#CDD1E2",
          borderWidth: 1.5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,
          elevation: 9,
        }}
      >
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: "white",
          }}
        >
          Tomar fotografía
        </Text>
      </TouchableOpacity>
      <Text style={styles.inputTextErr}>{error}</Text>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputtext: {
    height: 45,
    color: "black",
    fontSize: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    fontWeight: 'bold'
  },
  document: {
    height: 45,
    color: "black",
    fontSize: 45,
    marginTop: -20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
  },
  doc: {
    fontSize: 18,
    width: "100%",
    
  },
  scroll: {
    flexDirection: "column",
    marginTop: 20,
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
  inputTextErr:{
    height: 45,
    color: "red",
    fontSize: 20,
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  Switch: {
    marginTop: 20,
    marginRight: 50,
    margin: 20,
    flexDirection: "row",
  },
  switchtext:{
    justifyContent: "center",
    flexDirection: "row",
    marginRight: 2,
    marginLeft: 2,
  },
  almu:{
    marginRight: 35,
    
  },
  am:{
    marginRight: 35,
    textAlign: "center"
  },
  pm:{
    textAlign: "center"
  }
  
});
