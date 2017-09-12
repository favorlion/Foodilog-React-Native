//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

const {width, height} = Dimensions.get('window');

// create a component
class DraftCell extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style = {styles.restaurantName}>{this.props.rowData.name}</Text>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <Image source = {require('../images/type_dot.png')} style = {styles.dotImage}/>
                    <Text style = {styles.dish}>Dish: </Text>
                    <Text style = {styles.dish}>{this.props.rowData.dishCount}</Text>
                </View>
                <View style = {{flexDirection:'row', alignItems:'center'}}>
                    <Image source = {require('../images/price_dot.png')} style = {styles.dotImage}/>
                    <Text style = {styles.dish}>Photo: </Text>
                    <Text style = {styles.dish}>{this.props.rowData.photoCount}</Text>
                    <Text style = {styles.date}>{this.props.rowData.date}</Text>
                </View>
                
                <View style={{backgroundColor:'lightgray', width:width, height:1, marginLeft:-7, marginTop:5}}></View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width,
        height: 75,
        padding: 10,
    },
    restaurantName:{
        color:'black',
        fontSize: 15,
    },
    dotImage:{
        width: 5,
        height: 5,
    },
    dish:{
        fontSize: 13,
        color: 'gray',
        marginLeft: 10,
        marginTop: 4,
    },
    date:{
        fontSize: 13,
        color: 'gray',
        position: 'absolute',
        right: 5,
    }
});

//make this component available to the app
export default DraftCell;
