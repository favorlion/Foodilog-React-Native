import React, { Component } from 'react'
import { Navigator, Text, StyleSheet, Dimensions, View, ScrollView, AsyncStorage,Button, Image, TouchableOpacity, Slider,TextInput,  } from 'react-native'
import FLSliderView from '../cell/FLSliderView'
import FLFaceView from '../cell/FLFaceView'
import FLLog from '../Logic/Model/FLLog'
import RestaurantInfo from '../Logic/Model/RestaurantInfo'

const{width, height} = Dimensions.get('window');
var resName = ''

export default class NewNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedIndex: 0,
      slider1: 0.7,
      slider2: 0.7,
      slider3: 0.7,
      slider4: 0.7,
      resName: '',
      rid: '',
      rname:'',
    }
  }

  _onPressBack = () =>{
      this.props.navigator.pop();
  }

  showCancelButton(){
      if(this.props.name == 'tab'){
          return null
      }else{
          return(
              <TouchableOpacity onPress = {this._onPressBack} style = {styles.cancel}>
                  <Text style = {{marginTop:10, color:'white', fontSize:15,}}>Cancel</Text>
              </TouchableOpacity>
          )        
      }
  }
  _onPressRestaurantList = () => {
      this.props.navigator.push({
          name: 'restaurantlist',
      })
  }
  componentWillReceiveProps(nextProps) {
      this.setState({
          rname:'',
          slider1 : 0.7,
          slider2 : 0.7,
          slider3 : 0.7,
          slider4 : 0.7,    
      })
      AsyncStorage.getItem('isRestaurantInfo').then((isrestaurant) =>{
          if(isrestaurant == 'true'){
              AsyncStorage.getItem('RestaurantName').then((name) => {
                  this.setState({
                      rname : name, 
                  })
              })
              AsyncStorage.getItem('RestaurantID').then((id) =>{
                  this.setState({rid : id})
              })
          }else{
              this.setState({
                    rname:'',
                    slider1 : 0.7,
                    slider2 : 0.7,
                    slider3 : 0.7,
                    slider4 : 0.7,    
                })
          }
      })
  }

  _onPressAddDish = () => {
      if(this.state.rid == ''){
          alert('Please choose a restaurant first')
      }else{
          this.props.navigator.push({
              name: 'dishes',
              rid: this.state.rid,
          })
      }
  }

  render () {
    return (
        <View style = {styles.wrapper}>
            <View style = {styles.navview}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>New Log</Text>
                {this.showCancelButton()}
            </View>

            <ScrollView>

              <View style = {{flex:1, flexDirection:'column', padding:15,}}>
                  <Text style = {{color:'dimgray', marginTop:20}}>OVERALL RATING</Text>
                  <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 20}}>
                        <Text style = {{color:'black', fontSize:14}}>Overall</Text>
                        <Slider
                            value={this.state.slider1}
                            onValueChange={(value) => this.setState({slider1:value})} 
                            style = {styles.slider}
                            maximumTrackTintColor = {'#652D6C'}/>
                        <View style = {styles.sliderImage}>
                            <FLFaceView score = {this.state.slider1*100} type = 'big'/>
                        </View>  
                  </View>
                
                  <Text style = {{color:'dimgray', marginTop:35}}>OVERALL COMMENT</Text>
                
                  <TouchableOpacity onPress = {this._onPressRestaurantList}>
                      <TextInput 
                        underlineColorAndroid = 'transparent' 
                        placeholder = 'Restaurant name' 
                        editable = {false} 
                        style = {styles.textinput}
                        value = {this.state.rname}/>          
                  </TouchableOpacity>

                  <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 20}}>
                    <Text style = {{color:'black', fontSize:14}}>Ambiance</Text>
                    <Slider
                        value={this.state.slider2}
                        onValueChange={(value) => this.setState({slider2:value})} 
                        style = {styles.slider}
                        maximumTrackTintColor = {'#652D6C'}/>
                    <View style = {styles.sliderImage}>
                        <FLFaceView score = {this.state.slider2*100} type = 'big'/>
                    </View>
                  </View>

                  <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 20}}>
                    <Text style = {{color:'black', fontSize:14}}>Service</Text>
                    <Slider
                        value={this.state.slider3}
                        onValueChange={(value) => this.setState({slider3: value})} 
                        style = {styles.slider}
                        maximumTrackTintColor = {'#652D6C'}/>
                    <View style = {styles.sliderImage}>
                        <FLFaceView score = {this.state.slider3*100} type = 'big'/>
                    </View>
                  </View>

                  <View style = {{flexDirection:'row', width:width, alignItems:'center', marginTop: 20}}>
                    <Text style = {{color:'black', fontSize:14}}>Value</Text>
                    <Slider
                        value={this.state.slider4}
                        onValueChange={(value) => this.setState({slider4:value})} 
                        style = {styles.slider}
                        maximumTrackTintColor = {'#652D6C'}/>
                    <View style = {styles.sliderImage}>
                        <FLFaceView score = {this.state.slider4*100} type = 'big'/>
                    </View>
                  </View>

                  <TextInput 
                      underlineColorAndroid = 'transparent'
                      multiline = {true}
                      maxLength = {100}
                      placeholder = 'Comments (in 100 chars)' 
                      style = {styles.commentText}/>
                  
                  <Text style = {{marginTop:30}}>DISHES</Text>

                  <TouchableOpacity onPress = {this._onPressAddDish} style = {styles.button}>
                      <Text style = {{color:'white', fontSize:16}}>Add Dish</Text>   
                  </TouchableOpacity>

                  <Text style = {{marginTop:40}}>OTHER PHOTOS</Text>

                  <TouchableOpacity>
                      <Image source = {require('../images/add_photo.png')} style = {{width:60, height:60, marginTop:20,}} />
                  </TouchableOpacity>

                  <View style = {{flexDirection:'row', width:width-30, height:60, alignItems:'center', justifyContent:'center', marginTop:30}}>
                      <TouchableOpacity  onPress = {this._onPressFacebook} style = {styles.shareButton}>
                           <Image source = {require('../images/facebook_normal.png')} style={styles.facebook}/>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress = {this._onPressTwitter} style = {styles.shareButton}>
                          <Image source = {require('../images/twitter_normal.png')} style={styles.facebook}/>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress = {this._onPressSina} style = {styles.shareButton}>
                          <Image source = {require('../images/sina_normal.png')} style={styles.facebook}/>
                      </TouchableOpacity>
                      <TouchableOpacity  onPress = {this._onPressPinterest} style = {styles.shareButton}>
                          <Image source = {require('../images/pinterest_normal.png')} style={styles.facebook}/>
                      </TouchableOpacity>
                 </View>

                 <View style = {{flexDirection:'row', flex:1}}>
                    <TouchableOpacity onPress = {this._onPressFavorite} style = {styles.button1}>
                        <Text style = {{color:'white', fontSize:16}}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressDiscover} style = {styles.button1}>
                        <Text style = {{color:'white', fontSize:16}}>Post</Text>
                    </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
        </View>
    );
  }
}


const styles = StyleSheet.create({
  wrapper:{
      flex:1,
      backgroundColor:'white',
    },
    navview:{
      backgroundColor: '#652D6C',
      width: width,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },
    cancel:{
      position:'absolute',
      left: 10,
      width: 60,
      height: 40,
    },
    commentview:{
        width: width,
        height: 46,
        backgroundColor:'#EFEFF4',
        position:'absolute',
        bottom: 0,
        left: 0,
        justifyContent: 'center',
    },
    textinput:{
        height:30, 
        width:width-40,  
        borderColor:'gray', 
        borderWidth:1,
        borderRadius:4,
        paddingTop:0,
        paddingBottom:0,
        paddingLeft: 10,
        fontSize:13,
        marginLeft:5,
        marginTop: 10,
        color:'black'
    },
    button:{
      width: width - 30,
      height: 35,
      marginLeft: 0,
      marginTop:20,
      borderRadius: 10,
      backgroundColor:'#38B664',
      justifyContent:'center',
      alignItems:'center',
    },
     button1:{
      width: (width-30)/2-10,
      height: 35,
      marginLeft: 5,
      marginTop:20,
      borderRadius: 10,
      backgroundColor:'#38B664',
      justifyContent:'center',
      alignItems:'center',
    },
    facebook:{
      width:56,
      height:56,
      resizeMode:'contain'
    },
    commentText:{
        width: width-30, 
        backgroundColor: '#EFEFF4', 
        fontSize:14, 
        height: 90, 
        marginTop:20,
        paddingLeft: 5,
        paddingRight: 5
    },
    sliderImage:{
        width:30, 
        height:30, 
        position:'absolute', 
        right:25
    },
    slider:{
        width:width*2/3, 
        marginLeft:5,
        position:'absolute',
        right:55,
    },
    shareButton:{
        alignItems:'center', 
        justifyContent:'center', 
        width: 85
    },

});

