import React, { Component } from 'react'


export default class Salas extends Component {
    constructor(){
        super();
        this.state = {
            nombre: '',
            descripcion: '',
            horario: '',
            idPelicula: '',
            _id: '',
            salas: [],
            peliculas: [],
            horarios: ['10:00 - 12:00','12:30 - 14:30','15:00 - 17:00']

        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarSala = this.agregarSala.bind(this);
    }

    handleChange(e){
            const {name, value} = e.target;
            this.setState({
                [name]: value
            })

            console.log({[name]: value})
        }

    componentDidMount(){
            this.getSalas();
            this.getPeliculas();
        }

    agregarSala(e){
            e.preventDefault();
            if(this.state._id){
                fetch(`http://localhost:3001/server/newMovie${this.state._id}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        nombre: this.state.nombre,
                        descripcion: this.state.descripcion,
                        horario: this.state.horario,
                        pelicula: this.state.pelicula
                    }),
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  })
                    .then(res => res.json())
                    .then(data => {
                      this.setState({_id: '', nombre: '', descripcion: '', horario: '', pelicula: ''});
                      this.getSalas();
                    });
            }else {
                fetch("http://localhost:3001/server/newSala", {
                    method: 'POST',
                    body: JSON.stringify({
                      nombre: this.state.nombre,
                      descripcion: this.state.descripcion,
                      horario: this.state.horario,
                      idPelicula: this.state.idPelicula
                    }),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    alert('Se guardo correctamente')
                    this.setState({nombre: '', descripcion: '', horario: '', idPelicula: ''});
                    this.getSalas();
                })
                .catch(err => console.error(err));

                }
            }

    async getPeliculas(){
      let array = []
      try {
        let datos = await localStorage.getItem('datos');
        JSON.parse(datos).forEach((item) => {
          let datosPelicula = {
            id: item._id,
            titulo: item.titulo
          }
            array.push(datosPelicula);
        });

        this.setState({peliculas: array})
      }
      catch(err){
        console.log(err)
      }
    }

    getSalas(){
            fetch('http://localhost:3001/server/getSala')
            .then(res => res.json())
            .then(data => {
              if(data != null){

                  this.setState({salas: data});
                  console.log(this.state.salas)
              }
              else{
                  this.setState({salas: []});
              }
            });
        }

    editarSala(id) {
      let header = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre: this.state.nombre,
          descripcion: this.state.descripcion,
          horario: this.state.horario,
          idPelicula: this.state.idPelicula,
          id: id
        })
      }
        fetch(`http://localhost:3001/server/updateSala`, header)
          .then(res => res.json())
          .then(data => {
            this.setState({titulo: '', categoria: '', valorBoleto: '', resumen: '', foto: ''});
            alert('Se actualizó correctamente');
            this.getSalas();
          });
      }

    eliminarSala(id){
        fetch(`http://localhost:3001/server/deleteSala`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id: id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Se elimimo correctamente')
            this.getSalas();
        });
    }

    render() {
        return (
            <div class="flex  px-10 py-2">
                <div class="flext-1 text-gray-700 text-center bg-gray-400 px-20 py-2 m-2">
                <form onSubmit={this.agregarSala}>
                            <div class="">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    NOMBRE
                            </label>
                                <input class="appearance-none block  bg-grey-lighter text-grey-darker border border-red rounded py-3 px-12 mb-3" type="text" name="nombre" onChange={this.handleChange} value={this.state.nombre} placeholder="" />
                            </div>
                            <div class="w-3/3 px-9 py-3 ">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    DESCRIPCION
                            </label>
                                <input class="appearance-none block  bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-12 mb-3" type="text" name="descripcion" onChange={this.handleChange} value={this.state.descripcion} placeholder="" require />
                            </div>
                            <div class="w-3/3 px-9 py-3">
                                <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                                    HORARIO
                            </label>
                            <select class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name="horario" onChange={this.handleChange}>
                              <option value="999">Escojer..</option>
                              {
                                this.state.horarios.map(item => { return(
                                  <option value={item}>{item}</option>
                                )})
                              }
                            </select>
                          </div>
                            <div class="w-3/3 px-9 py-3">
                                <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                                    PELICULA
                            </label>
                            <select class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name="idPelicula" onChange={this.handleChange}>
                              <option value="999" >Escojer..</option>
                              {
                                this.state.peliculas.map(item => { return(
                                  <option value={item.id}>{item.titulo}</option>
                                )})
                              }
                            </select>
                          </div>
                        <div class="text-gray-700  px-4 py-2 m-0"></div>

                        <div class="flex justify-between ">
                            <div class="text-gray-700 px-4 py-2 m-0"></div>
                            <div class="text-blue-700  px-4 py-2 m-2">
                                <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >
                                    ENVIAR
                                </button>
                            </div>
                            <div class="text-gray-300  px-2 py-10 m-0"></div>

                        </div>
                        </form>
                </div>
                <div class="flex-1 text-gray-700 text-center bg-white px-4 py-2 ">
                        <table class=" text-left  border-collapse">
                            <thead class="bg-gray-400 rounded  ">

                                <tr>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">NOMBRE</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">DESCRIPCION</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">HORARIO</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">PELICULA</th>
                                    <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ACCIONES</th>
                                </tr>
                            </thead>

                                <tbody >
                                    {
                                        this.state.salas.map(sala => {
                                            return (
                                    <tr key={sala._id} >
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm "><input onChange={this.handleChange} value={this.state.nombre} name="nombre" placeholder={sala.nombre}></input></td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm "><input onChange={this.handleChange} value={this.state.descripcion} name="descripcion" placeholder={sala.descripcion}></input></td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">
                                          <select  name="horario" onChange={this.handleChange}>
                                            <option value={sala.horario} >{sala.horario}</option>
                                            {
                                              this.state.horarios.map(item => { return(
                                                <option value={item}>{item}</option>
                                              )})
                                            }
                                          </select>
                                        </td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm "><select name="idPelicula" onChange={this.handleChange}>
                                            {
                                              this.state.peliculas.map(item => {
                                                if(sala.idPelicula == item.id){
                                                  console.log("entro al if")
                                                  return(
                                                    <option value={item.id}>{item.titulo}</option>
                                                    // this.state.peliculas.map(item1 => { return (
                                                    //   <option value={item1.id}>{item1.titulo}</option>
                                                    // )})
                                                  )
                                                }

                                              })
                                            }
                                          </select></td>
                                        <div class="flex" >
                                            <div class="flex-1 text-green-700  px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.editarSala(sala._id)} >
                                                    ACTUALIZAR
                                                </button>
                                            </div>
                                            <div class=" flex-1 text-red-700 px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.eliminarSala(sala._id)} >
                                                    ELIMINAR
                                                </button>
                                            </div>
                                        </div>
                                    </tr>
                                    )
                                    })
                                    }
                                </tbody>
                        </table>
                    </div>

            </div>

        );
    }
}
