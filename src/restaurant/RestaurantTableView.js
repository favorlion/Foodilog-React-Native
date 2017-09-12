//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView,  ListView, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, TouchableHighlight, Image, Navigator, AsyncStorage } from 'react-native';
import SearchRestaurantCell from '../cell/SearchRestaurantCell'
import RestaurantDetail from './RestaurantDetail'
import RestaurantInfo from '../Logic/Model/RestaurantInfo'
import RestaurantFilter from './RestaurantFilter'
import API from '../service/API'

const {width, height} = Dimensions.get('window');

var isLocationSearch = true

var resturantList = [];
var REQUEST_URL = ''
// create a component
class RestaurantTableView extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
        this.state = {
            dataSource:ds.cloneWithRows(resturantList),
            isLocationSearch: true,
            latitude: null,
            longitude: null,
            error: null,
            params: new RestaurantFilter(),

        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            search_param : nextProps.search_param
        })
        this.getsearchRestaurantsCall();
    }
    componentWillMount() {
        // this.getsearchRestaurantsCall();
    }
    getsearchRestaurantsCall(){
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })
                AsyncStorage.getItem('FoodilogToken').then((value) => {
                    if(this.state.search_param == ''){
                        REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?ll=' + position.coords.latitude + ',' + position.coords.longitude + '&rank=distance' + '&token=' + value;
                    }else{
                        REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?ll=' + position.coords.latitude + ',' + position.coords.longitude + '&token=' + value + this.state.search_param
                    }
                    
                    fetch(REQUEST_URL, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log('restaurant table view===')
                        console.log(responseData)
                        if(responseData.ok == true){
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseData.restaurants)
                            })
                            if(responseData.restaurants.length == 0){
                                alert('No result')
                            }
                        }
                    })
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }


    render() {
        return (
            <View style={styles.container}>
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <SearchRestaurantCell rowdata = {data} navigator = {this.props.navigator}/>}
                    renderFooter = {() => <View style = {{alignItems:'center', justifyContent:'center'}}><Text style = {{fontSize:13,color:'gray', marginTop:10}}>No more data...</Text></View>}
                    onEndReached = {() => <View style = {{height: 10, backgroundColor:'yellow'}}/>}
                    enableEmptySections = {true}  />
            </View>
        );
    }
}



// define your styles
const styles = StyleSheet.create({
    container:{
        flex:1,
    },
});

//make this component available to the app
export default RestaurantTableView;
