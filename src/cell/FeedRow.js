import React, { Component } from 'react'
import { StyleSheet, Platform, Text, Dimensions, View, Image, TouchableHighlight, TouchableOpacity,TouchableWithoutFeedback ,AsyncStorage, Navigator} from 'react-native'
import FLFaceView from '../cell/FLFaceView'
import API from '../service/API'
var TimeAgo = require('react-native-timeago')


const ScreenHeight = Dimensions.get('window').height
const ScreenWidth = Dimensions.get('window').width
const{width, heigth} = Dimensions.get('window')
export default class FeedRow extends Component { 
    constructor(props){
        super(props)
        this.state = {
            slider1: '',
        }
    }

    _onPressFeedClicked = () => {
        this.props.navigator.push({
            name:'feed_detail',
            logInfo: this.props.rowdata,
            fid: this.props.rowdata.fid,
            uid: this.props.rowdata.uid,
        });
    }

    _onPressGotoUserProfile = () =>{
        this.props.navigator.push({
            name:'userprofile',
            uid: this.props.rowdata.uid,
        })
    }

    render(){
        var dishsName = ''
        if(Object.keys(this.props.rowdata.dishs).length == 0){
            dishsName = 'No dish'
        }else if (Object.keys(this.props.rowdata.dishs).length == 1){
            dishsName = '1 dish'
        }else {
            dishsName = Object.keys(this.props.rowdata.dishs).length + ' dishes'
        }

        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.uid + 'S'

        var utcSeconds = this.props.rowdata.timestamp;
        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(utcSeconds);
        
        return (
           <TouchableHighlight onPress = {this._onPressFeedClicked}>
                <View style = {styles.wrapper}> 
                    <Image 
                        source = {{uri:this.props.rowdata.background}} 
                        style = {styles.backgroundimage} 
                        defaultSource = {require('../images/head_image_default.png')}/>
                    <View style = {{backgroundColor:'black', opacity:0.5, position:'absolute', width: ScreenWidth, height:120, top:2}}>
                    </View>
                    <View style = {styles.cell1}>
                        <TouchableWithoutFeedback onPress = {this._onPressGotoUserProfile} style = {styles.userPhotoButton}>
                            <Image source = {{uri:iconURL}} style = {styles.userphoto} />
                        </TouchableWithoutFeedback>
                        <Text style = {styles.name}>{this.props.rowdata.userName}</Text>
                        <View style = {styles.emoji}>
                            <FLFaceView score = {this.props.rowdata.score} type = 'big'/>
                        </View>
                    </View>
                    <Text style = {styles.description}>{this.props.rowdata.restaurantName}</Text>
                    <Text style = {styles.dish}>{dishsName}</Text>
                    <Text style = {styles.time}><TimeAgo time = {d.toDateString()}/></Text>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'white',
        flexDirection: 'column',
        width:ScreenWidth,
        height: 122, 
        padding: 5,
    },
    backgroundimage:{
        flex: 1,
        position:'absolute',
        width: ScreenWidth,
        marginTop:2,
        height: 120,
        resizeMode: 'cover',
    },
    cell1:{
        flex:1,
        flexDirection: 'row',
        width:ScreenWidth,
    },
    userPhotoButton:{
        width: 55,
        height: 55,
        borderRadius: 30,
        marginTop: 10,
        marginLeft: 8,
    },
    userphoto:{
        width: 55,
        height: 55,
        borderRadius: 30,
    },
    name:{
        marginTop: 27,
        marginLeft: 8,
        fontSize:17,
        color: 'white',
        backgroundColor:'transparent',
    },
    emoji:{
        position:'absolute',
        width: 30,
        height: 30,
        right: 10,
        top: 6,
    },
    description:{
        color:'white',
        fontSize: 17,
        marginLeft:10,
        backgroundColor:'transparent',
    },
    dish:{
        color: 'white',
        fontSize: 15,
        marginLeft: 10,
        backgroundColor:'transparent',
    },
    time:{
        position:'absolute',
        bottom: 6,
        right: 10,
        color:'white',
        fontSize:14,
        backgroundColor:'transparent',
    },
});
