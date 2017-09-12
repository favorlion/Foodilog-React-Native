//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Navigator, TouchableOpacity } from 'react-native';
import API from '../service/API'
import FLFaceView from '../cell/FLFaceView'
import LogDish from '../feed/FeedDetail'

const{width, height} = Dimensions.get('window')
var iconURL = ''
// create a component
class FeedDishCell extends Component {
    _onPressDishCell = () => {
        this.props.navigator.push({
            name:'logdish',
            dishInfo: this.props.rowdata,
            userName: this.props.userName,
        })
    }

    photo(){
        if(this.props.rowdata.photoId){
            if(this.props.rowdata.photoId == null && this.props.rowdata.photoId == ''){
                return(
                    <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                );
            }else{
                return(
                    <Image 
                        source = {{uri:iconURL}} 
                        style = {styles.photo}
                        defaultSource = {require('../images/dish_default.png')}/>
                );
            }
        }else{
            return(
                    <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                );
        }
        
    }

    render() {
        iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.photoId + 'S'
        return (
            <TouchableOpacity onPress = {this._onPressDishCell}>
                <View style={styles.container}>
                    {this.photo()}

                    <View style = {{flexDirection:'column',}}>
                        <Text style = {styles.name}>{this.props.rowdata.name}</Text>
                        <Text style = {styles.description}>{this.props.rowdata.comment}</Text>
                    </View>
                    <View style = {styles.emoji}>
                        <FLFaceView score = {this.props.rowdata.score} type = 'small'/>
                    </View>
                    <View style = {styles.line}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection:'row',
        width: width,
        padding: 10,
    },
    image:{
        width:40,
        height: 40,
        marginLeft: 7,
    },
    name:{
        color:'black', 
        fontSize:16, 
        backgroundColor:'transparent',
        marginLeft: 7,
        paddingRight: 27,
    },
    description:{
        color:'#7F7F7F', 
        fontSize: 13,
        backgroundColor:'transparent',
        marginLeft: 7,
        paddingRight: 27,
    },
    emoji:{
        width: 22,
        height: 22,
        position: 'absolute',
        top: 10,
        right: 10,
    },
    line:{
        width: width,
        height:1,
        backgroundColor:'#EFEFF4',
        position:'absolute',
        left:0,
        bottom: 0,
    },
    photo:{
        width:40, 
        height:40, 
        marginTop:3, 
        marginLeft:8
    }
});

//make this component available to the app
export default FeedDishCell;
