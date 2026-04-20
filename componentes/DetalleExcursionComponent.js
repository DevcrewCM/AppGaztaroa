import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ImageBackground } from 'react-native';
import { Card, Text, Divider, IconButton } from 'react-native-paper';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

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
          <View style={styles.iconoContainer}>
            <IconButton
              icon={props.favorita ? 'heart' : 'heart-outline'}
              size={28}
              onPress={() =>
                props.favorita
                  ? console.log('La excursión ya se encuentra entre las favoritas')
                  : props.onPress()
              }
            />
          </View>
        </Card.Content>
      </Card>
    );
  } else {
    return <View />;
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;

  const renderCommentItem = ({ item, index }) => {
    // Formateamos la fecha a cadena para que no se muestre en bruto como pide el ejercicio
    const fecha = new Date(item.dia).toLocaleDateString() + ', ' + new Date(item.dia).toLocaleTimeString();
    
    return (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{item.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{item.valoracion} estrellas</Text>
        <Text style={{ fontSize: 12 }}>{'-- ' + item.autor + ', ' + fecha}</Text>
      </View>
    );
  };

  return (
    <Card style={styles.card}>
      <Card.Title title="Comentarios" />
      <Card.Content>
        {/* Incluimos scrollEnabled false ya que está anidado dentro de un ScrollView */}
        <FlatList
          scrollEnabled={false}
          data={comentarios}
          renderItem={renderCommentItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </Card.Content>
    </Card>
  );
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.state.excursiones.filter((excursion) => excursion.id === excursionId)[0]}
          favorita={this.state.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
        />
        <RenderComentario 
          comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)} 
        />
      </ScrollView>
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
  iconoContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
});

export default DetalleExcursion;