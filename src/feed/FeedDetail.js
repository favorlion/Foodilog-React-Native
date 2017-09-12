import React,{Component} from 'react';
import {View, Text, Button, StyleSheet, Dimensions, Image, TouchableOpacity, ScrollView, TextInput,TouchableWithoutFeedback, AsyncStorage, ListView } from 'react-native';
import FLFaceView from '../cell/FLFaceView'
import FeedDishCell from '../cell/FeedDishCell'
import FeedCommentCell from '../cell/FeedCommentCell'
import ImageCollectionView from '../cell/ImageCollectionView'
import API from '../service/API'

const{width, height} = Dimensions.get('window');
var TimeAgo = require('react-native-timeago')
var likeCountNumber = Number
var isFavorite = false
var isLike = false
var likeCountString
var dishs = [];
var comments = [];
var photos = [];
var thumbPhotos = [];
var fid = ''

export default class FeedDetail extends Component {
    constructor (props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(comments),
            dishDataSource: ds.cloneWithRows(dishs),
            photoDataSource: ds.cloneWithRows(photos),
            logInfo:[],
            photos:[],
            thumbPhotos:[],
            isLike: false,
            isFavorite: false,
            username:'',
        }
    }

    _onPressBack = () => {
        this.props.navigator.pop();
    }
    _onPressResCell = () => {
        this.props.navigator.push({
            name: 'restaurantDetail',
            restaurantId: this.state.logInfo.rid,
            restaurantName: this.state.logInfo.restaurantName
        })
    }

    componentWillMount() {
        this.getLogCommentList()
    }
    getLogCommentList(){
        fid = this.props.fid
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL1 = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGDETAIL_URL + fid + '?token=' +value
            fetch(REQUEST_URL1, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                isFavorite = responseData.isFavourate
                if(responseData.ok == true){
                    dishs = responseData.flog.dishs
                    this.setState({
                        logInfo : responseData.flog,
                        isLike : responseData.flog.liked,
                        isFavorite : isFavorite,
                        dishDataSource: this.state.dishDataSource.cloneWithRows(dishs),
                        username: responseData.flog.userName + "'s log"
                    })
                    this.initphotos()
                }
            })

            //func getLogCommentList(logInfo.id)
            var REQUEST_URL2 = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGDETAIL_URL + fid + '/comment?token=' +value
            fetch(REQUEST_URL2, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                if(responseData.ok == true){
                    comments = responseData.comments
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(comments)
                    })
                }
            })
        })
    }

    initphotos(){
        var count = Object.keys(this.state.logInfo.photos).length

        photos = []
        thumbPhotos = []
        for(let i = 0 ; i < count ; i++ ){
            photos.push(Object.keys(this.state.logInfo.photos)[i])  
        }
        this.setState({
                // photoDataSource:this.state.photoDataSource.cloneWithRows(photos)
            photos: photos
        })
    }

    showPhotos(){
        if(this.state.photos.length > 0){
            return(
                <View style = {styles.dishView}>
                    <Text style = {styles.headerTableCell}>OTHER PHOTOS</Text>
                    <ImageCollectionView data = {this.state.photos}/>
                </View>
            );
        }else{
            return null
        }
        
        
    }
    _onPressEdit = () =>{
        this.props.navigator.push({
            name:'startnewlog', 
        })
    }
    _onPressLike = () => {
        isLike =! isLike
        this.setState({isLike:isLike})
    }
    _onPressFavorite = () => {
        isFavorite =! isFavorite
        this.setState({isFavorite:isFavorite})
    }

    render() {
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.state.logInfo.uid + 'S'
        var utcSeconds = this.state.logInfo.timestamp
        var d = new Date(0)
        d.setUTCSeconds(utcSeconds)
        
        likeCountNumber = this.state.logInfo.likeCount
        if (likeCountNumber > 1000 && likeCountNumber < 10000){
            likeCountString = (likeCountNumber/1000).toFixed(1) + 'K Likes'
        }else if(likeCountNumber >= 10000){
            likeCountString = (likeCountNumber/1000) + 'K Likes'
        }else if(likeCountNumber == 0){
            likeCountString = 'Likes'
        }else{
            likeCountString = likeCountNumber + ' Likes'
        }

        return (
            <View style = {styles.wrapper}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.username}</Text>  
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressEdit} style = {styles.edit}>
                        <Image source = {require('../images/report.png')} style = {styles.editImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressShare} style = {styles.share}>
                        <Image source = {require('../images/share_file.png')} style = {styles.shareImage}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    <View style = {styles.headview}>
                        <TouchableOpacity onPress = {this._onPressResCell} style = {styles.resbutton}>
                            <Image 
                                source = {{uri:this.state.logInfo.background}} 
                                style = {styles.bgImg}
                                defaultSource = {require('../images/feed_image_default.png')}/>
                            <View style = {{backgroundColor:'black', opacity:0.5, position:'absolute', width: width, height:120}}>
                            </View>
                            <Text style = {{marginTop:14, marginLeft:10, color:'white', fontSize:18, backgroundColor:'transparent'}}>{this.state.logInfo.restaurantName}</Text>
                            <View style = {styles.emoji}>
                                <FLFaceView score = {this.state.logInfo.score} type = 'big'/>
                            </View>
                            <Image 
                                source = {{uri:iconURL}} 
                                style = {styles.friendImg}
                                defaultSource = {require('../images/userphoto.png')}/>
                            <Text style = {{position:'absolute', left:48, top:87, color:'white', width:180, height:21, fontSize:13, backgroundColor:'transparent'}}>{this.state.logInfo.userName}</Text>
                            <Text style = {{position:'absolute', right:8, top:87, color:'white', height:21, fontSize:12, backgroundColor:'transparent'}}>
                                <TimeAgo time = {d.toDateString()}/>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    
                    <View style = {styles.overallview}>
                        <Text style = {{fontSize:14, color:'black', marginTop:3}}>Overall Rating</Text>
                        <View style = {styles.overallRatingImage}>
                            <FLFaceView score = {this.state.logInfo.overall} type = 'big'/>
                        </View>
                        <Text style = {{fontSize:14, color:'black', marginTop:3}}>Overall Comment</Text>
                        <Text style = {{fontSize:12, color:'#555555',marginTop:3, textAlign:'center'}}>{this.state.logInfo.comment}</Text>
                        
                        <View style = {{flexDirection:'row'}}>
                            <View style = {styles.ambianceRatingImage}>
                                <FLFaceView score = {this.state.logInfo.ambiance} type = 'big'/>
                                <Text style = {{fontSize:12, color:'black',  width:65, textAlign:'center'}}>Ambiance</Text>
                            </View>

                            <View style = {styles.serviceRatingImage}>
                                <FLFaceView score = {this.state.logInfo.service} type = 'big'/>
                                <Text style = {{fontSize:12, color:'black', }}>Service</Text>
                            </View>
                
                            <View style = {styles.tasteImage}>
                                <FLFaceView score = {this.state.logInfo.taste} type = 'big'/>
                                <Text style = {{fontSize:12, color:'black', width:60, textAlign:'center'}}>Value</Text>
                            </View>
                            
                        </View>
                    </View>
                    
                    
                    <View style = {styles.dishView}>
                        <Text style = {styles.headerTableCell}>DISHES</Text>
                        <ListView 
                            dataSource = {this.state.dishDataSource}
                            renderRow = {(data) => <FeedDishCell rowdata = {data} userName = {this.state.logInfo.userName} navigator = {this.props.navigator}/>}
                            enableEmptySections = {true}/>
                    </View>

                    {this.showPhotos()}
                    
        

                    <View style = {styles.commentView}>
                        <Text style = {styles.headerTableCell}>COMMENTS</Text>
                        <ListView 
                            dataSource = {this.state.dataSource}
                            renderRow = {(data) => <FeedCommentCell rowdata = {data}/>}
                            enableEmptySections = {true}/>
                    </View>
                </ScrollView>

                <View style = {styles.commentInputView}>
                    <TextInput underlineColorAndroid = 'transparent' placeholder = 'Comment' style = {styles.textinput}/>
                    <TouchableWithoutFeedback onPress = {this._onPressFavorite}>
                        <Image source = {this.state.isFavorite == true? require('../images/star_selected.png'):require('../images/star_unselected.png')} 
                            style = {styles.likeImage}/>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress = {this._onPressLike}>
                        <Image source = {this.state.isLike == true? require('../images/heart_selected.png'):require('../images/heart_unselected.png')} 
                            style = {styles.favoriteImage}/> 
                    </TouchableWithoutFeedback>
                    <TouchableOpacity onPress = {this._onPressLike}>
                        <Text style = {{color:'#652D6C', fontSize:13, marginLeft: 8}}>{likeCountString}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#EFEFF4',
    },
    navview:{
       backgroundColor: '#652D6C',
       width: width,
       height: 50,
       justifyContent: 'center',
       alignItems: 'center',
       flexDirection: 'row',
    },
    bgImg:{
        position:'absolute',
        width: width,
        height: 120,
        top:0,
        left:0,
        resizeMode: 'cover',
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
    headview:{
        flexDirection:'row',
        width: width,
        height: 120,
    },
    emoji:{
        width: 30,
        height: 30,
        position: 'absolute',
        top: 8,
        right: 10,
    },
    friendImg:{
        width: 30,
        height: 30,
        borderRadius: 15,
        position: 'absolute',
        left:10,
        bottom: 8,
    },
    overallview:{
        flexDirection: 'column',
        alignItems: 'center',
        width: width,

        justifyContent: 'center',
        backgroundColor:'white',
    },
    overallRatingImage:{
        width: 30, 
        height: 30,
    },
    serviceRatingImage:{
        width: 100,
        height: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    ambianceRatingImage:{
        width: 100,
        height: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    tasteImage:{
        width: 100,
        height: 55,
        alignItems:'center',
        justifyContent:'center',
    },
    dishView:{
        width: width,
        flexDirection:'column',
        marginTop: 30
    },
    commentView:{
        width: width,
        flexDirection:'column',
        paddingBottom: 70,
        marginTop: 30,
    },
    commentInputView:{
        width: width,
        height: 46,
        backgroundColor:'#EFEFF4',
        position:'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
        alignItems:'center',
        flexDirection:'row',
    },
    textinput:{
        height:30, 
        width:width/2+20,  
        borderColor:'lightgray', 
        borderWidth:1,
        borderRadius:3, 
        paddingTop:0,
        paddingBottom:0,
        paddingLeft: 10,
        fontSize:13,
        marginLeft:8,
        backgroundColor:'white',
    },
    edit:{
        position:'absolute',
        width: 20,
        height: 20,
        right: 50,
    },
    editImage:{
        width: 20,
        height: 20,
        resizeMode: 'contain',
    },
    share:{
        position:'absolute',
        width: 20,
        height: 20,
        right: 15,
    },
    shareImage:{
        width:20,
        height: 20,
        resizeMode: 'contain'
    },
    likeImage:{
        width: 25,
        height: 25,
        marginLeft: 20,
    },
    favoriteImage:{
        width: 25,
        height: 25,
        marginLeft: 17,
    },
    resbutton:{
        width: width,
        height: 120,
    },
    headerTableCell:{
        fontSize:16, 
        color:'#7F7F7F', 
        marginLeft:16, 
        marginBottom:7
    }
});