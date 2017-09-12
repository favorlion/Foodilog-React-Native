//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Navigator, Dimensions } from 'react-native';
import FLFaceView from '../cell/FLFaceView'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
// create a component
class LogDish extends Component {
    constructor(props){
        super(props)
    }
    _onPressBack = () => {
        this.props.navigator.pop()
    }
    _onPressDishDetails = () => {
        this.props.navigator.push({
            name:'dishdetail',
            dishInfo: this.props.dishInfo,
        })
    }

    render() {
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.dishInfo.photoId + 'S'
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.props.userName}'s log</Text>  
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>

                <View style = {styles.imageView}>
                    <Image 
                        source = {{uri:iconURL}} 
                        style = {styles.image}
                        defaultSource = {require('../images/dish_default.png')}/>
                </View>
                
                <View style = {styles.menuView}>
                    <View style = {{flexDirection:'row', alignItems:'center'}}>
                        <Text style = {{color:'#555555', fontSize: 18}}>{this.props.dishInfo.name}</Text>
                        <View style = {styles.emoji}>
                            <FLFaceView score = {this.props.dishInfo.score} type = 'big'/>
                        </View>
                    </View>
                    <View>
                        <Text style = {{color:'#AAAAAA', fontSize:16, width: width}}>{this.props.dishInfo.comment}</Text>
                    </View>
                    <View style = {{alignItems:'center',  justifyContent:'center', width:width, height:52,  flexDirection:'row', padding: 10}}>
                        <TouchableOpacity onPress = {this._onPressDishDetails} >
                            <View style = {styles.buttonView}>
                                <Text style = {{color:'#652D6C', fontSize:14}}>Dish Details</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.favoriteButton}>
                            <Image source = { this.props.dishInfo.favourate?require('../images/star_selected.png'):require('../images/star_unselected.png')} style = {styles.favoriteImage}/>
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
        backgroundColor: 'white',
    },
    navview:{
        backgroundColor:'#652D6C',
        width: width,
        height: 50,
        justifyContent:'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    imageView:{
        width: width,
        height: height - 170,
        backgroundColor:'#EFEFF4',
        alignItems:'center',
        justifyContent:'center',
    },
    menuView:{
        width: width,
        flexDirection:'column',
        position:'absolute',
        left: 0,
        bottom: 0,
        backgroundColor:'white',
        padding: 8
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
    emoji:{
        width: 30,
        height: 30,
        position:'absolute',
        right: 0,
    },
    dishimage: {
        width: width,
        height: height - 170,
        resizeMode:'cover',
    },
    buttonView:{
        borderWidth:1, 
        borderColor:'#AAAAAA', 
        borderRadius: 5,
        width: width*2/3, 
        height:36,
        justifyContent:'center',
        alignItems:'center',
    },
    dishbutton:{
        position:'absolute',
        bottom: 5,
    },
    favoriteButton:{
        width: 28,
        height: 28, 
        position:'absolute',
        right: 15,
        bottom: 12,
    },
    favoriteImage:{
        width:28,
        height:28
    },
    image:{
        width:width,
        height: height -170,
        resizeMode:'cover'
    },
});

//make this component available to the app
export default LogDish;
