import React, { Component } from 'react'
import { Navigator, Text, ListView, View, StyleSheet, StatusBar,Dimensions, 
  Image,Button, TouchableHighlight, TouchableOpacity, ScrollView, AsyncStorage} from 'react-native'
import API from '../service/API'
import FeedRow from '../cell/FeedRow'

const{width, height} = Dimensions.get('window');
var ok = false;
var feedLogs = [];
var dishs = [];
var isDiscoverViewHidden = true;

class FeedNav extends React.Component {
  constructor (props) {
    super(props)
  
    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
    this.state = {
        dataSource:ds.cloneWithRows(feedLogs),
        isDiscoverViewHidden : true,
    };
  }

  _onPressDiscoer = () => {
    this.props.navigator.push({
      name:"discover_people"
    });
  }
 _onPressCell = () => {
   this.props.navigator.push({
      name:'feed_detail'
   });
 }
  componentWillMount() {
    this.getFeedList();
  }
  getFeedList(){
    feedLogs =[];
    this.setState({
        dataSource:this.state.dataSource.cloneWithRows(feedLogs)
    });

    AsyncStorage.getItem('FoodilogToken').then( (value) => { 
        var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_LOGLIST_URL + 'friends?token=' + value + '&limit=100'
        console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>" + REQUEST_URL);
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
            if(ok == true){
                console.log("===================");
                feedLogs = responseData.logs;
                const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
                this.setState({
                    dataSource:ds.cloneWithRows(feedLogs)
                });
            }else{
                alert('No result')
            }
        }).catch((e) => {
            console.log(e)
        })   
      });

      AsyncStorage.getItem('FoodilogToken').then((uid)=>{
        var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_FOLLOW_URL + '?token=' + uid
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
                if(responseData.users.length>0){
                    isDiscoverViewHidden = true
                }else{
                    isDiscoverViewHidden = false
                }
                this.setState({isDiscoverViewHidden})
            }
        }).catch((error) =>{
            console.log(error)
        })
      })
      
  }

  _discoverPeopleButton(){
      const isDiscoverViewHidden = this.state.isDiscoverViewHidden
      if(isDiscoverViewHidden == false){
          return(
            <TouchableOpacity onPress = {this._onPressDiscoer} style = {styles.button}>
                <Text style = {{color:'white', fontSize:16}}>Discover People</Text>   
            </TouchableOpacity>
          );
      }else{
          return null;
      }
  }
  render () {
    
    return (
      <View style = {styles.wrapper}>
          <StatusBar barStyle = 'light-content'/>
          <View style = {styles.navview}>
            <Image source={require('../images/LOGO.png')} style = {styles.logo}/>
          </View>
          <ScrollView style = {styles.scroll}>
              <ListView
                  dataSource = {this.state.dataSource}
                  renderRow = {(data) => <FeedRow rowdata = {data} navigator = {this.props.navigator}/>}
                  enableEmptySections = {true}
               />
               {this._discoverPeopleButton()}       
              <View style = {{backgroundColor:'transparent', height:40}}></View>
          </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    wrapper:{
      flex: 1,
      backgroundColor:'white',
    },
    navview:{
      backgroundColor: '#652D6C',
      width: width,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    logo:{
      width:width*0.3,
      height:25,
      resizeMode: 'contain'
    },
    listView:{
      flex: 1,
    },
    button:{
      width: width - 40,
      height: 35,
      marginLeft: 20,
      marginTop:20,
      borderRadius: 10,
      backgroundColor:'#38B664',
      justifyContent:'center',                                            
      alignItems:'center',
    },
});

export default FeedNav
