//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, } from 'react-native';
const {width, height} = Dimensions.get('window');
// create a component
class FilterButton extends Component {
    render() {
        return (
            <TouchableOpacity onPress = {this._onRelevance} style = {styles.button}>
               <Text style = {styles.textButton}>{this.props.name}</Text>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    button:{
        width: (width - 40)/4,
        height: 30,
        marginLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    textButton:{
        color:'lightgray',
        fontSize: 13,
    },
});

//make this component available to the app
export default FilterButton;
