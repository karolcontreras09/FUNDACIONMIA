import React from 'react'

import PaginaPrincipal from '../Screens/PaginaPrincipal'
import Login from '../Screens/Login'
import Autenticacion from '../Screens/Autenticacion'
import Camara from '../Screens/Camara'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';



const Stack = createStackNavigator();

export default function NavigationStack() {
  return (

    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='pagina_principal'
      >

        <Stack.Screen
          name="pagina_principal"
          component={PaginaPrincipal}
          options={{
            title: "MI ALIMENTACIÓN MIA",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="inicio_session"
          component={Login}
          options={{
            title: "INICIO DE SESIÓN",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="auth"
          component={Autenticacion}
          options={{
            title: "REGISTRO BENEFICIO",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="valido"
          component={Camara}
          options={{
            title: "CAMARA",
            headerShown: false
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

