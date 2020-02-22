import React, { Component } from 'react';
import * as Font from 'expo-font';
import { StyleSheet, ImageBackground, Text, AsyncStorage } from 'react-native';
import { Container, Content, Card, CardItem, Body, Item, Label, Input, Button, Spinner } from 'native-base';


export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <Container>
                <ImageBackground source={require('../assets/img/backgorund.jpg')} style={styles.container}>
                    <Content contentContainerStyle={styles.content}>
                        <Text style={styles.bingo1}>Cinema</Text>
                        <Button rounded style={styles.btn} onPress={() => this.props.navigation.push('Home')}>
                            <Text style={styles.txt} >Empezar</Text>
                        </Button>
                    </Content>
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
    bingo1: {
        flex: 1,
        width: '100%' ,
        marginTop: '21%',
        fontSize: 60,
        marginLeft: '24%',
        color: '#EFFBF8',
    },
    btn: {
        marginTop: '15%',
        marginLeft: '25%',
        backgroundColor: '#214588bd',
        width: '50%',
        justifyContent: 'center',
    },
    txt: {
        color: 'white',
        fontSize: 15,
    },
    textoBlanco: {
        color: '#ffffff'
    }
});
