import React, { useState, useEffect, Component } from "react";
import axios from "axios";
import {
  StyleSheet,
  Alert,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Form,
  Thumbnail,
  Label,
  Button,
  Text,
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import env from "../env.json";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [err, setErr] = useState("");

  const handleSubmit = async () => {
    try {
      const resp = await axios.post(`${env.HOST}/auth/iniciarSesion`, {
        usernameOrEmail,
        password,
      });
      console.log(resp.status);
      if (resp.status === 200) navigation.navigate("auth");
      else setErr("Usuario no permitido");
    } catch (e) {
      console.log(e);
      setErr("Usuario no permitido");
    }
  };

  return (
    <Container style={styles.body}>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scroll}>
          <View style={styles.form}>
            <Text style={styles.logintext1}>Bienvenido</Text>
            <Text style={styles.logintext2}>Fundación Mía</Text>
            <Text style={styles.logintext3}>Construyendo Futuro</Text>
            <Form>
              <Text style={styles.inputtext}>Usuario</Text>
              <Item style={styles.email}>
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
              <Button style={styles.boton} onPress={() => handleSubmit()}>
                <Text style={styles.botontext}>Iniciar Sesion</Text>
              </Button>
            </Form>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#FF3939",
    height: null,
    width: "100%",
  },

  form: {
    backgroundColor: "white",
    margin: 30,
    marginTop: 70,
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
    fontWeight: 'bold'
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
    marginRight: 20,
  },

  inputtexterr: {
    height: 45,
    color: "red",
    fontSize: 20,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },

  email: {
    height: 45,
    color: "black",
    marginTop: -20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
  },
  usu: {
    fontSize: 18,
  },
  contraseña: {
    height: 50,
    color: "black",
    marginTop: -20,
    marginLeft: 20,
    marginRight: 20,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "gray",
  },
  contra: {
    fontSize: 18,
  },

  boton: {
    backgroundColor: "#3296F3",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 55,
    marginBottom: 20,
    width: 240,
    height: 55,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
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
    marginTop: 15,
    flexDirection: 'column'
  },
  container: {
    flex: 1,
    alignContent: "center",
  },
});

export default Login;
