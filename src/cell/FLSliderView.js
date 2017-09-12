//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, Slider } from 'react-native';

var smile1Image = require('../images/smile_1.png')
var smile2Image = require('../images/smile_2.png')
var smile3Image = require('../images/smile_3.png')
var smile4Image = require('../images/smile_4.png')
var smile5Image = require('../images/smile_5.png')

// create a component
class FLSliderView extends Component {
    constructor(props){
        super(props)
    }
    render() {
        if(this.props.sliderValue ==  1){
            return (
                <Image source = {smile5Image} style = {styles.sliderImage} /> 
            );
        }else if(this.props.sliderValue > 0.75){
            return(
                <Image source = {smile4Image} style = {styles.sliderImage} />
            );
        }else if(this.props.sliderValue > 0.5){
            return(
                <Image source = {smile3Image} style = {styles.sliderImage} />
            );
        }else if(this.props.sliderValue > 0.25){
            return(
                <Image source = {smile2Image} style = {styles.sliderImage} />
            );
        }else{
            return(
                <Image source = {smile1Image} style = {styles.sliderImage} />
            );
        }
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    sliderImage:{
        width:30, 
        height:30, 
        position:'absolute', 
        right:25,
    },
});

//make this component available to the app
export default FLSliderView;
