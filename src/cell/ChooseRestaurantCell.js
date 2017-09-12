//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Navigator, TouchableOpacity } from 'react-native';

const{width, height} = Dimensions.get('window')

// create a component
class ChooseRestaurantCell extends Component {
    render() {
        return (
            <TouchableOpacity onPress = {this.props.clickedRestaurant}>
                <View style={styles.container}>
                    <Image 
                        source = {{uri:this.props.rowdata.photoUrl}}
                        style = {styles.image}
                        defaultSource = {require('../images/restaurant_default.png')}/>
                    <View style = {{marginLeft: 10, flexDirection:'column'}}>
                        <Text style = {styles.name}>{this.props.rowdata.name}</Text>
                        <Text style = {styles.detail}>{this.props.rowdata.location.formattedAddress}</Text>
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
        width: width,
        height: 60,
        backgroundColor: 'white',
        flexDirection:'row',
        alignItems: 'center'
    },
    image:{
        width: 40,
        height: 40,
        resizeMode:'cover',
        marginLeft: 10
    },
    name:{
        fontSize: 15,
        color: 'black',
    },
    detail:{
        fontSize:13,
        color: '#AAAAAA'
    },
    line:{
        backgroundColor:'#EFEFE4', 
        height:1, 
        width: width, 
        position:'absolute',
        bottom: 1,
        right: 1,
    }
});

//make this component available to the app
export default ChooseRestaurantCell;
