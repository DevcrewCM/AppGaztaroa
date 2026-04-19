import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calendario from './CalendarioComponent';
import DetalleExcursion from './DetalleExcursionComponent';

// Creamos la instancia del Stack Navigator
const Stack = createNativeStackNavigator();

// Definimos un componente funcional para la navegación
function CalendarioNavegador() {
  return (
    <Stack.Navigator
      initialRouteName="Calendario"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#015afc' },
        headerTitleStyle: { color: '#fff' },
      }}
    >
      <Stack.Screen
        name="Calendario"
        component={Calendario}
        options={{ title: 'Calendario Gaztaroa' }}
      />
      <Stack.Screen
        name="DetalleExcursion"
        component={DetalleExcursion}
        options={{ title: 'Detalle Excursión' }}
      />
    </Stack.Navigator>
  );
}

class Campobase extends Component {
  render() {
    return (
      <NavigationContainer>
        <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : 25 }}>
          <CalendarioNavegador />
        </View>
      </NavigationContainer>
    );
  }
}

export default Campobase;