//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, Dimensions, TouchableOpacity, TouchableHighlight } from 'react-native';
import RestaurantInfo from '../Logic/Model/RestaurantInfo'

const{width, height} = Dimensions.get('window')
var feet = Number
// create a component
class RestaurantCell extends Component {
    constructor(props){
        super(props)
        this.state = {
            distance:''
        }
    }
    render() {
        var feet = this.props.rowdata.location.distance
        
        return (
            <TouchableHighlight onPress = {this._onPressFavorite}>
                <View style={styles.container}>
                    <Image 
                        source = {{uri:this.props.rowdata.photoUrl}}
                        style = {styles.backgroundImage}
                        defaultSource = {require('../images/head_image_default.png')}/>
                    <View style = {{backgroundColor:'black', opacity:0.5,position:'absolute', width: width, height:120}}>
                    </View>
                    <Text style = {{color:'white', fontSize:17, marginLeft:5, marginTop:5}}>{this.props.rowdata.name}</Text>
                    <Text style = {{color:'white', fontSize:14, marginLeft:5}}>{this.props.rowdata.type}</Text>
                    <Text style = {{color:'white', fontSize:14, marginLeft:5}}>${this.props.rowdata.priceTier}</Text>
                    <Text style = {{color:'white', fontSize:14, marginLeft:5}}>{feet}</Text>
                    <Image source = {require('../images/smile_3.png')} style = {styles.bottomFavoriteIcon}/>
                    <Image source = {require('../images/smile_3.png')} style = {styles.aboveFavoriteIcon}/>
                </View>
            </TouchableHighlight>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        width: width,
        height: 122,
        flexDirection:'column',
        backgroundColor: 'white',
    },
    backgroundImage:{
        flex: 1,
        position:'absolute',
        width: width,
        height:120,
        resizeMode: 'cover',
    },
    bottomFavoriteIcon:{
        width:30,
        height: 30,
        marginLeft:8
    },
    aboveFavoriteIcon:{
        width:30,
        height:30,
        position:'absolute',
        top:8,
        right: 8,
    }
});

//make this component available to the app
export default RestaurantCell;
