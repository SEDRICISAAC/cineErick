import  { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Inicar from '../screens/inicio';
import Home from '../screens/home';
import Detalle from '../screens/datalle';


const screens = {
    Iniciar: {
        screen: Inicar,
        navigationOptions: {
            headerShown: false 
        },
    },
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false  
        },
    },
    Detalle: {
        screen: Detalle,
        navigationOptions: {
            headerShown: false  
        },
    },
}


const LoginStack = createStackNavigator(screens);

export default createAppContainer(LoginStack);

