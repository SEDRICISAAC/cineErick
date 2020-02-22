import React, { Component } from 'react'

export default class Compra extends Component {
    constructor(props) {
        super(props);
        this.state = {
            compras: []
        }
    }

    componentDidMount(){
        this.getCompras();
    }

    getCompras(){
        fetch('http://localhost:3001/server/getTicket')
        .then(res => res.json())
        .then(data => {
            this.setState({compras: data});
            console.log(this.state.compras);
        });
    }
    render() {
        return (
            <div class="w-2/3 mx-auto -400">
            <div class="bg-white  shadow-md rounded my-6">
                <table class="text-left w-full border-collapse">
                    <thead class="bg-green-300 rounded my-6">
                        <tr>
                            <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light"># DE BOLETOS</th>
                            <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">EMAIL</th>
                            <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">SALA</th>
                            <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">PELICULA</th>
                            <th class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">HORARIO</th>
                        </tr>
                    </thead>
                    <tbody >
                            {
                                this.state.compras.map(compra => {
                                    return (
                                        <tr key={compra._id}>
                                            <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{compra.totalBoletos}</td>
                                            <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{compra.email}</td>
                                            <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{compra.sala}</td>
                                            <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{compra.pelicula}</td>
                                            <td class="py-4 px-10 bg-grey-lightest font-bold uppercase text-sm ">{compra.horario}</td>
                                            <div class="flex" >
                                                <div class="text-green-700  px-2 py-4">
                                                    <button class="uppercase bg-grey-lightest font-bold uppercase text-sm" >
                                                        ACTUALIZAR
                                                    </button>
                                                </div>
                                            </div>
                                        </tr>
                                    )
                                }
                                )
                            }
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
}