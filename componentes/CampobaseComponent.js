import React, { Component } from 'react';
import Calendario from './CalendarioComponent';
import { EXCURSIONES } from '../comun/excursiones';
import DetalleExcursion from './DetalleExcursionComponent';
import { View } from 'react-native';

class Campobase extends Component { // Esto significa que Campobase es un componente de React que hereda todas las funcionalidades de un componente de clase de React
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES, //propiedad + VALOR proveniente de fichero JavaScript de la carpeta comun.
            seleccionExcursion: null // Se ha creado una nueva variable de estado: seleccionExcursion. Su objetivo es almacenar el identificador de la excursión que se desea renderizar
    };
  }
    
  onSeleccionExcursion(excursionId) { //Esta función se llama desde dentro de la función onPress. Actualiza el estado, específicamente, seleccionExcursion.
        this.setState({ seleccionExcursion: excursionId }) 
    }
  render() { // En el contexto de React, el método render() es un método obligatorio en todos los componentes de clase. Es llamadp cada vez que el estado de una clase cambia
        // Este método es responsable de definir la estructura de la interfaz de usuario que el componente debe representar.
        // La estructura de la interfaz de usuario (UI) se refiere a la disposición y organización de los elementos visuales que componen una aplicación, página web o cualquier sistema interactivo con el que un usuario pueda interactuar.
  return (
    <View style={{ flex: 1}}>
        <DetalleExcursion 
            excursion={this.state.excursiones.filter((excursion) => excursion.id === this.state.seleccionExcursion)[0]} 
        />
        <Calendario 
            excursiones={this.state.excursiones} 
            onPress={(excursionId) => this.onSeleccionExcursion(excursionId)} 
        />
    </View>
);
  }
}

export default Campobase;