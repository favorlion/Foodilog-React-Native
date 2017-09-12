//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, AsyncStorage, Dimensions, TouchableHighlight } from 'react-native';

const{width, height} = Dimensions.get('window')
var feet = Number
// create a component
class DishCell extends Component {
    render() {
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
                    <Text style = {{color:'white', fontSize:14, marginLeft:5}}>${this.props.rowdata.price}</Text>

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
        position:'absolute',
        left:8,
        bottom:10,
        width:30,
        height: 30,    
    },
    aboveFavoriteIcon:{
        width:30,
        height:30,
        position:'absolute',
        top:8,
        right: 8,
    },
});

//make this component available to the app
export default DishCell;
