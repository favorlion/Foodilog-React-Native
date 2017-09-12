//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Navigator,AsyncStorage, ListView, TouchableOpacity } from 'react-native';
import API from '../service/API'
import FeedRow from '../cell/FeedRow'
import RestaurantCell from '../cell/RestaurantCell'
import DishCell from '../cell/DishCell'
const{width, height} = Dimensions.get('window')

var log = true;
var restaurant = false;
var dish = false;
var favoriteList = [];
var restaurantList = [];
var dishList = [];
var REQUEST_URL = ''

// create a component
class MyFavorites extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            log: true,
            restaurant: false,
            dish: false,
            dataSource: ds.cloneWithRows(favoriteList)
        }
    }
    componentWillMount() {
        this.getUserFavourateList()
    }
    getUserFavourateList(){
        favoriteList = [];
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(favoriteList)
        })
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            if(this.state.log == true){
                REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.FAVOURATE_URL + 'flog/me?token=' + value
            }
            if(this.state.restaurant == true){
                REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.FAVOURATE_URL + 'restaurant/me?token=' + value
            }
            if(this.state.dish == true){
                REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.FAVOURATE_URL + 'dish/me?token=' + value
            }
            fetch(REQUEST_URL, {
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
                    if(this.state.log == true){
                        favoriteList = responseData.flogs
                    }
                    if(this.state.restaurant == true){
                        favoriteList = responseData.restaurants
                    }
                    if(this.state.dish == true){
                        favoriteList = responseData.dishs
                    }
                    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
                    this.setState({
                        dataSource:ds.cloneWithRows(favoriteList)
                    });
                }else{
                    alert('No result')
                }
            })
            .catch((e) => {
                console.log(e)
            })
        })
    }

    _onPressBack = () => {
        this.props.navigator.pop();
    }
    _onPressLog = () => {
        this.getUserFavourateList()
        this.setState({
            log:true,
            restaurant:false,
            dish:false,
        })
    }
    _onPressRestaurant = () => {
        this.getUserFavourateList()
        this.setState({
            restaurant : true,
            log : false,
            dish : false,
        })
    }
    _onPressDish = () => {
        this.getUserFavourateList()
        this.setState({
            dish : true,
            restaurant : false,
            log : false,
        })
    }

    tableView() {
        if(this.state.log == true){
            return(
                <ListView
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <FeedRow rowdata = {data} navigator = {this.props.navigator} />}
                    enableEmptySections = {true}
               />
            );
        }
        if(this.state.restaurant == true){
            return(
                <ListView 
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <RestaurantCell rowdata = {data} navigator = {this.props.navigator} />}
                    enableEmptySections = {true}
                />
            );
        }
        if(this.state.dish == true){
            return(
                <ListView 
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <DishCell rowdata = {data} navigator = {this.props.navigator} />}
                    enableEmptySections = {true}
                />
            );
        }
    }

    render() {
        var log = this.state.log;
        var restaurant = this.state.restaurant;
        var dish = this.state.dish;
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style = {{color: 'white', fontSize:14, fontWeight:'bold'}}>My Favorites</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                
                <View style = {styles.tabview} >
                    <TouchableOpacity onPress = {this._onPressLog} style = {styles.logButton}>
                        <Text style = {log == true?{color:'#652D6C', fontSize:14}:{color:'#AAAAAA', fontSize:14}}>Log</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = {this._onPressRestaurant} style = {styles.restaurantButton}>
                        <Text style = {restaurant == true?{color:'#652D6C', fontSize:14}:{color:'#AAAAAA', fontSize:14}}>Restaurant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress = {this._onPressDish} style = {styles.dishButton}>
                        <Text style = {dish == true?{color:'#652D6C', fontSize:14}:{color:'#AAAAAA', fontSize:14}}>Dish</Text>
                    </TouchableOpacity>
                </View>
                {this.tableView()}
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
        backgroundColor:'#652D6C',
        width: width,
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row'
    },
    backButton:{
        position:'absolute',
        left: 10,
        width: 40,
        height: 40,
    },
    backImage:{
        width: 16,
        height: 16,
        marginTop:12,
        resizeMode: 'contain',   
    },
    tabview:{
        width: width,
        height: 35,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        flexDirection:'row',
    },
    logButton:{
        width: width/3,
        height:30,
        alignItems:'center',
        justifyContent:'center',
    },
    restaurantButton:{
        width: width/3,
        height:30,
        alignItems:'center',
        justifyContent:'center',
    },
    dishButton:{
        width: width/3,
        height:30,
        alignItems:'center',
        justifyContent:'center',
    }
});

//make this component available to the app
export default MyFavorites;
