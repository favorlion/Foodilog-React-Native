//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Navigator, TouchableOpacity, ListView, AsyncStorage, Route } from 'react-native';
import ChooseRestaurantCell from '../cell/ChooseRestaurantCell'
import Search from 'react-native-search-box';
import Spinner from 'react-native-loading-spinner-overlay'
import API from '../service/API'

const {width, height} = Dimensions.get('window')
const rowHeight = 40;
var restaurantList = []

// create a component
class RestaurantList extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            visible: false ,
            dataSource: ds.cloneWithRows(restaurantList),
            searchText:''
        };
    }

    _onPressBack = () => {
        this.props.navigator.pop();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({visible:false})
    }
    componentDidMount() {
        this.setState({visible:false})
        this.getsearchRestaurantsCall();
    }

    getsearchRestaurantsCall(){
        this.setState({dataSource:this.state.dataSource.cloneWithRows([])})
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })
                console.log('lat1 -->', position.coords.latitude)
                console.log('lon1 -->', position.coords.longitude)
                AsyncStorage.getItem('FoodilogToken').then((value) => {
                    var REQUEST_URL =  API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?ll=' + position.coords.latitude + ',' + position.coords.longitude + '&token=' + value;
                    // var REQUEST_URL =  API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?ll=' + '22.2766' + ',' + '114.174' + '&token=' + value;
                    fetch(REQUEST_URL, {
                        method: 'GET',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((responseData) => {
                        console.log('restaurant list')
                        console.log(responseData)
                        if(responseData.ok == true){
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseData.restaurants)
                            })
                        }
                    })
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
        console.log('lat -->', this.state.latitude)
        console.log('lon -->', this.state.longitude)
    }

     _onPressSearch(){
        srestaurants = [];
        restaurantsList = [];
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(userList),
        })

        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                })
                 AsyncStorage.getItem('FoodilogToken').then((value)=>{ 
                    var REQUEST_URL1 =  API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?ll=' + position.coords.latitude + ',' + position.coords.longitude + '&query='+ this.state.searchText + '&token=' + value;
                    console.log(REQUEST_URL1)
                    fetch(REQUEST_URL1, {
                        method: 'GET',
                        headers: { 
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                    })
                    .then((response) => response.json())
                    .then((responseData) => { 
                        console.log(responseData)
                        if(responseData.ok == true){
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(responseData.restaurants)
                            })
                        }
                    }).catch((error) =>{
                        console.log(error)
                    })
                })
            },
            (error) => this.setState({error: error.message}),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
    }
    _onPressRestaurant(rowdata){
        console.log('detail_restaurantList')
        console.log(rowdata)
        AsyncStorage.setItem('isRestaurantInfo', 'true')
        AsyncStorage.setItem('RestaurantName', rowdata.name)
        AsyncStorage.setItem('RestaurantID', rowdata.id)
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Restaurant</Text>  
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1}}>
                    <Spinner
                        visible = {this.state.visible} 
                        textContent = {'Searching nearby restaurnat...'} 
                        textStyle = {{color:'#888888', fontSize: 20}}/>
                    <Search
                        ref = '  Restaurant Name  '
                        placeholder = '  Restaurant Name  '
                        titleCancelColor = '#652D6C'
                        backgroundColor = 'lightgray'
                        cancelTitle = 'Cancel'
                        onChangeText = {(text) => {
                            this.setState({searchText : text})
                        }}
                        onSearch = {() => {
                            this._onPressSearch();
                        }}
                    />
                    
                    <ListView 
                        dataSource = {this.state.dataSource}
                        renderRow = {(data) => <ChooseRestaurantCell rowdata = {data} navigator = {this.props.navigator} clickedRestaurant = {this._onPressRestaurant.bind(this, data)} />}
                        enableEmptySections = {true}/>
                        
                </View>

                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navview:{
        backgroundColor: '#652D6C',
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    backImage:{
        width: 16,
        height: 16,
        marginTop:12,
        resizeMode: 'contain',   
    },
    backButton:{
        position:'absolute',
        left: 10,
        width: 40,
        height: 40,
    },
    storeImage:{
        width:20,
        height:20,
        marginTop: 10,
        marginLeft: 40,
        position:'absolute',
        right: 10,
        bottom: 2,
    },
});

//make this component available to the app
export default RestaurantList;
