import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {
  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <Card.Title title={excursion.nombre} />
        <Card.Cover
          source={require('./imagenes/40Anos.png')}
          style={styles.image}
        />
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
  image: {
    marginHorizontal: 0,
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default DetalleExcursion;