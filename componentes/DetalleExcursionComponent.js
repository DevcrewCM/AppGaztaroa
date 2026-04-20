import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { ImageBackground } from 'react-native';

function RenderExcursion(props) {
  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={require('./imagenes/40Anos.png')}
          style={styles.imageBackground}
        >
          <Text style={styles.cardTitle}>{excursion.nombre}</Text>
        </ImageBackground>
        <Card.Content>
          <Text style={styles.descripcion}>{excursion.descripcion}</Text>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
    };
  }

  render() {
    // Recuperamos el parámetro enviado a través de la ruta
    const { excursionId } = this.props.route.params;
    
    return (
      <RenderExcursion
        // Filtramos para encontrar la excursión correspondiente al ID
        excursion={this.state.excursiones.filter((excursion) => excursion.id === excursionId)[0]}
      />
    );
  }
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
  },
  imageBackground: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  cardTitle: {
    color: 'chocolate',
    fontSize: 24,
    fontWeight: 'bold',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DetalleExcursion;