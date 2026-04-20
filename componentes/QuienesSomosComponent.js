import React, { Component } from 'react';
import { ScrollView, StyleSheet, FlatList } from 'react-native';
import { Card, Text, List, Avatar } from 'react-native-paper';
import { ACTIVIDADES } from '../comun/actividades';

function Historia() {
    return (
        <Card style={styles.card}>
            <Card.Title title="Un poquito de historia" />
            <Card.Content>
                <Text style={styles.texto}>
                    El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.
                </Text>
                <Text style={styles.texto}>
                    Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.
                </Text>
                <Text style={styles.texto}>Gracias!</Text>
            </Card.Content>
        </Card>
    );
}

class QuienesSomos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            actividades: ACTIVIDADES,
        };
    }

    render() {
        const renderActividadItem = ({ item, index }) => {
            return (
                <List.Item
                    title={item.nombre}
                    description={item.descripcion}
                    descriptionNumberOfLines={10}
                    left={() => <Avatar.Image source={require('./imagenes/40Anos.png')} size={50} style={styles.imagen} />}
                />
            );
        };

        return (
            <ScrollView>
                <Historia />
                <Card style={styles.card}>
                    <Card.Title title="Actividades y recursos" />
                    <Card.Content>
                        <FlatList
                            scrollEnabled={false}
                            data={this.state.actividades}
                            renderItem={renderActividadItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </Card.Content>
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        margin: 10,
    },
    texto: {
        marginTop: 10,
    },
    imagen: {
        alignSelf: 'center',
        backgroundColor: 'transparent'
    }
});

export default QuienesSomos;
