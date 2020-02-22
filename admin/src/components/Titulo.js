import React, { Component } from 'react'


export default class Titulo extends Component {
    constructor() {
        super();
        this.state = {
            titulo: "",
            categorias: ['Accion','Drama','Comedia','Terror','Animado'],
            valorBoleto: 0,
            resumen: "",
            foto: null
        }
    }

    enviar() {
        let url = "http://localhost:3001/server/newMovie";
        let data = this.state;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        }).then((result) => {
            result.json().then((resp) => {
                console.warn("resp", resp)
            })
        })

    }
    render() {
        return (
            <div class="flex flex-col ">
                <div class="text-gray-700 px-5 py-5 ">
                    <div class="bg-green-300 shadow-md rounded px-10 pt-4 pb-10 mb-30 flex flex-col my-150">
                        <div class="-mx-3 md:flex mb-9" >
                            <div class="md:w-1/3 px-3 py-3 mb-6 md:mb-0">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    TITULO PELICULA
                            </label>
                                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" value={this.state.titulo} name="titulo" onChange={(data) => { this.setState({ titulo: data.target.value }) }} placeholder="Ingrese Titulo" />
                            </div>
                            <div class="md:w-1/3 px-3 py-3">
                                <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
                                    CATEGORIA
                            </label>
                                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" type="text" value={this.state.categoria} name="categoria" onChange={(data) => { this.setState({ categoria: data.target.value }) }} placeholder="Ingrese Categoria" />
                            </div>
                            <div class="md:w-1/3 px-3 py-3">
                                <label class="block uppercase tracking-wide text-black-darker text-xs font-bold mb-2" >
                                    PRECIO BOLETO
                            </label>
                                <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" type="text" value={this.state.precio} name="precio" onChange={(data) => { this.setState({ precio: data.target.value }) }} placeholder="Ingrese Precio" />
                            </div>
                        </div>
                        <div>
                            <div class=" py-2 box border rounded flex flex-col shadow bg-white">
                                <div class="box__title bg-grey-lighter px-3  border-b"><h3 class="text-sm text-grey-darker font-medium">RESUMEN</h3></div>
                                <textarea value={this.state.resumen} name="resumen" onChange={(data) => { this.setState({ resumen: data.target.value }) }} placeholder="Resumen de la Pelicula" class="text-grey-darkest flex-1 p-3 m-1 bg-transparent"></textarea>
                            </div>
                        </div>
                        <div class="text-gray-700  px-4 py-2 m-0"></div>
                        <div class="w-3/3 mx-auto -400" >
                                <label class=" flex flex-col items-center px-4 py-2 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue hover:bg-blue ">
                                    <input type='file' value={this.state.foto} name="foto" onChange={(data) => { this.setState({ foto: data.target.value }) }}></input>
                                </label>
                        </div>

                        <div class="flex justify-between ">
                            <div class="text-gray-700 px-4 py-2 m-0"></div>
                            <div class="text-blue-700  px-4 py-2 m-2">
                                <button class="bg-blue hover:bg-blue-dark text-dark font-bold py-2 px-4 rounded" onClick={() => { this.enviar() }}>
                                    ENVIAR
                                </button>
                            </div>

                            <div class="text-gray-300  px-2 py-10 m-0"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
