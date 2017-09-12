//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableHighlight, TouchableOpacity, Navigator, AsyncStorage} from 'react-native';
import API from '../service/API'

const{width, height} = Dimensions.get('window');
var isFollow = false;

// create a component
class DiscoverPeopleCell extends Component {
    constructor(props){
        super(props);
        this.state = {
            isFollow : false,
            str_Follow : '+Follow',
            str_Following : '✓Following',
        }    
    }
    _onPressFollow= () => {
        isFollow =! isFollow;
        this.setState({isFollow});
    }
    
    onPressDiscoverClicked = () =>{
        this.props.navigator.push({
            name: 'userprofile',
            uid: this.props.rowdata.id,
        })
    }

    render() {
        const isFollow = this.props.rowdata.isFollowed;
        const str_Follow = this.state.str_Follow;
        const str_Following = this.state.str_Following;
        
        var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.rowdata.id + 'S'
        return (
            <TouchableHighlight onPress = {this.onPressDiscoverClicked} >
                <View style = {styles.wrapper}>
                    <Image 
                        source = {{uri:iconURL}} 
                        style = {styles.headImage}
                        defaultSource = {require('../images/head_image_default.png')}/>
                    <View style = {styles.cell1}>
                        <Text style = {{fontSize:16, color:'black', backgroundColor:'transparent'}} numberOfLines = {1} >{this.props.rowdata.name}</Text>
                    </View>
                    <TouchableOpacity onPress = {this._onPressFollow}>
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

// define your styles
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

//make this component available to the app
export default DiscoverPeopleCell;
