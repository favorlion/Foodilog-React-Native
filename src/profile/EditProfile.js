//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, TextInput, AsyncStorage} from 'react-native';
import API from '../service/API'

const {width, height} = Dimensions.get('window');
// create a component
class EditProfile extends Component {
    constructor(props){
        super(props)
        this.state ={
            name: '',
            location: '',
            description: ''
        }
        this._onPressBack = this._onPressBack.bind(this);
    }

    componentWillMount() {
        this.setState({
            name:this.props.username,
            location: this.props.location,
            description: this.props.about,
        })
    }

    _onPressBack(){
        this.props.navigator.pop();
    }
    _onPressDone = () => {
        if(this.state.name == '' || this.state.name.length == 0){
            alert('Name shoud not be empty')
        }
        if(this.state.location == '' || this.state.location.length == 0){
            alert('Location should not be empty')
        }
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.UPDATE_MY_PROFILE + '?name=' + this.state.name + '&area =' + this.state.location +'&about=' +this.state.description + '&token='+value
            fetch(REQUEST_URL, {
                method: 'post',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((responseData) =>{
                console.log(responseData)

                this.props.navigator.pop();
            })
            .catch((e) =>{
                console.log(e)
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Edit</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                         <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                     </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressDone} style = {styles.done}>
                        <Text style = {{marginTop:10, color:'white', fontSize:14}}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{marginTop:10}}>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({name:text})}
                        placeholder = 'Name'
                        underlineColorAndroid = 'transparent'
                        value = {this.state.name}/>
                    <TextInput
                        style = {styles.inputText}
                        onChangeText = {(text) => this.setState({location:text})}
                        placeholder = 'Location'
                        value = {this.state.location}
                        underlineColorAndroid = 'transparent'/>
                    <TextInput 
                        underlineColorAndroid = 'transparent'
                        multiline = {true}
                        maxLength = {100}
                        placeholder = 'Tell us about yourself' 
                        onChangeText = {(text) => this.setState({description:text})}
                        value = {this.state.description}
                        style = {styles.commentText}
                        underlineColorAndroid = 'transparent'/>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'white',
    },
    navview:{
       backgroundColor: '#652D6C',
       width: width,
       height: 40,
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
    done:{
        position: 'absolute',
        right: 10,
        height: 40,
    },
    inputText:{
        height: 28,
        width: width - 40,
        marginLeft: 20,
        marginTop: 10,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 0,
        paddingLeft: 10,
        fontSize: 13,
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
});

//make this component available to the app
export default EditProfile;
