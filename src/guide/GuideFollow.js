//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Navigator, Dimensions, TouchableOpacity,AsyncStorage, ListView } from 'react-native';
import API from '../service/API'

const {width, height} = Dimensions.get('window');
var ok = false;
var users = [];

// create a component
class GuideFollow extends Component {
    constructor(props){
        super(props);

    }

    componentWillMount(){
        AsyncStorage.getItem('FoodilogToken')
        .then( (value) => { 
            if(value){
                var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_FOLLOWABLE_LIST + '?token=' + value
                console.log(REQUEST_URL);
                fetch(REQUEST_URL,{
                    method: 'GET',
                    headers: {
                        'Accept' : 'application/json',
                        'Content-Type' : 'application/json',
                    }, 
                })
                .then((response) => response.json())
                .then((responseData) => {
                    ok = responseData.ok;
                    if(ok){
                        // users = responseData.users;
                        // this.setState({users});
                    }
                }).catch((e) => {
                    console.log(e)
                })
            } 
        });   
    }

    _onPressDone = () => {
        this.props.navigator.push({
            name:'tabcontainer'
        })
        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navview}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>Follow</Text>                     
                    <TouchableOpacity onPress = {this._onPressDone} style = {styles.done}>
                        <Text style = {{marginTop:10, color:'white', fontSize:14}}>Done</Text>
                    </TouchableOpacity>
                </View>
                <Text style = {styles.welcome}> Welcome to Foodilog </Text>


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
    done:{
        position: 'absolute',
        right: 10,
        height: 40,
    },
    welcome:{
        backgroundColor:'transparent',
        color: '#555555',
        fontSize:30,
        
        marginTop:230,
        
        width:width,
        textAlign:'center',
    },
    hideList:{
        width: 0,
        height: 0,
    }, 
    showList:{
        width: width,
        height: height - 40,
    },
});

//make this component available to the app
export default GuideFollow;
