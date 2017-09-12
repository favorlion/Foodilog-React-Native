//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ListView, AsyncStorage } from 'react-native';
import FeedRow from '../cell/FeedRow'
import API from '../service/API'

const{width, height} = Dimensions.get('window');
var feedsList = [];
var profileID = ''
var foodilogToken = ''
var REQUEST_URL = ''
// create a component
class UserProfile extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds.cloneWithRows(feedsList),
            followers:'',
            followings:'',
            isFollowed: false,
            isFollowingMe: false,
            logs: '',
            about: '',
            area: '',
            blocked_till: '',
            name: ''
        }
    }

    componentDidMount() {
        this.getUserLogList();
    }

    getUserLogList(){
        feedsList = [];
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(feedsList),
        })
        profileID = this.props.data;

        AsyncStorage.getItem('FoodilogUserID').then((value)=>{
            if(value == profileID){
                REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGLIST_URL + 'me'
            }else{
                REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGLIST_URL + profileID
            }
        })

        AsyncStorage.getItem('FoodilogToken').then((value)=>{  //get log list
            foodilogToken = value;
            REQUEST_URL = REQUEST_URL + '?token=' + value + '&limit=100';
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
                    if(responseData.logs.length>0){
                        feedsList = responseData.logs
                        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
                        this.setState({
                            dataSource:this.state.dataSource.cloneWithRows(feedsList),
                        })
                    }
                }
                
            }).catch((error) =>{
                console.log(error)
            })
        })

        AsyncStorage.getItem('FoodilogUserID').then((value)=>{ //get profile info
            if(value == profileID){
                REFRESH_REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_PROFILE_URL + 'me'
            }else{
                REFRESH_REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_PROFILE_URL + profileID
            }
            REFRESH_REQUEST_URL = REFRESH_REQUEST_URL + '?token=' + REFRESH_REQUEST_URL
            fetch(REFRESH_REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if(responseData.ok == true){
                    this.setState({
                        followers : responseData.followers,
                        followings : responseData.followings,
                        isFollowed : responseData.isFollowed,
                        isFollowingMe : responseData.isFollowingMe,
                        logs : responseData.logs,
                        about : responseData.user.about,
                        area : responseData.user.area,
                        blocked_till : responseData.user.blocked_till,
                        name : responseData.user.name,
                        str_Follow : '+Follow',
                        str_Following : '✓Following',
                    })
                }else{
                    this.setState({
                        followers : '',
                        followings : '',
                        isFollowed : false,
                        isFollowingMe : false,
                        logs : '',
                        about : '',
                        area : '',
                        blocked_till : '',
                        name : '',
                        str_Follow : '+Follow',
                        str_Following : '✓Following',
                    })
                }
            }).catch((error) =>{
                console.log(error)
            })
        })
    }

    _onPressBack = () =>{
        this.props.navigator.pop();
    }
    _onPressFollow = () => {
        alert('asd')
    }

    render() {
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + profileID + 'L'
        const isFollow = this.state.isFollowed;
        const str_Follow = this.state.str_Follow;
        const str_Following = this.state.str_Following;
        return (
            <View style={styles.container}>
                <View style={styles.navview}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>{this.state.name}</Text>                     
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                         <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                     </TouchableOpacity>
                </View>
                <View style = {styles.body}>
                    <View style = {styles.headerView}>
                        <Image 
                            source = {{uri: iconURL}} 
                            style = {{width:80, height:80, borderRadius:40}}
                            defaultSource = {require('../images/head_image_default.png')}/>
                        <View style = {{flexDirection:'column', paddingLeft:10, paddingRight:10,justifyContent:'center', alignItems:'center'}}>
                            <View style = {styles.followView}>
                                <View style = {{alignItems:'center', justifyContent:'center', width: (width-110)/3,}}>
                                        <Text style = {{color:'#82BB36', fontSize: 14, backgroundColor:'transparent'}}>{this.state.logs}</Text>
                                        <Text style = {styles.logs}>LOGS</Text>
                                </View>
                                <View style = {{alignItems:'center', justifyContent:'center', width: (width-110)/3,}}>
                                    <Text style = {{color:'red', fontSize: 14, backgroundColor:'transparent'}}>{this.state.followers}</Text>
                                    <Text style = {styles.logs}>FOLLOWERS</Text>
                                </View>
                                <View style = {{alignItems:'center', justifyContent:'center', width: (width-110)/3,}}>
                                    <Text style = {{color:'blue', fontSize: 14, backgroundColor:'transparent'}}>{this.state.followings}</Text>
                                    <Text style = {styles.logs}>FOLLOWING</Text>
                                </View>
                            </View>
                            <View style = {styles.follow}>
                                <TouchableOpacity onPress = {this._onPressFollow}> 
                                    <Text style = {isFollow == false? {color:'#652D6C', fontSize:12, backgroundColor:'transparent'}:{color:'white', fontSize:12, backgroundColor:'transparent'}}>
                                        {/*{isFollow == false? str_Follow:str_Following}*/}
                                        Following
                                    </Text>
                                </TouchableOpacity>
                                
                            </View>

                        </View>                   
                    </View>
                    
                    <Text style = {{color:'#AAAAAA', fontSize: 13, paddingLeft:10, paddingRight: 10, height:20}} numberOfLines = {1}>{this.state.about}</Text>
                
                    <View style = {{flexDirection:'row', alignItems:'center', justifyContent:'center',marginTop: 10, height:20,}}>
                        <View style = {{width: width/2-60, height:1, backgroundColor:'#AAAAAA', position:'absolute', left: 10}}/>
                        <View style = {{width: width/2-60, height:1, backgroundColor:'#555555', position:'absolute', right: 10}}/>
                        <Text> Logs </Text>
                    </View>
                    
                    <View style = {styles.scrollview}>
                        <ListView 
                            dataSource = {this.state.dataSource}
                            renderRow = {(data) => <FeedRow rowdata = {data} navigator = {this.props.navigator}/>}
                            enableEmptySections = {true} />
                    </View>
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
    headerView:{
        width:width,
        height:110,
        flexDirection:'row',
        padding: 10,
        paddingTop: 20,
        alignItems:'center',
    },
    followView:{
        flexDirection:'row',
        width:width-110,
        height:50,
        alignItems:'center',
        justifyContent:'center',
    },
    follow:{
        width:width-130,
        height: 30,
        alignItems:'center',
        justifyContent:'center',
        borderColor:'#82BB36',
        borderWidth: 1,
        borderRadius: 13,
    },
    scrollview:{
        width: width,
        marginTop: 10,
        height: height - 210,
    },
    logs:{
        color:'#AAAAAA', 
        fontSize: 12, 
        backgroundColor:'transparent',
        marginTop: 5,
    },

});

//make this component available to the app
export default UserProfile;
