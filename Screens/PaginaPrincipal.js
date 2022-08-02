import React from 'react'
import { TouchableOpacity, Text, View, Image, Pressable } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler';

const PaginaPrincipal = () => {

  const navigation = useNavigation();

  return (
    <ScrollView>
    <View style={{
      height: null,
      width: "100%",
      backgroundColor: "white"
    }}>
      <View
        style={{
          display: "flex",
          justifyContent: "center",
          margin: 8,
          marginTop: 100
        }}>
        <Image
          style={{
            margin: 8,
            resizeMode: "center",
            alignSelf: "center",
            height: 290,
            width: 340,
          }}
          source={require("../assets/logomia.png")}
        />
      </View>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 70,
          color: '#1B1E37',
          fontSize: 25
        }}>
        "Fundación MIA"</Text>
      <Text
        style={{
          alignSelf: 'center',
          marginTop: 20,
          color: '#1B1E37',
          fontSize: 25
        }}>
        "Construyendo Futuro"</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("inicio_session")}
        style={{
          backgroundColor: "#3296F3",
          padding: 10,
          marginTop: 100,
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
          Ingresar
        </Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

export default PaginaPrincipal