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
  } from "react-native";
  import { Camera } from "expo-camera";
  import { useNavigation } from '@react-navigation/native'

  export default function Camara () {
    const navigation = useNavigation();

    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [img, setImg] = useState([]);

    useEffect(() => {
        (async () => {
          const { status } = await Camera.requestCameraPermissionsAsync();
          setHasPermission(status === "granted");
          await Imagenes();
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
    return(
        <View>
<Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
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

      <FlatList
        data={img}
        key={"2"}
        numColumns={2}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{
              width: 180,
              height: 220,
              borderWidth: 2,
              borderColor: "#c35547",
              resizeMode: "contain",
              margin: 6,
            }}
            keyExtractor={(item) => item.id}
          />
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate("")}
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
        }}>
        <Text
          style={{
            fontSize: 25,
            textAlign: "center",
            color: "white",
          }}>
          Validar
        </Text>
      </TouchableOpacity>
      </View>
       ) }

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
        button: {
          flex: 2,
          alignSelf: "flex-end",
          alignItems: "center",
        },
        text: {
          fontSize: 15,
          color: "white",
        }
      })