import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import Loading from "../Components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function Camara({ route, navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const refCamera = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [img, setImg] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showCammera, setShowCammera] = useState(true);
  const [access, setAccess] = useState(null);
  let [color, setColor] = useState(null);

  const takePhoto = async () => {
    try {
      const documents = ["0000"];
      const photo = await refCamera.current.takePictureAsync({ quality: 1, base64: true, fixOrientation: true, exif: true });
      photo.exif.Orientation = 1;

      setImg(photo);
      setShowCammera(false);
      setShowLoading(true);

      const data = {
        userId: 14, //await AsyncStorage.getItem("id"),
        benefitTypeName: route.params.complemento,
        studentNid: route.params.document,
        photoB64: photo.base64,
      };

      /*setTimeout(() => {
        setShowLoading(false);
        setModalVisible(true);
        const index = documents.indexOf(route.params.document);
        if (index >= 0) {
          setAccess("¡RECONOCIMIENTO EXITOSO!");
          setColor(styles.colorVerde);
        } else {
          setAccess("¡RECONOCIMIENTO FALLIDO!");
          setColor(styles.colorRojo);
        }
      }, 3000);*/
      // const respuesta = await axios.post("http://fundacionmia.com.co:8080/recognition", data);
      const respuesta = await axios.post("http://192.168.107:8080/recognition/save-student-image", {
        studentNid: 1083914553,
        photo64: photo.base64

      });

      console.log(respuesta)
      
    } catch(e)  {
      console.log(e)
    }

    
  };

  const resetFunctions = () => {
    setImg(null);
    setShowCammera(true);
    setShowLoading(false);
    setModalVisible(false);
    navigation.navigate("auth");
  };
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
      //await Imagenes();
    })();
  }, []);

  const Imagenes = async () => {
    const res = await fetch(`${env.CAMERA_HOST}`);
    setImg(res.json());
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View>
      {showCammera && (
        <Camera style={styles.camera} type={type} ref={refCamera}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.btnPositionCamera}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <Text style={styles.text}> Cambiar camara </Text>
            </TouchableOpacity>
          </View>
        </Camera>
      )}

      {!showCammera && img && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${img.base64}` }}
          style={styles.camera}
        />
      )}

      <TouchableOpacity
        onPress={() => takePhoto()}
        style={{
          backgroundColor: "#3296F3",
          padding: 10,
          marginTop: 40,
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
          Validar
        </Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={[styles.modalView, color]}>
            <Text style={styles.modalText}> {access} </Text>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => resetFunctions()}
            >
              <Text style={styles.textStyle}> VOLVER A REGISTRAR </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {showLoading && <Loading />}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    alignSelf: "center",
    marginTop: 60,
    height: 500,
    width: 350,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  btnPositionCamera: {
    flex: 2,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 15,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "green",
  },
  buttonClose: {
    backgroundColor: "#FFF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    color: "white",
  },
  colorRojo: {
    backgroundColor: "red",
  },
  colorVerde: {
    backgroundColor: "green",
  },
});
