//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, TextInput } from 'react-native';

const {width, height} = Dimensions.get('window');

// create a component
class NewNav extends Component {
    constructor (props){
        super(props);
        this.state = {
            text: ''
        }
        this._onPressBack = this._onPressBack.bind(this);
    }

    _onPressBack(){
        this.props.navigator.pop();
    }
    render() {
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
                    <TextInput 
                        underlineColorAndroid = 'transparent'
                        style = {styles.textinput} 
                        onChangeText = {(text) => this.setState({text})} 
                        value = {this.state.text} 
                        placeholder = {'Dish name'}/>
                    <TextInput 
                        underlineColorAndroid = 'transparent'
                        style = {styles.textinput} 
                        onChangeText = {(text) => this.setState({text})} 
                        value = {this.state.text} 
                        placeholder = {'Price($)'}/>
                    <TextInput 
                        underlineColorAndroid = 'transparent'
                        style = {styles.textinput} 
                        onChangeText = {(text) => this.setState({text})} 
                        value = {this.state.text} 
                        placeholder = {'Category'}/>
                    
                    <TextInput 
                      underlineColorAndroid = 'transparent'
                      multiline = {true}
                      maxLength = {100}
                      placeholder = 'Description' 
                      style = {styles.commentText}/>

                </View>
            </View>
        );
    }
}


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
        top: 30,
    },
    photo:{
        width:60,
        height:60,
    },
    textinput:{
        width: width - 130,
        height: 28,
        borderColor:'lightgray',
        borderWidth: 1,
        borderRadius: 3,
        marginTop:10,
        marginLeft: 80,
        paddingVertical: 0,
        paddingLeft: 7,
        fontSize: 12,
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

})

//make this component available to the app
export default NewNav;
