import React, { Component } from 'react';
import { Text, ScrollView, View, StyleSheet, ImageBackground } from 'react-native';
import { Card } from 'react-native-paper';
import { CABECERAS } from '../comun/cabeceras';
import { EXCURSIONES } from '../comun/excursiones';
import { ACTIVIDADES } from '../comun/actividades';

function RenderItem(props) {
    const item = props.item;
    if (item != null) {
        return (
            <Card style={styles.card}>
                <ImageBackground 
                    source={require('./imagenes/40Anos.png')} 
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
    constructor(props) {
        super(props);
        this.state = {
            cabeceras: CABECERAS,
            excursiones: EXCURSIONES,
            actividades: ACTIVIDADES
        };
    }

    render() {
        return(
            <ScrollView>
                <RenderItem item={this.state.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.state.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.state.actividades.filter((actividad) => actividad.destacado)[0]} />
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

export default Home;
