//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, Dimensions, Image, TouchableOpacity, AsyncStorage, ScrollView, ListView, } from 'react-native';
import FLFaceView from '../cell/FLFaceView'
import FeedRow from '../cell/FeedRow'
import API from '../service/API'

var feedLogs = [{'name':1},{'name':1},{'name':1}];
const {width, height} = Dimensions.get('window')
var dishID = ''
var isFavorite = false
var dish = []

// create a component
class DishDetail extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(feedLogs),
            isFavorite: false,
            dish:[],
        }
    }
    componentWillMount() {
       this.getData()
    }
    getData(){
        dishID = this.props.dishInfo.dishId 
        
        //getDishDetail
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL1 = API.SERVER_URL + API.SERVICE_PORT + API.GET_DISH_URL + dishID + '?token=' +value
            fetch(REQUEST_URL1, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                isFavorite = responseData.isFavourate
                dish = responseData.dish
                dish.favourate = isFavorite
                dish.isOnline ='true'
                this.setState({
                    dish: dish,
                })
                console.log(dish)
            })
            .catch((e) => {
                console.log(e)
            })
        })

        feedLogs =[];
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(feedLogs)
        });
        //getDishLogList
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL2 = API.SERVER_URL + API.SERVICE_PORT + API.GET_DISH_LOGLIST_URL + dishID + '?token=' + value + '?limit=100'
            fetch(REQUEST_URL2, {
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
                    feedLogs = responseData.logs
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(feedLogs)
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
        })

        //getPhotos

    }
    faceView(){
        if(this.state.dish.logCount > 0){
            return(
            <FLFaceView score = {this.state.dish.score} type = 'big'/>
        )
        }else{
            return null
        }
    }

    _onPressBack = () => {
        this.props.navigator.pop();
    }
    _onPressDishCell = () => {
        
    }
    _onPressAddLog = () => {
        this.props.navigator.push({
            name:'startnewlog'
        })
    }

    render() {
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.state.dish.photoId + 'S'
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.dish.name}</Text>  
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1,paddingBottom: 57}}>
                    <ScrollView>
                        <View style = {styles.headview}>
                            <TouchableOpacity onPress = {this._onPressDishCell} style = {styles.dishbutton}>
                                <Image 
                                    source = {{uri:iconURL}} 
                                    style = {styles.bgImg}
                                    defaultSource = {require('../images/dish_default.png')}/>
                                <View style = {{backgroundColor:'black', opacity:0.5, position:'absolute', width: width, height:120}}></View>
                                <View style = {styles.emoji}>
                                    {this.faceView()}
                                </View>
                            </TouchableOpacity>     
                        </View>
                        
                        <TouchableOpacity style = {{padding:8, backgroundColor:'white'}}>
                            <View>
                                <View style = {{flexDirection:'row', alignItems:'center'}}>
                                    <Image source = {require('../images/type_dot.png')} style = {{width:5, height:5}}/>
                                    <Text style ={styles.txt}>{this.state.dish.restaurantName}</Text>
                                </View>
                                <View style = {{flexDirection:'row', alignItems:'center', marginTop: 5}}>
                                    <Image source = {require('../images/type_dot.png')} style = {{width:5, height:5}}/>
                                    <Text style ={styles.txt}>{this.state.dish.category}</Text>
                                </View>
                                <View style = {{flexDirection:'row', alignItems:'center', marginTop: 5}}>
                                    <Image source = {require('../images/type_dot.png')} style = {{width:5, height:5}}/>
                                    <Text style ={styles.txt}>${this.state.dish.price}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                        <View style = {styles.FeedView}>
                            <Text style = {{color:'#555555', marginLeft: 10}}>LOGS</Text>
                            <ListView
                                dataSource = {this.state.dataSource}
                                renderRow = {(data) => <FeedRow rowdata = {data} navigator = {this.props.navigator}/>}
                                enableEmptySections = {true}/>
                        </View>

                    </ScrollView>

                    <View style = {styles.menuView}>
                        <TouchableOpacity onPress = {this._onPressAddLog} >
                            <View style = {styles.buttonView}>
                                <Text style = {{color:'#652D6C', fontSize:14}}>Add to log</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.favoriteButton}>
                            <Image source = {this.state.dish.favourate == true? require('../images/star_selected.png'):require('../images/star_unselected.png')} style = {styles.favoriteButton1}/>
                        </TouchableOpacity>
                    </View>
                </View>
                

            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EFEFF4',
    },
    navview:{
        backgroundColor: '#652D6C',
        width: width,
        height: 50, 
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
    headview:{
        flexDirection:'row',
        width: width,
        height: 120,
    },
    bgImg:{
        position:'absolute',
        width: width,
        height: 120,
        top: 0,
        left: 0,
        resizeMode: 'cover',
    },
    dishbutton:{
        width: width,
        height: 120,
    },
    emoji:{
        width: 30,
        height:  30,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    txt:{
        color:'#555555',
        fontSize: 13,
        marginLeft: 7,
    },
    FeedView:{
        width: width,
        marginTop: 20,
    },
    menuView:{
        alignItems:'center',  
        justifyContent:'center', 
        width:width, 
        height:50, 
        position:'absolute', 
        bottom:0, 
        flexDirection:'row', 
    },
    buttonView:{
        borderWidth:1, 
        backgroundColor:'white', 
        borderColor:'lightgray',
        borderRadius: 5,
        width: width*2/3, 
        height:36,
        justifyContent:'center',
        alignItems:'center',
    },
    favoriteButton:{
        width: 28,
        height: 28,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    favoriteButton1:{
        width: 28,
        height: 28,
    },

});

//make this component available to the app
export default DishDetail;
