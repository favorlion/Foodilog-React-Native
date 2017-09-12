//import liraries
import React, { Component } from 'react';
import { StyleSheet, Platform, Text, Dimensions, View, Image, TouchableHighlight, TouchableOpacity, Navigator} from 'react-native'
import FLFaceView from '../cell/FLFaceView'

var favoriteImage = require('../images/star_selected.png')
var unFavoriteImage = require('../images/star_unselected.png')
const{width, height} = Dimensions.get('window');
var isFav = false
export default class SearchRestaurantCell extends Component {  
    constructor(props){
        super(props)
        this.state = {
            isFav:false,
        }
    }

    componentWillMount() {
        this.setState({
            isFav: this.props.rowdata.isFavourate
        })
    }

    restaurantScore(){
        var ratingScrore = ''
        if(this.props.rowdata.rating){
            if(this.props.rowdata.logCount > 0){
                return(
                    <View style = {styles.emoji}>
                        <FLFaceView score = {this.props.rowdata.rating} type = 'big'/>
                    </View>
                );
                
            }else{
                return null;
            }
        }else{
            return null;
        }
        
    }

    restaurantTypeandPrice(){
        switch(this.props.rowdata.priceTier){
            case 2:
                return(
                    <Text style = {styles.typeText}>{this.props.rowdata.type + ' ($$)'}</Text>
                );
            case 3:
                return(
                    <Text style = {styles.typeText}>{this.props.rowdata.type + ' ($$$)'}</Text>
                );
            case 4:
                return (
                    <Text style = {styles.typeText}>{this.props.rowdata.type + ' ($$$$)'}</Text>
                );
            default:
                return(
                    <Text style = {styles.typeText}>{this.props.rowdata.type + ' ($)'}</Text>
                );
        }
    }

    restaurantCount(){
        if(this.props.rowdata.logCount <= 0){
            return(
                <Text style = {styles.count}>Create the 1st log</Text>
            );
        }
        else{
            var logCount = this.props.rowdata.logCount
            var dishCount = this.props.rowdata.dishCount
            return(
                <Text style = {styles.count}>{logCount} {logCount > 1? 'logs': 'log'} {dishCount} {dishCount > 1? 'dishes':'dish'}</Text>
            );
        }
    }

    restaurantLocation(){
        var feet = this.props.rowdata.location.distance
        var feetStr = (feet/5280).toFixed(1) + ' mi'
        var location = this.props.rowdata.location.formattedAddress
        if(feet < 528){
            return(
                <Text style = {styles.address}>{this.props.rowdata.location.formattedAddress + ' (Distance <0.1 mi'})</Text>
            );
        }else{
            return(
                <Text style = {styles.address}>{this.props.rowdata.location.formattedAddress} (Distance {feetStr})</Text>
            );
        }
    }

    _onPressFav = () => {
        isFav =! isFav
        this.setState({isFav})
    }

    _onPressClicked = () => {
        this.props.navigator.push({
            name:'restaurantDetail',
            restaurantId: this.props.rowdata.id,
            restaurantName: this.props.rowdata.name,
        })
    }

    render(){ 
        isFav = this.state.isFav
        return(
            <TouchableHighlight onPress = {this._onPressClicked}>
                <View style = {styles.wrapper}>
                    <Image 
                        source = {{uri:this.props.rowdata.photoUrl}} 
                        style = {styles.backgroundimage}
                        defaultSource = {require('../images/feed_image_default.png')}/>
                
                    <View style = {{backgroundColor:'black', opacity:0.5, position:'absolute', width: width, height:115, top:0}}>
                    </View>

                    <View style = {{flexDirection:'row', width: width, marginTop:5}}>
                        <Text style = {styles.name}>{this.props.rowdata.name}</Text>
                        {this.restaurantScore()}
                    </View>

                    <View style = {{flexDirection:'row', width: width, marginTop:20}}>
                        {this.restaurantTypeandPrice()}
                        {this.restaurantCount()}
                    </View>
                    
                    <View style = {{flexDirection:'row', width: width, marginTop:20}}>
                        {this.restaurantLocation()}
                        <TouchableOpacity onPress = {this._onPressFav} style = {styles.favButton}>
                            <Image source = {isFav==true? favoriteImage:unFavoriteImage} style = {styles.starImg}/>
                        </TouchableOpacity>
                    </View>
                    <View style = {{backgroundColor:'gray', position:'absolute', width: width, height:1, bottom:1}}>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'white',
        height: 115,
        width: width,
    },
    backgroundimage:{
        position:'absolute',
        width:width,
        height:115,
        resizeMode:'cover'
    },
    name:{
        color:'white', 
        backgroundColor:'transparent', 
        fontSize:17, 
        marginLeft:8, 
    },
    type:{
        color:'white', 
        backgroundColor:'transparent', 
        fontSize:14, 
        marginLeft:8, 
    },
    address:{
        color:'white', 
        backgroundColor:'transparent', 
        fontSize:14, 
        marginLeft:8,
    },
    emoji:{
        width:25,
        height:25,
        position:'absolute',
        right: 10,
    },
    count:{
        color: 'white',
        fontSize: 16,
        backgroundColor:'transparent',
        position:'absolute',
        right:10,
    },
    starImg:{
        width: 22,
        height: 22,
        resizeMode:'contain',
    },
    favButton:{
        width: 22,
        height: 22,
        position:'absolute',
        right: 10,
        bottom: 0,
    },
    typeText:{
        color:'white', 
        fontSize:13, 
        marginLeft:8, 
        backgroundColor:'transparent'
    },
    nameText:{
        color:'white', 
        fontSize:13, 
        marginLeft:8, 
        backgroundColor:'transparent', 
        width: width - 40,
    },

});

//make this component available to the app

