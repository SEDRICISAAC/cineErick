import React, { Component } from 'react';
import { StyleSheet, ImageBackground, Text, Image, View,TouchableOpacity, ScrollView, AsyncStorage, } from 'react-native';
import { Container, Content, Body, Header, Left, Right, Button, Icon } from 'native-base';
import { Buffer } from 'buffer'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
          id: [],
          peliculas: [],
          salas: []
        };
    }

    componentDidMount(){
      this.getData();
    }

    getData = () => {

      const API_URL = `http://172.16.11.53:3001/server/getSala`;
      const header = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      return fetch(API_URL, header)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({salas: responseJson})
        responseJson.forEach((item, i) => {
            this.state.id.push(item.idPelicula)
        });
        this.getPeliculas()
      })
      .catch((err) => {
        alert(err)
      })

    }

    getPeliculas =  () => {

      let idEncode = Buffer(JSON.stringify(this.state.id)).toString('base64');

      const API_URL = `http://172.16.11.53:3001/server/getMovieId?id=${idEncode}`;

      const header = {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }

      return fetch(API_URL, header)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({peliculas: responseJson});
      })
      .catch((err) => {
        alert(err)
      })

    }

    localStoragge = async (id) => {
        try{
            await AsyncStorage.multiSet([['salas', JSON.stringify(this.state.salas)], ['datos', id], ['id', JSON.parse(id)._id]]);
        }
        catch(error){
            console.log(error);
        }
        this.props.navigation.push('Detalle');
    }

    render() {
        return (
            <Container>
              <Header style={{backgroundColor: 'black'}}>
                <Left>
                  <Button transparent style={{marginTop: 10,}} onPress={()=>{this.props.navigation.push('Iniciar')}}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                  <Body>
                    <Text style={styles.textoHeader}>Cartelera</Text>
                  </Body>
                <Right />
              </Header>
              <ImageBackground source={require('../assets/img/background.jpg')} style={styles.container}>
              <ScrollView>
                <Content contentContainerStyle={styles.content}>
                  <Text style={styles.tituloCartelera}>Peliculas en Taquilla</Text>
                  <View style={styles.cartelera}>
                  {
                    this.state.peliculas.map(item =>
                      <TouchableOpacity onPress={() => this.localStoragge(JSON.stringify(item))} key={item._id}>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                        <Image source={{uri: item.foto}} style={styles.logo} />
                      </TouchableOpacity>
                    )
                  }
                  </View>
                </Content>
              </ScrollView>
              </ImageBackground>
            </Container>
        );
    }
}

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
        width: 200,
        height: 200,
        borderRadius: 25,
        resizeMode: 'contain'
    },
    titulo: {
      textAlign: 'center',
      color: 'white',
      fontSize: 17,
      paddingBottom: 5,
      paddingTop: 15
    }
});
