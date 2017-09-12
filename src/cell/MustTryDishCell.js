//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity} from 'react-native';
import API from '../service/API'

const{width, height} = Dimensions.get('window');
var dishURL = ''

// create a component
class MustTryDishCell extends Component {
    photo(){
        if(this.props.rowdata.photoId){
            dishURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.photoId + 'L'

            if(this.props.rowdata.photoId == null && this.props.rowdata.photoId == ''){
                return(
                    <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                );
            }else{ 
                return(
                    <Image 
                        source = {{uri:dishURL}} 
                        style = {styles.photo}
                        defaultSource = {require('../images/dish_default.png')}/>
                );
            }
        }else{
            return(
                    <Image source = {require('../images/dish_default.png')} style = {styles.photo}/>
                );
        }
        
    }
    description(){
        if(this.props.rowdata.description == null && this.props.rowdata.description == ''){
            return(
                null
            );
        }else{
            return(
                <Text style = {styles.description} numberOfLines ={1}>{this.props.rowdata.description}</Text>
            );
        }
    }

    _onpressdish = () => {
        this.props.navigator.push({
            name:'dishdetail',
            dishInfo: this.props.rowdata,
        })
    }
    render() {

        return (
            <TouchableOpacity onPress = {this._onpressdish}>
                <View style={styles.container}>
                    {this.photo()}
                    <View style = {{flexDirection:'column', marginLeft: 10}}>
                        <Text style = {styles.name} numberOfLines ={1}>{this.props.rowdata.name}</Text>
                        <Text style = {styles.price} numberOfLines ={1}>${this.props.rowdata.price}</Text>
                        {this.description()}
                        
                    </View>
                    <View style = {{backgroundColor:'#EFEFF4', width: width, height:1, position:'absolute', left:0}}></View>
                </View>
            </TouchableOpacity>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width:width,
        backgroundColor: 'white',
        flexDirection:'row',
    },
    name:{
        color:'#555555',
        fontSize: 16,
        marginTop: 5,
    },
    price:{
        color: '#AAAAAA',
        fontSize: 13,
        marginTop:5,
    },
    description:{
        color:'#AAAAAA',
        fontSize: 13,
        marginTop: 5,
    },
    photo:{
        width:40, 
        height:40, 
        marginTop:8, 
        marginLeft:8
    }

});

//make this component available to the app
export default MustTryDishCell;
