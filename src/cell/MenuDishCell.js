//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Navigator, TouchableOpacity, Search, ListView, ScrollView } from 'react-native';
import NLDishComment from '../new/NLDishComment'
import FLFaceView from './FLFaceView'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var photoId =  String
var description = String
var name = String

// create a component
class MenuDishCell extends Component {
    showRating(){
        if(this.props.rowdata.logCount > 0){
            return(
                <View styoe = {styles.emoji}>
                     <FLFaceView score = {this.props.rowdata.score} type = 'small'/>
                </View>
            );
        }else{
            null
        }
    }
    _onDishCell = () => {
        this.props.navigator.push({
            name:'NLDishComment',
            dishinfo:this.props.rowdata,
        })
    }

    photo(){
        if(this.props.rowdata.photoId){
            var dishURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.photoId + 'L'
            if(this.props.rowdata.photoId == null && this.props.rowdata.photoId == ''){
                return(
                    <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                );
            }else{ 
                return(
                    <Image 
                        source = {{uri:dishURL}} 
                        style = {styles.backgroundImage}
                        defaultSource = {require('../images/dish_default.png')}/>
                );
            }
        }else{
            return(
                    // <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                    null
                );
        }
    }

    render() {
        return (
            <TouchableOpacity onPress = {this._onDishCell}>
                <View style={styles.container}>
                    {this.photo()}
                    <View style = {styles.bgView}></View>
                    <Text style = {styles.name} numberOfLines = {1}>{this.props.rowdata.name}</Text>
                    <Text style = {styles.price}>${this.props.rowdata.price}</Text>
                    <Text style = {styles.description} numberOfLines = {1}>{this.props.rowdata.description}{this.props.rowdata.description}</Text>
                    <Text style = {styles.count}>
                        {this.props.rowdata.logCount == 0 || this.props.rowdata.logCount == null?
                            'Createt the 1st log!':
                            this.props.rowdata.logCount>1? this.props.rowdata.logCount + ' logs': 1 +' log'}
                            
                    </Text>
                    {this.showRating()}            

                </View>
            </TouchableOpacity>
            
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height:120,
        backgroundColor: 'white',
    },
    name:{
        color: 'white',
        fontSize: 20,
        marginTop: 5,
        marginLeft: 8
    },
    bgView:{
        width: width,
        height: 118,
        position:'absolute',
        backgroundColor:'black',
        opacity:0.5,
    },
    price:{
        color:'white',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 8
    },
    description:{
        color: 'white',
        fontSize: 15,
        marginTop: 5,
        marginLeft: 8,
        marginRight: 10,
    },
    count:{
        color: 'white',
        fontSize: 18,
        position:'absolute',
        bottom:8,
        right:8
    },
    backgroundImage:{
        width:width, 
        height:118,
        resizeMode:'cover',
        position:'absolute',
    },
    emoji:{
        width:22,
        height:22,
        position: 'absolute',
        top:8,
        right:8
    },
});

//make this component available to the app
export default MenuDishCell;
