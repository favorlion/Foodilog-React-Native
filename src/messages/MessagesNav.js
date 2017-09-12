
import React, { Component } from 'react'
import { Navigator, Text, View, StyleSheet, Dimensions, AsyncStorage, ActivityIndicator, ScrollView, TouchableHighlight, TouchableOpacity, ListView } from 'react-native'
import {PullView} from 'react-native-pull';
import MessageCell from '../cell/MessageCell'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var fromId = '';
var messageLogs = [];

class MessagesNav extends Component {
  constructor (props) {
      super(props);
      this.state = {refreshing:false};
      this.onPullRelease = this.onPullRelease.bind(this);
      this.topIndicatorRender = this.topIndicatorRender.bind(this);
      
      const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
      this.state = {
          dataSource: ds.cloneWithRows(messageLogs),
          fromId: '',
      }
}
  onPullRelease(resolve){
      setTimeout(() => {
        resolve();
      }, 3000)
  }
  componentWillMount() {
      this.getMessages()
  }
  getMessages(){
      messageLogs = [];
      this.setState({
          dataSource: this.state.dataSource.cloneWithRows(messageLogs)
      })
      AsyncStorage.getItem('FoodilogToken').then((value) => {
          var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_MESSAGES_URL + '?token=' + value +'&fromId=' + fromId + '&limit=' + '100'
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
                  messageLogs = responseData.messages
                  this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(messageLogs)
                  })
                  if(responseData.messages.length > 0){
                      this.setState({
                          fromId: messageLogs[messageLogs.length-1].id
                      })
                  }
              }else{
                  alert('No result');
                  messageLogs = [];
                  this.setState({
                      dataSource: this.state.dataSource.cloneWithRows(messageLogs)
                  })
              }
          })
          .catch((e) => {
              console.log(e)
          })
      })
  }

  topIndicatorRender(pulling, pullok, pullrelease){
      const hide = {position:'absolute', left: 10000};
      const show = {position:'relative', left: 0};
      setTimeout(() =>{
          if(pulling){
              this.txtPulling && this.txtPulling.setNativeProps({style:show});
              this.txtPullok && this.txtPullok.setNativeProps({style:hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style:hide});
          } else if(pullok){
              this.txtPulling && this.txtPulling.setNativeProps({style:hide});
              this.txtPullok && this.txtPullok.setNativeProps({style:show});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style:hide});
          } else if(pullrelease){
              this.txtPulling && this.txtPulling.setNativeProps({style:hide});
              this.txtPullok && this.txtPullok.setNativeProps({style:hide});
              this.txtPullrelease && this.txtPullrelease.setNativeProps({style:show});  
          }
      }, 1);
      return(
          <View style = {{flexDirection:'row', justifyContent:'center', alignItems:'center', height: 60}}>
              <ActivityIndicator size = 'small' color = 'gray'/>
              <Text ref = {(c) => {this.txtPulling = c;}}>Loading...</Text>
              <Text ref = {(c) => {this.txtPullok = c;}}>Release to refresh</Text>
              <Text ref = {(c) => {this.txtPullrelease = c;}}>Loading</Text>
          </View>
      );
  }
  
  render () {
    return (
        <View style = {styles.wrapper}>
            <View style = {styles.navview}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Messages</Text>
            </View>

            <View style = {styles.container}>
                <PullView 
                  style = {{width:width}} 
                  onPullRelease = {this.onPullRelease}
                  topIndicatorRender = {this.topIndicatorRender}
                  topIndicatorHeight = {60}>
                  <ListView
                        dataSource = {this.state.dataSource}
                        renderFooter = {() => <View style = {{alignItems:'center', justifyContent:'center'}}>
                                                 <Text style = {{fontSize:13,color:'gray', marginTop:10}}>No more data...</Text>
                                              </View>}
                        renderRow = {(data)=><MessageCell rowdata = {data} 
                                navigator = {this.props.navigator}/>}
                        enableEmptySections = {true}
                  />                  
               </PullView>
            </View>

        </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    flex:1,
    backgroundColor:'white',
  },
  container:{
    flex:1, 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  navview:{
      backgroundColor: '#652D6C',
      width: width,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
});

export default MessagesNav
