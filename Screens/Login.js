import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import env from "../env.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { Form, Item } from "native-base";

function Login() {
  const navigation = useNavigation();
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(`${env.HOST}/auth/iniciarSesion`, {
        usernameOrEmail,
        password,
      });

      if (resp.status === 200) {
        navigation.navigate("auth");
        AsyncStorage.setItem("token", resp.data.tokeDeAcceso);
        AsyncStorage.setItem("id", String(resp.data.unUsuario.id));
      } else setErr("Usuario no permitido");
    } catch (e) {
      console.log(e);
      setErr("Usuario no permitido");
    }
  };

  return (
    <ScrollView style={styles.scroll1}>
      <View style={styles.form}>
        <Text style={styles.logintext1}>Bienvenido</Text>
        <Text style={styles.logintext2}>Fundación Mía</Text>
        <Text style={styles.logintext3}>Construyendo Futuro</Text>
        <Form>
          <Text style={styles.inputtext}>Usuario</Text>
          <Item style={styles.contraseña}>
            <TextInput
              style={styles.usu}
              placeholder="Usuario"
              value={usernameOrEmail}
              onChangeText={(text) => setUsernameOrEmail(text)}
            />
          </Item>
          <Text style={styles.inputtext}>Contraseña</Text>
          <Item style={styles.contraseña}>
            <TextInput
              style={styles.contra}
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
          </Item>
          <Text style={styles.inputtexterr}>{err}</Text>
          <TouchableOpacity style={styles.boton} onPress={() => handleSubmit()}>
            <Text style={styles.botontext}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </Form>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll1: {
    backgroundColor: "#FE0000",
    height: null,
    width: "100%",
  },

  form: {
    backgroundColor: "#ffffff",
    margin: 30,
    marginTop: 50,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },

  logintext1: {
    color: "black",
    fontSize: 25,
    marginTop: 40,
    textAlign: "center",
    fontWeight: "bold",
  },

  logintext2: {
    color: "black",
    fontSize: 20,
    marginTop: 25,
    textAlign: "center",
  },

  logintext3: {
    color: "black",
    marginTop: 25,
    fontSize: 20,
    textAlign: "center",
  },

  inputtext: {
    height: 45,
    color: "black",
    fontSize: 20,
    marginTop: 35,
    marginLeft: 20,
    padding: 5,
    width: "100%",
  },

  inputtexterr: {
    height: 45,
    color: "red",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    textAlign: "center",
  },
  usu: {
    fontSize: 18,
    width: "100%",
    height: 40,
    marginLeft: 20,
    marginRight: "50%",
    color: "black",
  },
  contraseña: {
    borderColor: "gray",
    marginRight: "5%",
  },
  contra: {
    fontSize: 18,
    width: "100%",
    height: 40,
    marginLeft: 20,
    color: "black",
  },

  boton: {
    backgroundColor: "#3296F3",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 35,
    marginBottom: 20,
    width: 240,
    height: 55,
    shadowColor: "#000",
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },

  botontext: {
    color: "#FFFFFF",
    fontSize: 20,
    textAlign: "center",
  },
  scroll: {
    marginTop: "2%",
    flexDirection: "column",
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default Login;
