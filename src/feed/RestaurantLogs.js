//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Navigator, ListView, AsyncStorage } from 'react-native';
import FeedRow from '../cell/FeedRow'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var logs = []

// create a component
class RestaurantLogs extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(logs)
        }
    }
    componentWillMount() {
        this.getRestaurantLogList()
    }
    getRestaurantLogList(){
        logs = []
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(logs)
        })
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_RESTAURANT_LOGLIST_URL + this.props.rid + '?token=' + value + '&limit=100'
            console.log(REQUEST_URL)
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.ok == true){
                    logs = responseData.logs
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(logs)
                    })
                }
            })
            .catch((e) => {
                console.log(e)
            })
        })
    }
    _onPressBack = () =>{
        this.props.navigator.pop()
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style = {{color:'white', fontSize:16, fontWeight:'bold'}}>Logs</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1}}>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {(data) => <FeedRow rowdata={data} navigator = {this.props.navigator}/>}
                        enableEmptySections = {true}
                    />
                </View>
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
});

//make this component available to the app
export default RestaurantLogs;
