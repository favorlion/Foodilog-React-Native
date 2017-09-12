//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native';

// create a component
class FLFaceView extends Component {
    constructor(props){
        super(props)
    }

    render() {
        var score = this.props.score
        var type = this.props.type
        var icon = ''
        if(score == 100){
            var icon = require('../images/smile_5.png')
        }else if(score >= 75){
            var icon = require('../images/smile_4.png')
        }else if(score >= 50){
            var icon = require('../images/smile_3.png')
        }else if(score >= 25){
            var icon = require('../images/smile_2.png')
        }else{
            var icon = require('../images/smile_1.png')
        }
        return (
            <Image source = {icon} style = {type == 'big'? styles.emoji1: styles.emoji2}/>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    emoji1:{
        width: 30,
        height: 30,
    },
    emoji2:{
        width: 22,
        height: 22
    }
});

//make this component available to the app
export default FLFaceView;
