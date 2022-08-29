import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Camera } from "expo-camera";
import Loading from "../Components/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function Camara({ route }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [modalVisible, setModalVisible] = useState(false);
  const refCamera = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [img, setImg] = useState(null);
  const [showLoading, setShowLoading] = useState(false);
  const [showCammera, setShowCammera] = useState(true);
  const [access, setAccess] = useState(null);
  const [color, setColor] = useState(null);
  const [url, setUrl] = useState("");
  const [prefixMensaje, setPrefixMesaje] = useState("");

  const takePhoto = async () => {
    try {
      const photo = await refCamera.current.takePictureAsync({ base64: true, exif: true });
      photo.exif.Orientation = 1;

      setImg(photo);
      setShowCammera(false);
      setShowLoading(true);

      const data = {
        userId: await AsyncStorage.getItem("id"),
        benefitTypeName: String(route.params.complemento),
        studentNid: String(route.params.document),
        photoB64: photo.base64
      };
      
      await axios.post(url, data);
      setColor(styles.colorVerde);
      setModalVisible(true);
      setAccess(`${prefixMensaje} exitoso`);
    } catch(e)  {
      setColor(styles.colorRojo);
      setModalVisible(true);
      setAccess(`${prefixMensaje} fallo`);
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
      const rol = await AsyncStorage.getItem("rol");
      setUrl(
        rol === "ROLE_PROFESOR" ?
          "http://fundacionmia.com.co:8080/recognition" :
          "http://fundacionmia.com.co:8080/recognition/save-student-image"
      );
      setPrefixMesaje(rol === "ROLE_PROFESOR" ? "Reconocimiento": "Registro");
      setHasPermission(status === "granted");
    })();
  }, [isFocused]);

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
              <Text style={styles.textStyle}> VOLVER </Text>
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
