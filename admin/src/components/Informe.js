import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faSave } from '@fortawesome/free-solid-svg-icons'

export default class Informe extends Component {
    constructor(){
        super();
        this.state = {
            titulo: '',
            categorias: '',
            valorBoleto: '',
            resumen: '',
            foto: '',
            _id: '',
            peliculas: [],
            categoriasArray: ['Acción','Animado','Aventura','Ciencia Ficción','Comedia','Drama','Terror'],
            peliculaActualizar: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.agregarPelicula = this.agregarPelicula.bind(this);
        this.onFileChange= this.onFileChange.bind(this);
    }

    handleChange(e){
        const {name, value} = e.target;
        this.setState({
            [name]: value
        });
    }

    onFileChange(e){
      let file = e.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({ foto: reader.result })
      }
      reader.onerror = (error) => {
        console.log(error);
      }

    }

    componentDidMount(){
        this.getPeliculas();
    }

    agregarPelicula(e){
        e.preventDefault();
        if(this.state._id){
            fetch(`http://localhost:3001/peliculas/${this.state._id}`, {
                method: 'PUT',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    titulo: this.state.titulo,
                    categorias: this.state.categoria,
                    valorBoleto: this.state.precio,
                    resumen: this.state.resumen,
                    imagen: this.state.imagen
                })
              })
                .then(res => res.json())
                .then(data => {
                  this.setState({_id: '', titulo: '', categoria: '', precio: '', resumen: '', file: ''});
                  this.getPeliculas();
                });
        }else {

            fetch("http://localhost:3001/server/newMovie", {
                method: 'POST',
                body: JSON.stringify({
                  titulo: this.state.titulo,
                  categorias: this.state.categorias,
                  valorBoleto: this.state.valorBoleto,
                  resumen: this.state.resumen,
                  foto: this.state.foto
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
                this.setState({titulo: '', categoria: '', valorBoleto: '', resumen: '', foto: ''});
                this.getPeliculas();
            })
            .catch(err => console.error(err));


            }
    }

    getPeliculas(){
        fetch('http://localhost:3001/server/getMovie')
        .then(res => res.json())
        .then(data => {
            this.setState({peliculas: data});
            if(localStorage.getItem('datos'.length) == 0){
              this.setPeliculas(JSON.stringify(data))
            }
            else{
              localStorage.clear()
              this.setPeliculas(JSON.stringify(data))
            }
        });
    }

    editarPelicula(pelicula) {
     
        let header = {
          method: 'PUT',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(pelicula)
        }
        fetch(`http://localhost:3001/server/updateMovie`, header)
          .then(res => res.json())
          .then(data => {
            //this.setState({titulo: '', categoria: '', valorBoleto: '', resumen: '', foto: ''});
            alert('Se actualizó correctamente');
            this.getPeliculas();
          });
        }

    eliminarPelicula(id){
        fetch(`http://localhost:3001/server/deleteMovie`, {
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
            this.getPeliculas();
        });
    }

    async setPeliculas(datos){
      try {
        await localStorage.setItem('datos', datos)
      }
      catch(err){
        console.log(err)
      }
    }

    render() {
        return (
          <div class="flex flex-col ">
            <div class=" px-4 py-2 m-2">
              <div class="shadow-md rounded px-10 pt-4 pb-10 mb-30 flex flex-col my-150">
                <form onSubmit={this.agregarPelicula}>
                  <div class="-mx-3 md:flex mb-9" >
                    <div class="md:w-1/3 px-3 py-3 mb-6 md:mb-0">
                      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                        TITULO PELICULA
                      </label>
                      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" name="titulo" type="text" onChange={this.handleChange} value={this.state.titulo} placeholder="Ingrese Titulo" />
                    </div>
                    <div class=" md:w-1/3 px-3 py-3">
                      <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                        CATEGORIA
                      </label>
                      <select class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" name="categorias" onChange={this.handleChange}>
                        <option value="999" >Categoria..</option>
                        {
                          this.state.categoriasArray.map(item => { return(
                            <option value={item}>{item}</option>
                          )})
                        }
                      </select>
                    </div>
                    <div class="md:w-1/3 px-3 py-3">
                      <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                        PRECIO BOLETO
                      </label>
                      <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" name="valorBoleto" onChange={this.handleChange} value={this.state.valorBoleto}  placeholder="Ingrese Precio" />
                    </div>
                  </div>
                  <div>
                    <div class=" py-2 box border rounded flex flex-col shadow bg-white">
                      <div class="box__title bg-grey-lighter px-3  border-b"><h3 class="text-sm text-grey-darker font-medium">RESUMEN</h3></div>
                      <textarea  placeholder="Resumen de la Pelicula" class="text-grey-darkest flex-1 p-3 m-1 bg-transparent" name="resumen" onChange={this.handleChange} value={this.state.resumen}></textarea>
                    </div>
                  </div>
                  <div class="text-gray-700  px-4 py-2 m-0"></div>
                  <div class="w-3/3 mx-auto -400" >
                    <label class=" flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue hover:bg-blue ">
                      <input type='file' onChange={this.onFileChange} ></input>
                    </label>
                  </div>
                  <div class="flex justify-between ">
                    <div class="text-gray-700 px-4 py-2 m-0"></div>
                    <div class="text-blue-700  px-4 py-2 m-2">
                      <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" >
                          ENVIAR <FontAwesomeIcon icon={faSave}/>
                      </button>
                    </div>

                    <div class="text-gray-300  px-1 py-10 m-0"></div>
                  </div>
                </form>
              </div>
            </div>

            <div class=" px-4 py-2 m-2">
            <div class="flex justify-between ">
                <div class=" px-4 py-2 m-2"></div>
                <div class=" px-4 py-2 m-2">
                <div class="flex-1 text-gray-700 text-center bg-white py-2 px-3 ">
                    <table class=" text-left  border-collapse">
                        <thead class="bg-gray-400 rounded  ">
                            <tr>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">TITULO</th>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">CATEGORIA</th>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">BOLETO</th>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">RESUMEN</th>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">IMAGEN</th>
                                <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">ACCIONES</th>
                            </tr>
                        </thead>

                        <tbody >
                            {
                                this.state.peliculas.map(pelicula => {
                                    return (
                                    <tr key={pelicula._id}>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">
                                          <label>{pelicula.titulo}</label>
                                          <input onChange={this.handleChange} value={pelicula.titulo} name="titulo" className="border-grey-light"></input>
                                        </td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">
                                        <select  name="categorias" onChange={this.handleChange}>
                                          <option value={pelicula.categorias} >{pelicula.categorias}</option>
                                          {
                                            this.state.categoriasArray.map(item => { return(
                                              <option value={item}>{item}</option>
                                            )})
                                          }
                                        </select>
                                        </td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">
                                          <label>${pelicula.valorBoleto}</label>
                                          <input onChange={this.handleChange} value={pelicula.valorBoleto} name="valorBoleto" class="border-grey-light"></input>
                                        </td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">
                                          <label>{pelicula.resumen}</label>
                                          <input onChange={this.handleChange} value={pelicula.resumen} name="resumen" class="border-grey-light"></input>
                                        </td>
                                        <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm "><img className="h-auto w-full" src={pelicula.foto} /></td>
                                        <div class="flex" >
                                            <div class="flex-1 text-green-700  px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.editarPelicula(pelicula)} >
                                                  <FontAwesomeIcon icon={faEdit} style={{width: 30, height: 30}}/>
                                                </button>
                                            </div>
                                            <div class=" flex-1 text-red-700 px-2 py-6">
                                                <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" onClick={() => this.eliminarPelicula(pelicula._id)} >
                                                <FontAwesomeIcon icon={faTrash} style={{width: 25, height: 25}}/>
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
                <div class=" py-2 m-2"></div>
            </div>
            </div>
         </div>
        );
    }
}
