//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Navigator, TouchableOpacity, ListView, ScrollView, AsyncStorage, TextInput, Slider } from 'react-native';
import FLFaceView from '../cell/FLFaceView'

const{width, height0} = Dimensions.get('window')

// create a component
class NLDishComment extends Component {
    constructor(props){
        super(props)
        this.state = {
            price:'',
            taste:'',
        }
    }
    _onPressBack = () => {
        this.props.navigator.pop()
    }
    render() {
        console.log(this.props.dishinfo)
        var price = this.props.dishinfo.price.toString()
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style = {{color:'white', fontSize: 14, fontWeight:'bold'}}>New Dish</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressDone} style = {styles.doneButton}>
                        <Text style = {{color:'white', fontSize:15}}>Done</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.body}>
                    <TouchableOpacity onPress = {this._onPressPhoto} style = {styles.photoButton}>
                        <Image source = {require('../images/add_photo.png')} style = {styles.photo}/>
                    </TouchableOpacity>
                    <View style = {styles.priceView}>
                        <Text style = {styles.price}>Price</Text>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            style = {styles.textinput} 
                            onChangeText = {(text) => this.setState({price:text})} 
                            value = {price}
                            placeholder = {'Price'}/>
                    </View>
                    <View style = {styles.priceView}>
                        <Text style = {styles.price}>Taste</Text>
                        <Slider
                            value={this.state.slider4}
                            onValueChange={(value) => this.setState({taste:value})} 
                            style = {styles.slider}
                            maximumTrackTintColor = {'#652D6C'}/>
                    </View>

                    <View style = {styles.scoreview}>
                        <FLFaceView score = {this.props.dishinfo.score} type = 'big'/>
                    </View>

                   <TextInput
                      underlineColorAndroid = 'transparent'
                      multiline = {true}
                      maxLength = {100}
                      placeholder = 'Comments(in 100 chars)' 
                      style = {styles.commentText}/>
            
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
    },
    navview:{
       backgroundColor: '#652D6C',
       width: width,
       height: 50,
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row',
    },
    backButton:{
        position:'absolute',
        left: 10,
        width: 40,
        height: 40,
    },
    backImage:{
        width: 16,
        height: 16,
        marginTop:12,
        resizeMode: 'contain',   
    },
    doneButton:{
        position: 'absolute',
        right: 10,
    },
    body:{
        width: width,
        marginTop: 10,
        backgroundColor: 'white',
    },
    photoButton:{
        width:60,
        height:60,
        position:'absolute',
        left: 10,
        top: 10,
    },
    photo:{
        width:60,
        height:60,
    },
    priceView:{
        marginTop: 10,
        marginLeft: 80,
        flexDirection:'row',
        alignItems:'center',
    },
    textinput:{
        width: width/2,
        height: 28,
        borderColor:'lightgray',
        borderWidth: 1,
        borderRadius: 3,
        paddingVertical: 0,
        paddingLeft: 7,
        fontSize: 12,
        marginLeft: 10,
    },
    commentText:{
        width: width-30, 
        backgroundColor: '#EFEFF4', 
        fontSize:14, 
        height: 80, 
        marginTop:20,
        paddingLeft: 5,
        paddingRight: 5,
        marginLeft: 15,
    },
    price:{
        color:'#555555',
        fontSize:15,
    },
    slider:{
        width:width/2+20, 
        marginLeft: 0,
    },
    emoji:{
        width: 22,
        height: 22,
        resizeMode: 'contain',
    },
    scoreview:{
        width: 22,
        height: 22,
        position: 'absolute',
        right: 15,
        top:25,
    },
})

//make this component available to the app
export default NLDishComment;
