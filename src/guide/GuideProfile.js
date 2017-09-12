//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, Image, Dimensions, TouchableOpacity, TextInput,} from 'react-native';

const{width, height} = Dimensions.get('window');
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager
} = FBSDK;

// create a component
class GuideProfile extends Component {
    constructor(props){
        super(props);
        this.state ={
            username: '',
            location: '',
            about: '',
            photo: '',
        }
    }

    componentWillMount() {
        //Create response callback.
        _responseInfoCallback = (error, result) => {
            if (error) {
                console.log(error);
                alert('Error fetching data: ' + error.toString());
            } else {
                console.log(result);
                username = result.name;
                photo = result.picture.data.url;
                this.setState({
                    username,
                    photo,
                })
            }
        }

        // Create a graph request asking for user information with a callback to handle the response.
        const infoRequest = new GraphRequest(
            '/me',
            {
                parameters:{
                    fields:{
                        string: 'email, name, picture, about'
                    }
                }
            },
            _responseInfoCallback,
        );
        new GraphRequestManager().addRequest(infoRequest).start();
    }
    _onPressSave = () => {
        this.props.navigator.push({
            name: 'guidefollow'
        })
    }

    render() {this.state.photo
        return (
            <View style={styles.container}>
                <View style={styles.navview}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>Profile</Text>                     
                    <TouchableOpacity onPress = {this._onPressSave} style = {styles.save}>
                        <Text style = {{marginTop:10, color:'white', fontSize:14}}>Save</Text>
                    </TouchableOpacity>
                </View>

                <View style = {styles.headView}>
                    <Image 
                        source = {{uri: this.state.photo}} 
                        style = {styles.headImage}
                        defaultSource = {require('../images/head_image_default.png')}/>
                    <View style = {styles.rightView}>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            style = {styles.inputText}
                            onChangeText = {(text) => this.setState({name:text})}
                            placeholder = 'Username'
                            value = {this.state.username}/>
                        <TextInput
                            underlineColorAndroid = 'transparent'
                            style = {styles.inputText}
                            onChangeText = {(text) => this.setState({name:text})}
                            placeholder = 'Location'
                            />
                    </View>
                </View>

                <TextInput 
                      underlineColorAndroid = 'transparent'
                      multiline = {true}
                      maxLength = {100}
                      placeholder = 'Tell us about yourself' 
                      style = {styles.commentText}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navview:{
       backgroundColor: '#652D6C',
       width: width,
       height: 40,
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row',
    },
    save:{
        position: 'absolute',
        right: 10,
        height: 40,
    },
    headView:{
        width: width,
        height: 160,
        backgroundColor: '#F3F3F3',
        flexDirection:'row',
    },
    headImage:{
        width:80,
        height: 80,
        marginTop: 40,
        marginLeft: 30,
        borderColor:'white',
        borderWidth: 2,
        borderRadius: 40,
    },
    rightView:{
        flexDirection:'column',  
        justifyContent:'center',
        height : 150,
    },
    inputText:{
        height: 28,
        width: width - 170,
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
export default GuideProfile;
