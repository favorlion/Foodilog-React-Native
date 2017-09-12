//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, TouchableOpacity, Dimensions } from 'react-native';
import API from '../service/API'

const{width, height} = Dimensions.get('window')
// create a component
class FeedCommentCell extends Component {
    render() {
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.uid + 'S'
        return (
            <TouchableOpacity onPress = {this._onPressDishCell}>
                <View style={styles.container}>
                    <Image
                        source = {{uri:iconURL}} 
                        style = {styles.photo}
                        defaultSource = {require('../images/dish_default.png')}/>
                    <Text style = {styles.comment} numberOfLines = {10}>{this.props.rowdata.content}</Text>
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
        backgroundColor: 'white',
        width: width,
        flexDirection:'row',
        padding: 10,
        alignItems: 'center',
    },
    photo:{
        width: 30,
        height: 30,
        marginLeft:6,
    },
    comment:{
        marginLeft: 7,
        color:'#555555',
        fontSize:13,
        paddingRight:36,
    },
    line:{
        position:'absolute',
        width: width,
        height: 1,
        left: 0,
        bottom: 0,
        backgroundColor:'#EFEFF4',
    }
});

//make this component available to the app
export default FeedCommentCell;
