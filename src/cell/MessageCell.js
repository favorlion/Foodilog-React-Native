import React,{Component} from 'react';
import { StyleSheet, Platform, Text, Dimensions, View, Image, TouchableOpacity, TouchableHighlight} from 'react-native'
import API from '../service/API'

var TimeAgo = require('react-native-timeago')
const{width, height} = Dimensions.get('window');
export default class MessageCell extends Component { 
// const MessageCell = (props) =>{

    _onPressMessageItem = () => {
        if(this.props.rowdata.type == 'star' || this.props.rowdata.type == 'comment' || this.props.rowdata.type == 'like'){
            this.props.navigator.push({
                name: 'feed_detail',
                fid: this.props.rowdata.content,
                uid: this.props.rowdata.uid,   
            })
        }else if(this.props.rowdata.type == 'following' || this.props.rowdata.type == 'join'){
            if(this.props.rowdata.senderId){
                this.props.navigator.push({
                    name:'userprofile',
                    uid: this.props.rowdata.senderId,
                })
            }
        }
    }

    render(){

        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.senderId + 'S'
        var tyepStr = '';
        var type = this.props.rowdata.type
        if(type == 'unknown'){
            typeStr = 'unknown'
        }else if(type == 'following'){
            typeStr = 'started following you'
        }else if(type == 'like'){
            typeStr = 'liked your log'
        }else if(type == 'comment'){
            typeStr = 'commented your log'
        }else if(type == 'star'){
            typeStr = 'stared your log'
        }else if(type == 'join'){
            typeStr = 'just joined'
        }
        var utcSeconds = this.props.rowdata.timestamp;
        var d = new Date(0);
        d.setUTCSeconds(utcSeconds);

        const str_Follow = '+Follow'
        const str_Following = '✓Following'
        var isFollow = this.props.rowdata.isFollowed
        return (
            <TouchableHighlight onPress = {this._onPressMessageItem}>
                <View style = {styles.wrapper}>
                    <Image 
                        source = {{uri:iconURL}} 
                        style = {styles.headImage}
                        defaultSource = {require('../images/head_image_default.png')}/>
                    <View style = {styles.cell1}>
                        <Text style = {{fontSize:16, color:'black', backgroundColor:'transparent'}} numberOfLines = {1} >{this.props.rowdata.senderName}</Text>
                        <Text style = {{fontSize:12, color:'dimgray', backgroundColor:'transparent', marginTop:5}}>{typeStr}</Text>
                    </View>
                    <Text style = {{fontSize:11}}>
                        <TimeAgo time = {d.toDateString()}/>
                    </Text>
                    <TouchableOpacity onPress = {this.props.onPressFollow}>
                        <View style = {styles.follow}>            
                            <Image  source = {isFollow == true? require('../images/following_button.png'): require('../images/follow_button.png')} style = {styles.followImage}/>
                            <Text style = {isFollow == false? {color:'#652D6C', fontSize:12, backgroundColor:'transparent'}:{color:'white', fontSize:12, backgroundColor:'transparent'}}>
                                {isFollow == false? str_Follow:str_Following}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style = {{backgroundColor:'lightgray', width:width, height:1, position:'absolute', bottom:1, left:1}}></View>       

                </View>
            </TouchableHighlight>
        );
    }   
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:'white',
        flexDirection: 'row',
        width:width,
        height: 60,
        alignItems:'center',
        paddingRight:8,
    },
    headImage:{
        width:40,
        height: 40,
        marginLeft:15,

    },
    cell1:{
        flex:1,
        flexDirection: 'column',
        width:width,
        padding:8,
    },
    follow:{
        width:80,
        height: 28,
        marginLeft:5,
        alignItems:'center',
        justifyContent:'center',
    },
    followImage:{
        width:80,
        height:28,
        resizeMode:'stretch',
        marginLeft:5,
        position:'absolute',
    },
});
