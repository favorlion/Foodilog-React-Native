//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

const{width, height} = Dimensions.get('window')

// create a component
class MenuDishHeaderCell extends Component {
    render() {
        return (
            <View style={styles.container}>

                <View style = {styles.bgView}></View>
                <Text style = {styles.category} numberOfLines = {1}>{this.props.data}</Text>
                <Image source = {require('../images/movie_arrowDown.png')} style = {styles.arrowImage}></Image>
                
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: 40,
        justifyContent: 'center',
        backgroundColor: '#EFEFF4',
    },
    category:{
        color: '#652D6C',
        fontSize: 16,
        marginLeft: 8
    },
    bgView:{
        width: width,
        height: 118,
        position:'absolute',
        backgroundColor:'#EFEFF4',
    },
    arrowImage:{
        width:15,
        height: 15,
        resizeMode:'contain',
        position: 'absolute',
        right: 8,
    }
});

//make this component available to the app
export default MenuDishHeaderCell;
