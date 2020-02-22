import React, { Component } from 'react';


const API_URL = "http://localhost:3001/server/register";

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      nombre: '',
      correo: '',
      clave: '',
    };
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  registerUser = e => {
    e.preventDefault()
    this.post = {
      datos: {
          nombre: this.state.nombre,
          correo: this.state.correo,
          clave: this.state.clave,
      }
  }
    if (this.post.datos.nombre === "" || this.post.datos.correo === "" || this.post.datos.clave === "") {
      alert("Complete todos los datos para continuar...");
    } else {
      
        fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(this.post.datos),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                 window.location.assign("http://localhost:3000/");
            })
            .catch(err => console.error(err));
     
    }
  };

  render() {
    const { nombre, correo, clave } = this.state
    return (
      <div className="bg-image-1 h-screen font-sans">
        <div className="container mx-auto h-full flex justify-center items-center">
        <div className="w-1/3">
            <h1 class="text-4xl text-center font-thin font-h">Registro de Admin</h1>
            <div className="border-teal p-8 border-t-12 bg-transparent mb-6 rounded-lg shadow-lg">
              <form className="px-8 pt-6 pb-8 mb-4 bg-transparent rounded" onSubmit={ this.registerUser }>
                <div className="mb-4">
                  <label className="font-bold -700 block mb-2 text-white ">Nombre</label>
                  <input className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  type="text"
                  placeholder="Nombre"
                  name="nombre"
                  value={ nombre }
                  onChange={ this.changeHandler } 
                  />
                </div>

                <div className="mb-4">
                  <label className="font-bold text-white block mb-2">Correo Electrónico</label>
                  <input className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  type="text"
                  placeholder="correo electronico"
                  name="correo"
                  value={ correo }
                  onChange={ this.changeHandler } 
                  />
                </div>

                <div className="mb-4">
                  <label className="font-bold text-white block mb-2">Contraseña</label>
                  <input className="block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow"
                  type="password"
                  placeholder="*******"
                  name="clave"
                  value={ clave }
                  minLength="6"
                  onChange={ this.changeHandler } 
                  securetextentry="true"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button type="submit" className="bg-gray-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded">
                    Registrarse
                  </button>
                  <a href="http://localhost:3000/" className="bg-gray-500 hover:bg-blue-700 focus:outline-none focus:shadow-outline text-white font-bold py-2 px-4 rounded">
                    Volver
                  </a>
                </div>  
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
