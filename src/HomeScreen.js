import React, {Component} from 'react';
import {
    ScrollView,
    View,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import {WeatherApiKey, cities} from "../app.json"; //az api kulcs és a városok beolvasása json fájlból
import Line from './Line'

// ez a komponens tartalmazza a listát és a szűrőt
export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            CityList:[],
            text: "",
        };
    }

    // megjeleníti az összes szűrésnek megfelelő várost (kezdetben az összeset)
    listSelected(){
        return this.state.CityList.map(el => {
            let name = el.name;

            if(name.slice(0, this.state.text.length).toLowerCase() === this.state.text.toLowerCase()){
                return (
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Details',{ data: el })}>
                        <Line desc={el.name} value={`${el.temp} C°`}/>
                    </TouchableOpacity>);
            }
        });
    }

    componentDidMount(){
        cities.forEach( el => this.getCityData(el));
    }

    // adatok fetcehlése egyesével
    getCityData(city) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WeatherApiKey}&lang=hu`)
            .then(response => response.json())
            .then(responseJson => {
                const json ={
                    name : responseJson.name,
                    weatherDescription: responseJson.weather[0].description,
                    temp : Math.round(responseJson.main.temp),
                    tempMin : Math.round(responseJson.main.temp_min),
                    tempMax : Math.round(responseJson.main.temp_max),
                    pressure : responseJson.main.pressure,
                    humidity : responseJson.main.humidity,
                    sunrise : responseJson.sys.sunrise,
                    sunset : responseJson.sys.sunset
                };
                this.setState({CityList: [...this.state.CityList, json ]});
            })
            .catch(error => {
                console.error(error);
            });
    }

    render(){
        return (
            <View>
                <View>
                    <TextInput // Szűrés, kezdetben üres
                                style={{height: 40, margin:40, marginBottom:20, borderColor: 'gray', borderWidth: 2, paddingLeft:10,borderRadius: 10}}
                               onChangeText={(text) => {this.setState({text:text})}}
                               placeholder={"Szűrés"}
                               value={this.state.text}/>
                </View>
                <ScrollView // list a szűrt városkból
                    style={{ margin:20, padding:10, height:Dimensions.get('window').height-210}}>
                    {this.listSelected()}
                </ScrollView>
                <View style={{height:40, backgroundColor:'#fff'}}/>
            </View>
        );}
};
