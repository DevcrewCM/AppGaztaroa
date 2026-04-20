import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
      cabeceras: state.cabeceras,
      excursiones: state.excursiones,
      actividades: state.actividades
    }
}

function RenderItem(props) {
    const item = props.item;
    if (item != null) {
        return (
            <Card style={styles.card}>
                <ImageBackground 
                    source={{ uri: baseUrl + item.imagen }} 
                    style={styles.imageBackground}
                >
                    <Text style={styles.cardTitle}>{item.nombre}</Text>
                </ImageBackground>
                <Card.Content>
                    <Text style={styles.descripcion}>
                        {item.descripcion}
                    </Text>
                </Card.Content>
            </Card>
        );
    }
    else {
        return (<View></View>);
    }
}

class Home extends Component {

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
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
        margin: 10,
    }
});

export default connect(mapStateToProps)(Home);
