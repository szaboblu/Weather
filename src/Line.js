import React, {Component} from 'react';
import {View, Text} from 'react-native';

// ez a komponens csak egy egyszerű listaelem, ami két bemenetet kap
export default class Line extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <View style={{marginBottom:20,flexDirection:'row', padding:10, justifyContent:'space-between', backgroundColor:'#dee', borderRadius:10}}>
                <Text>{this.props.desc}</Text>
                <Text>{this.props.value}</Text>
            </View>
        )
    }
};

