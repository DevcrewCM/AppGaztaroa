import React, { Component } from 'react';
import { FlatList, View, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { List, Divider } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  render() {
    // Extraemos la función de navegación de las props
    const { navigate } = this.props.navigation;

    const renderCalendarioItem = ({ item, index }) => {
      return (
        <View>
          <List.Item
            title={item.nombre}
            description={item.descripcion}
            titleNumberOfLines={0}
            descriptionNumberOfLines={6}
            // Aquí está la clave: Navegamos a la pantalla 'DetalleExcursion' pasando el parámetro excursionId
            onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
            left={(props) => (
              <Image
                source={require('./imagenes/40Anos.png')}
                style={[props.style, styles.imagen]}
                resizeMode="cover"
              />
            )}
            titleStyle={styles.titulo}
            descriptionStyle={styles.descripcion}
            contentStyle={styles.contenido}
          />
          <Divider />
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.excursiones}
          renderItem={renderCalendarioItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagen: {
    width: 40,
    height: 40,
    alignSelf: 'center',
  },
  contenido: {
    paddingRight: 8,
  },
  titulo: {
    fontSize: 16,
  },
  descripcion: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default Calendario;