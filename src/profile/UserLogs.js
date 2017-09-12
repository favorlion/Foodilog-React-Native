//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Navigator, ListView, AsyncStorage, ActivityIndicator} from 'react-native';
import API from '../service/API'
import FeedRow from '../cell/FeedRow'

const{width, height} = Dimensions.get('window');
var userloglist = [];

// create a component
class UserLogs extends Component {
    constructor(props){
        super(props);        
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource:ds.cloneWithRows(userloglist),
            isshowIndicator: false,
            ambiance:'',
            background:'',
            dishs:'',
            fid:'',
            likeCount:'',
            liked:'false',
            overall:'',
            photos:'',
            restaurantName:'',
            rid:'',
            score:'',
            service:'',
            taste:'',
            timestamp:'',
            uid:'',
            userName:'',
        };
    }
    _onPressBack = () => {
        this.props.navigator.pop();
    }
    _onClickCell = () => {
        this.props.navigator.push({
            name:'feed_detail'
        })
    }
    showIndicator(){
        if(this.state.isshowIndicator){
            return(
                <ActivityIndicator 
                    animating = {this.state.animating}
                    style = {styles.centering}
                    size = 'small'
                    color = 'black'
                />
            );
        }
    }
    componentWillMount() {
        this.setState({
            isshowIndicator:true
        })
        this.getUserLogList()
    }


    getUserLogList(){
        AsyncStorage.getItem('FoodilogToken').then((value) =>{
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGLIST_URL +'me?token=' + value +'&limit=100'
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
                    this.setState({
                        isshowIndicator: false
                    })
                    userloglist = responseData.logs
                    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2})
                    this.setState({
                        dataSource:ds.cloneWithRows(userloglist)
                    })
                }else{
                    alert('No result');
                }
            })
            .catch((error) =>{
                console.log(error)
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Logs</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.wrapper}>
                    <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {(data)=><FeedRow rowdata = {data} onPressFeedClicked = {this._onClickCell} navigator = {this.props.navigator}/>}
                        enableEmptySections = {true}/>
                </View>
                {this.showIndicator()}
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
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#652D6C',
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
    wrapper:{
        width: width,
        height: height-50,
    },
    backButtonLeft:{
        position:'absolute',
        width: 100,
        height: 100,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
        marginTop:'10',
        marginLeft:'10'
    },
    centering:{
        position:'absolute',
        top: 200,
        left: (width - 20)/2,        
    },
});

//make this component available to the app
export default UserLogs;
