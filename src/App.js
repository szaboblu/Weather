import React, {Component} from 'react';
import HomeScreen from './HomeScreen';
import Details from './Details'
import {createAppContainer } from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";

export default class WeatherApp extends Component {
    render() {
        return <AppContainer />;
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    Details: {
        screen: Details
    }
});

const AppContainer = createAppContainer(AppNavigator);

