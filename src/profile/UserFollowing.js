//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ListView, Navigator, AsyncStorage, Image, TouchableOpacity, Dimensions } from 'react-native';
import DiscoverPeopleCell from '../cell/DiscoverPeopleCell'
import API from '../service/API'

const {width, height} = Dimensions.get('window')
var userfollowingList = [];

// create a component
class UserFollowing extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(userfollowingList)
        }
    }

    componentWillMount() {
        this.getFollowingList();
    }

    getFollowingList(){
        userfollowingList = [];
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_FOLLOW_URL + '?token=' + value
            fetch(REQUEST_URL, {
                method:'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type' : 'application/json'
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.ok == true){
                    if(responseData.users.length > 0){
                        userfollowingList = responseData.users;
                        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
                        this.setState({
                            dataSource:ds.cloneWithRows(userfollowingList),
                        })
                    }else{
                        alert('No result')
                    }
                }
            })
            .catch((e) => {
                console.log(e)
            })
        })
    }

    _onPressBack = () => {
        this.props.navigator.pop();
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style = {{color:'white', fontSize:14, fontWeight:'bold'}}>Following</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <ListView 
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) => <DiscoverPeopleCell rowdata = {data} navigator = {this.props.navigator}/>}
                    enableEmptySections = {true}/>
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
        backgroundColor:'#652D6C',
        width: width,
        height: 40,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    backButton:{
        position:'absolute',
        left: 10,
        width: 40,
        height: 40,
    },
    backImage: {
        width: 16,
        height: 16,
        marginTop: 12,
        resizeMode: 'contain'
    },
});

//make this component available to the app
export default UserFollowing;
