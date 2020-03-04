import React, {Component} from 'react';
import {View, Text} from 'react-native';

import Line from './Line';

// ez a komponens a részletes napi idõjárás képernyõ
export default class Details extends Component {
    constructor(props){
        super(props);
        this.state={
            data: this.props.navigation.state.params.data // csak a könnyebb átláthatóság kedvéért
        }
    }

    // Idő formázása
    timeFormatter(time){
        const t = new Date(time*1000);
        return `${t.getHours()}:${t.getMinutes()} `;
    }

    render() {
        return (
            <View style={{margin:20}}>

                <View // Név, aktuális hőmérséklet és időjárási viszony leírása
                    style={{alignItems:'center', marginBottom:20}}>
                    <Text style={{ fontSize:20, }}>
                        {this.state.data.name}
                    </Text>
                    <Text>{this.state.data.temp} C°</Text>
                    <Text>{this.state.data.weatherDescription}</Text>
                </View>

                <Line // További adatok
                    desc={'Minimum hőmérséklet'} value={`${this.state.data.tempMin} C°`}/>
                <Line desc={'Maximum hőmérséklet'} value={`${this.state.data.tempMax} C°`}/>
                <Line desc={'Légnyomás'} value={`${this.state.data.pressure} hPa`}/>
                <Line desc={'Páratartalom'} value={`${this.state.data.humidity}%`}/>
                <Line desc={'Napkelte'} value={this.timeFormatter(this.state.data.sunrise)}/>
                <Line desc={'Napnyugta'} value={this.timeFormatter(this.state.data.sunset)}/>

        </View>)
}
};
