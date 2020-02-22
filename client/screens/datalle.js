import React, { Component } from 'react';
import { Image, Text, StyleSheet, ImageBackground, AsyncStorage, Alert } from 'react-native';
import {  Container, Content, Header, Button, Left, Right, Body, Icon, Card,CardItem, Label, Input,Item } from 'native-base';
import DialogInput from "react-native-dialog-input";
export default class Home extends Component{
    constructor(props) {
      super(props);
      this.state ={
        id: '',
        dataTemporal: {},
        titulo: '',
        img: '',
        sinopsis: '',
        sala: '',
        descripcion: '',
        horario: '',
        precio: '',
        precioUnitario: '',
        numBoletos: 1,
        email: '',
        datosSala:[],
        isDialogVisible: false  
      }

      this.cerrarAlert = this.cerrarAlert.bind(this)
    }

    componentDidMount(){
      this.localStoragge();
    }

    calcular = () => {
      let boletos = this.state.numBoletos;
      let precio = parseFloat(this.state.precioUnitario);
      let total = precio * boletos;
      this.setState({precio: total.toFixed(2)})
      return this.setState({isDialogVisible: true})
      /*Alert.alert('Detalle de Compra',`Compra de ${this.state.numBoletos} boletos para la pelicula ${this.state.titulo}`, [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Comprar', onPress: this.postCompra},
      ],{cancelable: false})*/
  }

    handleBoletos = text => {
      this.setState({ numBoletos: text })
      //setTimeout(function(){ this.calcular() },3000)
    };

    handleCorreo = text => {
      this.setState({ email: text });
      this.postCompra()
      this.setState({isDialogVisible: false})
    };

    localStoragge = async () =>{
        try{
          await  AsyncStorage.multiGet(['salas', 'datos', 'id']).then((value) => {
            this.setState({datosSala: value[0][1], dataTemporal: value[1][1], id: value[2][1]});
        })
        }
        catch(error){
            console.log(error)
        }
        this.getPeliculas();
    }

    deleteStoragge = async () =>{
        try{
             await AsyncStorage.clear();
        }
        catch(error){
            console.log(error)
        }
        this.props.navigation.push('Home');
    }

    getPeliculas = () => {
      let datos = JSON.parse(this.state.datosSala)
      let datosPelicula = JSON.parse(this.state.dataTemporal)
      datos.forEach((item) => {
        if(this.state.id == item.idPelicula){
          this.setState({sala: item.nombre, descripcion: item.descripcion, horario: item.horario});
        }
      });

        this.setState({titulo: datosPelicula.titulo, img: datosPelicula.foto, sinopsis: datosPelicula.resumen, precioUnitario: datosPelicula.valorBoleto});
    }

    postCompra = () => {
        //this.calcular()
      const API_URL = `http://172.16.11.53:3001/server/newTicket`;
      const header = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          totalBoletos: this.state.numBoletos,
          email: this.state.email, 
          sala: this.state.sala,
          pelicula: this.state.titulo,
          horario: this.state.horario
        })
      }

      return fetch(API_URL, header)
      .then((response) => response.json())
      .then((responseJson) => {
        alert(responseJson)
        this.props.navigation.push('Home')
      })
      .catch((err) => {
        alert(err)
      })
    }

    cerrarAlert=()=>{
      return this.setState({isDialogVisible: false})
    }

    render() {
        return (
          <Container>
            <Header style={{backgroundColor: 'black'}}>
                <Left>
                  <Button transparent style={{marginTop: 10,}} onPress={this.deleteStoragge}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                  <Body>
                    <Text style={styles.textoHeader}>Reservas</Text>
                  </Body>
                <Right />
              </Header>
              <ImageBackground source={require('../assets/img/background.jpg')} style={styles.container}>
                <Content transparent>
                  <Card transparent>
                    <CardItem style={styles.card}>
                      <Body style={{alignItems: 'center'}}>
                        <Text style={{fontSize: 30}}>{this.state.titulo}</Text>
                      </Body>
                    </CardItem>
                    <CardItem style={styles.card}>
                      <Body style={{alignItems: 'center'}}>
                        <Image source={{uri: this.state.img}} style={styles.logo}/>
                        <Label>Sinopsis:</Label>
                        <Text>{this.state.sinopsis}</Text>
                      </Body>
                    </CardItem>
                    <CardItem style={{backgroundColor: '#c9c7c7a9'}} footer bordered>
                      <Left>
                      <Label>Costo: </Label>
                      <Text>${this.state.precioUnitario}</Text>
                      </Left>
                    <Body>
                      <Label>Funcion</Label>
                      <Text>{this.state.horario}</Text>
                    </Body>
                      <Right>
                        <Label>Nº Boletos</Label>
                        <Item style={{height: 30, width: 85}}>
                          <Input onChangeText={this.handleBoletos} type='number' value={this.state.numBoletos} style={{textAlign: 'center'}}/>
                        </Item>
                      </Right>
                    </CardItem>
                    <CardItem style={{backgroundColor: '#c9c7c7a9'}}>
                      <Body>
                        <Content style={{left: '10%'}}>
                          <Label>Valor Total:</Label>
                          <Text style={{textAlign: 'center', fontSize: 17}}>${this.state.precio}</Text>
                        </Content>
                      </Body>
                      <Right style={{width: '100%'}}>
                      <Button rounded success style={{width: '80%'}} onPress={this.calcular}>
                        <Text style={{left: 30, color: 'white'}}>Comprar</Text>
                      </Button>
                      </Right>
                    </CardItem>
                  </Card>
                </Content>
                
              </ImageBackground>
              <DialogInput isDialogVisible={this.state.isDialogVisible} 
                title='Detalle de Compra'
                hintInput={"@gmail.com"} 
                submitInput= {(text) => this.handleCorreo(text)}
                closeDialog = {()=> {this.cerrarAlert()}}>
              </DialogInput>          
          </Container>
        )
    }
}
/*
 <Item floatingLabel >
                          <Label>Correo</Label>
                          <Input onChangeText={this.handleCorreo}/>
                        </Item>
*/
const styles = StyleSheet.create({
  container: {
    width: '105%',
    height: '100%',
    position: 'relative',
    right: '4%',
},
tituloCartelera: {
    flex: 1,
    width: '100%',
    fontSize: 30,
    textAlign: "center",
    marginTop: '18%',
    color: '#EFFBF8',
},
content: {
    flex: 1,
    justifyContent: 'center',
    width: '75%',
    marginLeft: '13%',
    marginBottom: '20%'
},
textoHeader: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 20
},
img: {
    height: '20%',
    width: '30%'
},
cartelera: {
    flex: 3,
    alignItems: 'center',
    fontWeight: 'bold'
},
header: {
    flex: 1,
    flexDirection: 'row'
},
logo: {
    width: 250,
    height: 250,
    borderRadius: 25,
    resizeMode: 'contain'
},
titulo: {
  textAlign: 'center',
  color: 'white',
  fontSize: 17,
  paddingBottom: 5,
  paddingTop: 15
},
card: {
  backgroundColor: '#ffffffa9'
}
})
