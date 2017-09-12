
import React, { Component } from 'react'
import { Navigator, Text, StyleSheet, Dimensions, View, TouchableOpacity, Image, AsyncStorage} from 'react-native'
import API from '../service/API'

const{width, height} = Dimensions.get('window');

class ProfileNav extends Component {
  constructor () {
    super()
    this.state = {
        followers:'',
        followings:'',
        id:'',
        isFollowed:false,
        isFollowingMe:false,
        name:'',
        logs:'',
        facebook:'',
        about:'',
        account:'',
        area:'',
        blocked_till:'',
    }    
  }

  _onPressEdit = () => {
    this.props.navigator.push({
        name:"editprofile",
        username:this.state.name,
        location:this.state.area,
        about:this.state.about,
    })
  }
  _onPressDraft= () =>{
      this.props.navigator.push({
          name:'logdraft'
      })
  }
  _onPressDiscover= () =>{
      this.props.navigator.push({
          name:'discover_people'
      })
  }

  _onPressLogout= () =>{
      this.setState({
          user: {}
      });
      this.props.navigator.popToTop();
  }

  componentWillReceiveProps(){
      this.getProfile()
  }

  componentWillMount() {
      this.getProfile()
  }

  getProfile(){
      AsyncStorage.getItem('FoodilogToken').then((value) => {
          var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_PROFILE_URL + 'me?token=' + value
          console.log('Profile URL == ' + REQUEST_URL)
          fetch(REQUEST_URL,{
              method: 'GET',
              headers: {
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json',
              },
          })
          .then((response) => response.json())
          .then((responseData) => {
              if(responseData.ok == true){
                  console.log(responseData)
                 this.setState({
                     followers: responseData.followers,
                     followings:responseData.followings,
                     id: responseData.id,
                     isFollowed: responseData.isFollowed,
                     isFollowingMe: responseData.isFollowingMe,
                     name: responseData.user.name,
                     logs: responseData.logs,
                     facebook: responseData.socialAccountsfacebook,
                     about: responseData.user.about,
                     account: responseData.user.account,
                     area: responseData.user.area,
                     blocked_till: responseData.user.blocked_till,
                 })
              }else{
                  this.setState({
                     followers: '',
                     followings:'',
                     id: '',
                     isFollowed: false,
                     isFollowingMe: false,
                     name: '',
                     logs: '',
                     facebook:'',
                     about:'',
                     account:'',
                     area:'',
                     blocked_till:'',
                 })
              }
              
          })
          .catch((error) =>{
                console.log(error)
            })
          
      })
  }

  _onPressLogs = () => {
      this.props.navigator.push({
          name:'userlogs' 
      })
  }
  _onPressFollowers = () => {
      this.props.navigator.push({
          name:'userfollowers'
      })
  }

  _onPressFollowing = () => {
      this.props.navigator.push({
          name:'userfollowing'
      })
  }
  _onPressFavorite = () => {
      this.props.navigator.push({
          name: 'myfavorites'
      })
  }

  render () {
      var iconURL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.state.account + 'L'
      return (
        <View style = {styles.wrapper}>
            <View style = {styles.navview}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.state.name}</Text>
                <TouchableOpacity onPress = {this._onPressDraft} style = {styles.draft}>
                    <Text style = {{marginTop:10, color:'white', fontSize:14,}}>Drafts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this._onPressLogout} style = {styles.logout}>
                    <Text style = {{marginTop:10, color:'white', fontSize:14}}>Logout</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this._onPressEdit} style = {styles.edit}>
                    <Image source = {require('../images/edit.png')} style = {styles.editImage}/>
                </TouchableOpacity>
            </View>

            <View style = {styles.headerView}>
                <Image 
                    source = {{uri:iconURL}} 
                    style = {styles.headImageView} 
                    defaultSource = {require('../images/head_image_default.png')}/>
                <Text style = {{color:'white',fontSize:15, backgroundColor:'transparent', marginTop:10,}}>{this.state.about}</Text>
            </View>

            <View style = {styles.followView}>
               <TouchableOpacity  onPress = {this._onPressLogs} style = {{alignItems:'center', justifyContent:'center', width: 100,}}>
                    <Text style = {{color:'#82BB36', fontSize: 15, backgroundColor:'transparent'}}>{this.state.logs}</Text>
                    <Text style = {{color:'gray', fontSize: 13, backgroundColor:'transparent',marginTop: 5,  }}>LOGS</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress = {this._onPressFollowers} style = {{alignItems:'center', justifyContent:'center', width: 100, marginLeft:10}}>
                    <Text style = {{color:'red', fontSize: 15, backgroundColor:'transparent'}}>{this.state.followers}</Text>
                    <Text style = {{color:'gray', fontSize: 13, backgroundColor:'transparent',marginTop: 5,  }}>FOLLOWERS</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress = {this._onPressFollowing} style = {{alignItems:'center', justifyContent:'center', width: 100, marginLeft:10}}>
                    <Text style = {{color:'blue', fontSize: 15, backgroundColor:'transparent'}}>{this.state.followings}</Text>
                    <Text style = {{color:'gray', fontSize: 13, backgroundColor:'transparent',marginTop: 5,  }}>FOLLOWING</Text>
                </TouchableOpacity>
            </View>
            
            <View style = {{flexDirection:'row', width: width, height:20, alignItems:'center', justifyContent:'center'}}>
                <View style = {{width:100, height:1, backgroundColor:'dimgray',position:'absolute', left:15 }}></View>
                <Text style = {{color:'dimgray', fontSize:14}}>Social Accounts</Text>
                <View style = {{width:100, height:1, backgroundColor:'dimgray',position:'absolute', right:15 }}></View>
            </View>
            <View style = {{flexDirection:'row', width:width, height:60, alignItems:'center', justifyContent:'center', marginTop:30}}>
                <TouchableOpacity  onPress = {this._onPressFacebook} style = {{alignItems:'center', justifyContent:'center', width: 85}}>
                    <Image source = {require('../images/facebook_normal.png')} style={styles.facebook}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress = {this._onPressTwitter} style = {{alignItems:'center', justifyContent:'center', width: 85}}>
                    <Image source = {require('../images/twitter_normal.png')} style={styles.facebook}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress = {this._onPressSina} style = {{alignItems:'center', justifyContent:'center', width: 85}}>
                    <Image source = {require('../images/sina_normal.png')} style={styles.facebook}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress = {this._onPressPinterest} style = {{alignItems:'center', justifyContent:'center', width: 85}}>
                    <Image source = {require('../images/pinterest_normal.png')} style={styles.facebook}/>
                </TouchableOpacity>
            </View>

            <View style = {{flexDirection:'row'}}>
                <TouchableOpacity onPress = {this._onPressFavorite} style = {styles.button}>
                    <Text style = {{color:'white', fontSize:15}}>My Favorites</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress = {this._onPressDiscover} style = {styles.button}>
                    <Text style = {{color:'white', fontSize:15}}>Discover People</Text>
                </TouchableOpacity>
            </View>
        </View>
                
    )
  }
}

const styles = StyleSheet.create({
    wrapper:{
      flex:1,
      backgroundColor:'white'
    },
    navview:{
      backgroundColor: '#652D6C',
      width: width,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    draft:{
      position:'absolute',
      left: 10,
      height: 40,
    },
    logout:{
        position: 'absolute',
        right: 10,
        height: 40,
    },
    headerView:{
      flexDirection: 'column',
      width: width,
      height:140,
      backgroundColor: '#652D6C',
      alignItems:'center',
      justifyContent:'center',
    },
    headBackgroundView:{
      position:'absolute',
      width:width,
      height: 140,
    },
    headImageView:{
      width: 80,
      height: 80,
      borderRadius: 40,     
      borderWidth: 2,
      borderColor:'white',
    },
    followView:{
      flexDirection:'row',
      width:width,
      height:80,
      alignItems:'center',
      justifyContent:'center',
    },
    facebook:{
      width:56,
      height:56,
      resizeMode:'contain'
    },
    twitter:{
      width:56,
      height:56,
      resizeMode:'contain'
    },
    button:{
      width: width/2 - 30,
      height: 35,
      marginLeft: 20,
      marginTop:20,
      borderRadius: 10,
      backgroundColor:'#38B664',
      justifyContent:'center',
      alignItems:'center',
    },
    edit:{
        position:'absolute',
        width: 20,
        height: 20,
        right: 70,
    },
    editImage:{
        width: 20,
        height: 20,
        resizeMode: 'contain',
    }

});
export default ProfileNav
