import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, ImageBackground, Modal, Button } from 'react-native';
import { Card, Text, Divider, IconButton, TextInput } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      comentarios: state.comentarios,
      favoritos: state.favoritos
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
    postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario))
})

function RenderExcursion(props) {
  const excursion = props.excursion;
  if (excursion != null) {
    return (
      <Card style={styles.card}>
        <ImageBackground
          source={{ uri: baseUrl + excursion.imagen }}
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
            <IconButton
              icon="pencil"
              size={28}
              onPress={() => props.onPressComentario()}
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
        valoracion: 5,
        autor: '',
        comentario: '',
        showModal: false
    }
  }

  toggleModal() {
    this.setState({showModal: !this.state.showModal});
  }

  resetForm() {
    this.setState({
        valoracion: 5,
        autor: '',
        comentario: '',
        showModal: false
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(excursionId, this.state.valoracion, this.state.autor, this.state.comentario);
    this.resetForm();
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones.filter((excursion) => excursion.id === excursionId)[0]}
          favorita={this.props.favoritos.favoritos.some((el) => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          onPressComentario={() => this.toggleModal()}
        />
        <RenderComentario 
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} 
        />
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => {this.toggleModal(); this.resetForm();}}
          onRequestClose={() => {this.toggleModal(); this.resetForm();}}
        >
          <View style={styles.modal}>
            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                {[1, 2, 3, 4, 5].map((item, index) => (
                    <IconButton
                        key={index}
                        icon={item <= this.state.valoracion ? 'star' : 'star-outline'}
                        size={30}
                        onPress={() => this.setState({valoracion: item})}
                    />
                ))}
            </View>
            <TextInput
              label="Autor"
              value={this.state.autor}
              onChangeText={autor => this.setState({ autor })}
              left={<TextInput.Icon icon="account-outline" />}
              style={styles.modalText}
            />
            <TextInput
              label="Comentario"
              value={this.state.comentario}
              onChangeText={comentario => this.setState({ comentario })}
              left={<TextInput.Icon icon="comment-outline" />}
              style={styles.modalText}
            />
            <View style={styles.botones}>
                <Button 
                    onPress={() => this.gestionarComentario(excursionId)}
                    color="#512DA8"
                    title="Enviar" 
                />
            </View>
            <View style={styles.botones}>
                <Button 
                    onPress={() => {this.toggleModal(); this.resetForm();}}
                    color="#512DA8"
                    title="Cancelar" 
                />
            </View>
          </View>
        </Modal>
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
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  descripcion: {
    marginTop: 20,
    marginBottom: 20,
  },
  iconoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 8,
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalText: {
    marginBottom: 10
  },
  botones: {
    marginBottom: 10
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);