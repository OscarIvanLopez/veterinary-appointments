import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from './components/Header';
import NuevaCita from './components/NuevaCita';
import ListaCitas from './components/ListaCitas';

class App extends Component {
  state = {
    citas: []
  }

  //SE EJECUTA CUANDO LA APLICACION CARGA
  componentDidMount(){
    const citasLS = localStorage.getItem('citas')
    if(citasLS){
      this.setState({
        citas: JSON.parse(citasLS)
      })
    }
  }

  // SE EJECUTA CUANDO ELIMINAMOS O AGREGAMOS UNA NUEVA CITA
  componentDidUpdate(){
    localStorage.setItem('citas', JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    //copiar el state actual
    const citas = [...this.state.citas, datos];

    //agregar el nueva state
    this.setState({
      citas: citas
    })
  }

  //ELIMINAR LAS CITAS DEL STATE
  eliminarCita = id => {
    // tomar una copia del state
    const citasActuales = [...this.state.citas];

    // utilizar filter para sacar el elemento @id del arreglo
    const citas = citasActuales.filter(cita => cita.id !== id);

    
    // actualizar el state
    this.setState({
      citas
    })
  }


  render() {

    return (
      <div className="container">
        <Header
          titulo='Administrador Pacientes Veterinaria '
        />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita
              crearNuevaCita={this.crearNuevaCita}
            />
            <div className="mt-5 col-md-10 mx-auto">
              < ListaCitas 
                citas={this.state.citas}
                eliminarCita={this.eliminarCita}
              />
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default App;

