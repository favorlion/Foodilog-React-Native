//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Dimensions, Navigator, ScrollView, TouchableOpacity, Slider, AsyncStorage, ListView } from 'react-native';
import API from '../service/API'
import FLFaceView from '../cell/FLFaceView'
import MustTryDishCell from '../cell/MustTryDishCell'
import FeedRow from '../cell/FeedRow'
import NewNav from '../new/NewNav'
import RestaurantInfo from '../Logic/Model/RestaurantInfo'
import FLDish from '../Logic/Model/FLDish'

const {width, height} = Dimensions.get('window');

var priceTier = ''

var mustTryDataSource = [];
var logDataSource = [];
// create a component
export default class RestaurantDetail extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            slider2: 0.7,
            slider3: 0.7,
            slider4: 0.7,
            RestaurantInfo: RestaurantInfo,
            mustTryDataSource: ds.cloneWithRows(mustTryDataSource),
            logDataSource: ds.cloneWithRows(logDataSource),
        }
    }

    componentWillMount() {
        this.getData()
    }
    getData(){
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            // func getLogCommentList(logInfo.id)
            var REQUEST_URL1 = API.SERVER_URL + API.SERVICE_PORT + API.GET_RESTAURANT_URL + this.props.restaurantId + '?token=' +value
            fetch(REQUEST_URL1, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                RestaurantInfo.favourate = responseData.isFavourate
                if(responseData.ok == true){
                    RestaurantInfo.star = responseData.restaurant.star
                    RestaurantInfo.type = responseData.restaurant.type
                    RestaurantInfo.open = responseData.restaurant.open
                    RestaurantInfo.tel = responseData.restaurant.tel
                    RestaurantInfo.priceTier = responseData.restaurant.priceTier
                    RestaurantInfo.address = responseData.restaurant.location.formattedAddress
                    RestaurantInfo.lat = responseData.restaurant.location.lat
                    RestaurantInfo.lng = responseData.restaurant.location.lng
                    RestaurantInfo.logCount = responseData.restaurant.logCount
                    RestaurantInfo.dishCount = responseData.restaurant.dishCount
                    RestaurantInfo.photoUrl = responseData.restaurant.photoUrl
                    RestaurantInfo.rating = responseData.restaurant.rating
                    RestaurantInfo.name = responseData.restaurant.name
                    RestaurantInfo.id = responseData.restaurant.id
                    RestaurantInfo.distance = responseData.restaurant.location.distance
                    if(responseData.restaurant.hours){
                        RestaurantInfo.isOpen = responseData.restaurant.isOpen
                    }

                    this.setState({
                        // RestaurantDetail:RestaurantDetail,
                        RestaurantInfo:RestaurantInfo
                    })

                }
            })
            .catch((e) =>{
                console.log(e)
            })
        })

        //getMustTry
        AsyncStorage.getItem('FoodilogToken').then((value) =>{
            mustTryDataSource = []
            var REQUEST_MUSTTRYURL =  API.SERVER_URL + API.SERVICE_PORT + API.MUST_TRY_URL + this.props.restaurantId + '?token=' +value
            fetch(REQUEST_MUSTTRYURL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.ok == true){
                    if(responseData.dishs.length > 2){
                        mustTryDataSource.push(responseData.dishs[0])
                        mustTryDataSource.push(responseData.dishs[1])
                        this.setState({
                            mustTryDataSource: this.state.mustTryDataSource.cloneWithRows(mustTryDataSource)
                        })
                    }else{
                        this.setState({
                            mustTryDataSource: this.state.mustTryDataSource.cloneWithRows(responseData.dishs)
                        })
                    }
                }
            })
            .catch((e) =>{
                console.log(e)
            })
        })

        //getPhotos
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            logDataSource = []
            var REQUEST_LOGSURL = API.SERVER_URL + API.SERVICE_PORT + API.GET_RESTAURANT_LOGLIST_URL + this.props.restaurantId + '?token=' + value + '&limit=2'
            fetch(REQUEST_LOGSURL,{
                method: 'GET',
                headers: {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.ok == true){
                    this.setState({
                        logDataSource: this.state.logDataSource.cloneWithRows(responseData.logs)
                    })
                }
            })
            .catch((e) =>{
                console.log(e)
            })
        })
    }

    _onPressBack = () => {
        this.props.navigator.pop()
    }
    _onPressMoreDish = () => {
        this.props.navigator.push({
            name: 'musttryview',
            rid:this.props.restaurantId,
        })
    }
    _onPressNewLog = () =>{
        this.props.navigator.push({
            name: "startnewlog"
        })
    } 
    _onPressMenu = () => {
        this.props.navigator.push({
            name:"menu",
            rid: this.state.RestaurantInfo.id,
            rname: this.state.RestaurantInfo.name,
        })
    }
    _onPressMoreLogs = () => {
        this.props.navigator.push({
            name:'RestaurantLogs',
            rid: this.props.restaurantId,
        })
    }
    _onpressLocation = () => {
        this.props.navigator.push({
            name: 'map',
            rinfo: this.state.RestaurantInfo,
        })
    }

    show_type_priceTier(){
        switch(this.state.RestaurantInfo.priceTier){
            case 2:
                return(
                    <Text style = {styles.typeText}>{this.state.RestaurantInfo.type + ' ($$)'}</Text>
                );
            case 3:
                return(
                    <Text style = {styles.typeText}>{this.state.RestaurantInfo.type + ' ($$$)'}</Text>
                );
            case 4:
                return (
                    <Text style = {styles.typeText}>{this.state.RestaurantInfo.type + ' ($$$$)'}</Text>
                );
            default:
                return(
                    <Text style = {styles.typeText}>{this.state.RestaurantInfo.type + ' ($)'}</Text>
                );
        }
    }

    show_name_distance(){
        var feet = this.state.RestaurantInfo.distance
        var feetStr = (feet/5280).toFixed(1) + ' mi'
        var location = this.state.RestaurantInfo.coordinate
        if(feet < 528){
            return(
                <Text style = {styles.nameText}>{this.state.RestaurantInfo.address + ' (Distance <0.1 mi'})</Text>
            );
        }else{
            return(
                <Text style = {styles.nameText}>{this.state.RestaurantInfo.address} (Distance {feetStr})</Text>
            );
        }
    }

    show_open(){
        var openStr = ''
        if(this.state.RestaurantInfo.open){
            openStr = 'Hours: ' + this.state.RestaurantInfo.open
        }else{
            if(this.state.RestaurantInfo.isOpen == true){
                openStr = 'Open'
            }else{
                openStr = 'Closed'
            }
        }
        return(
            <Text style = {styles.nameText}>{openStr}</Text>
        );
    }

    show_tel(){
        var telStr = ''
        if(this.state.RestaurantInfo.tel){
            telStr = 'Tel: ' + this.state.RestaurantInfo.tel
        }else{
            telStr = 'Tel: Unknown'
        }
        return(
            <Text style = {styles.nameText}>{telStr}</Text>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.RestaurantInfo.name}</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style = {{flex:1, flexDirection:'column', paddingBottom:80}}>
                        <View style = {styles.headview}>
                            <Image
                                source = {{uri:this.state.RestaurantInfo.photoUrl}} 
                                style = {styles.bgImg}
                                defaultSource = {require('../images/restaurant_default.png')}/>
                            <View style = {{backgroundColor:'black', opacity:0.5, position:'absolute', width: width, height:120}} />
                            <View style = {styles.emoji}>
                                <FLFaceView score = {this.state.RestaurantInfo.rating} type = 'big'/>
                            </View>
                        </View>
                        <TouchableOpacity onPress = {this._onpressLocation}> 
                            <View style = {styles.overallview}>
                                <Image source = {require('../images/map_bg.png')} style = {{width:width, height:120, position:'absolute', resizeMode:'stretch'}}/>
                                <View style = {{ height:30, flexDirection:'row', alignItems:'center', marginTop:5}}>
                                    <Image source = {require('../images/distance_dot.png')} style = {{width:7, height:7, marginLeft:10}}/>
                                    {this.show_name_distance()}
                                    
                                </View>
                                <View style = {{height:30, flexDirection:'row', alignItems:'center'}}>
                                    <Image source = {require('../images/price_dot.png')} style = {{width:7, height:7, marginLeft:10}}/>
                                    {this.show_type_priceTier()}
                                </View>
                                <View style = {{height:30, flexDirection:'row', alignItems:'center'}}>
                                    <Image source = {require('../images/type_dot.png')} style = {{width:7, height:7, marginLeft:10}}/>
                                    {this.show_open()}
                                </View>
                                <View style = {{ height:30, flexDirection:'row', alignItems:'center'}}>
                                    <Image source = {require('../images/type_dot.png')} style = {{width:7, height:7, marginLeft:10}}/>
                                    {this.show_tel()}
                                </View>
                                <Image source = {require('../images/map_annotation.png')} style = {styles.locationImg}/>
                            </View>
                        </TouchableOpacity>

                        <View style = {{padding:15}}>
                            <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 5}}>
                                <Text style = {{color:'#555555', fontSize:15}}>Ambiance :</Text>
                                {/*<Slider
                                    value={this.state.slider2}
                                    onValueChange={(value) => this.setState({slider2:value})} 
                                    style = {{width:width*2/3+10, position:'absolute', right:55 }}
                                    maximumTrackTintColor = {'#652D6C'}/>*/}
                                <Text style = {styles.score}>75</Text>
                                {/*<View style = {styles.sliderImage}>
                                    <FLFaceView score = {this.state.slider2*100} type = 'big'/>
                                </View>*/}
                            </View>

                            <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 15}}>
                                <Text style = {{color:'#555555', fontSize:15}}>Service :</Text>
                                {/*<Slider
                                    value={this.state.slider3}
                                    onValueChange={(value) => this.setState({slider3: value})} 
                                    style = {{width:width*2/3+10, position:'absolute', right:55 }}
                                    maximumTrackTintColor = {'#652D6C'}/>*/}
                                <Text style = {styles.score}>75</Text>
                                {/*<View style = {styles.sliderImage}>
                                    <FLFaceView score = {this.state.slider3*100} type = 'big'/>
                                </View>*/}
                            </View>

                            <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 15}}>
                                <Text style = {{color:'#555555', fontSize:15}}>Value :</Text>
                                {/*<Slider
                                    value={this.state.slider4}
                                    onValueChange={(value) => this.setState({slider4:value})} 
                                    style = {{width:width*2/3+10, position:'absolute', right:55 }}
                                    maximumTrackTintColor = {'#652D6C'}/>*/}
                                <Text style = {styles.score}>75</Text>
                                {/*<View style = {styles.sliderImage}>
                                    <FLFaceView score = {this.state.slider4*100} type = 'big'/>
                                </View>*/}
                            </View>
                        </View>

                        <View style = {{marginTop:20}} >
                            <Text style = {{color:'#555555', backgroundColor:'transparent', fontSize:15, marginLeft:14}}> MUST TRY </Text>
                            <ListView
                                dataSource = {this.state.mustTryDataSource}
                                renderRow = {(data) => <MustTryDishCell rowdata = {data} navigator = {this.props.navigator}/>}
                                enableEmptySections = {true}/>
                            <TouchableOpacity onPress = {this._onPressMoreDish} style = {{marginTop:10}}>
                                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginRight: 10}}>
                                    <Text style = {{color:'#AAAAAA', backgroundColor:'transparent', fontSize:13, }}>More dishes</Text>
                                    <Image source = {require('../images/button_left_arrow.png')} style = {styles.arrow}/>
                                </View>
                            </TouchableOpacity>                   
                            
                            <Text style = {{color:'#555555', backgroundColor:'transparent', fontSize:15, marginLeft:14, marginTop:20}}> LOGS </Text>
                            <ListView
                                dataSource = {this.state.logDataSource}
                                renderRow = {(data) => <FeedRow rowdata = {data} navigator = {this.props.navigator}/>}
                                enableEmptySections = {true}/>
                            <TouchableOpacity onPress = {this._onPressMoreLogs} style = {{marginTop:10}}>
                                <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginRight: 10}}>
                                    <Text style = {{color:'#AAAAAA', backgroundColor:'transparent', fontSize:13, }}>More Logs</Text>
                                    <Image source = {require('../images/button_left_arrow.png')} style = {styles.arrow}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>

                <View style = {styles.toolbar}>
                    <TouchableOpacity  style = {styles.button} onPress = {this._onPressNewLog}>
                         <Text style = {styles.textButton}>Start a new log</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {styles.button} onPress = {this._onPressMenu}>
                         <Text style = {styles.textButton}>Menu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {styles.starbutton}>
                         <Image source = {require('../images/star_unselected.png')} style = {{width:22, height:22}}/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#EFEFF4',
    },
    navview:{
        backgroundColor: '#652D6C',
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: width,
        height: 120,
    },
    bgImg:{
        position:'absolute',
        width: width,
        height: 120,
        top:0,
        left:0,
        resizeMode: 'cover',
    },
    emoji:{
        width: 30,
        height: 30,
        position: 'absolute',
        top: 8,
        right: 10,
    },
    overallview:{
        width: width,
        height: 120,
        flexDirection:'column',
    },
    locationImg:{
        width:20,
        height: 22,
        resizeMode: 'contain',
        position:'absolute',
        top: 50,
        right: 40,
    },
    toolbar:{
        width:width,
        height: 45,
        backgroundColor:'#EFEFF4',
        position:'absolute',
        bottom:0,
        left:0,
        alignItems:'center',
        flexDirection:'row',
    },
    button:{
        width: (width - 70)/2,
        height: 30,
        marginLeft: 10,
        marginTop: 2,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton:{
        color:'#652D6C',
        fontSize: 13,
    },
    starbutton:{
        width:22,
        height: 22,
        marginLeft:12,
    },
    arrow:{
        width: 12,
        height: 12,
        resizeMode: 'contain',
        marginLeft: 5,
    },
    typeText:{
        color:'gray', 
        fontSize:13, 
        marginLeft:8, 
        backgroundColor:'transparent'
    },
    nameText:{
        color:'gray', 
        fontSize:13, 
        marginLeft:8, 
        backgroundColor:'transparent', 
        width: width - 40,
    },
    sliderImage:{
        width:30, 
        height:30, 
        position:'absolute', 
        right:25
    },
    score:{
        color: '#555555',
        fontSize: 15,
        position:'absolute',
        left: 100,
    },
});

//make this component available to the app

