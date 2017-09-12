//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView, ListView, ActivityIndicator, TouchableWithoutFeedback, TouchableOpacity, Image, Navigator} from 'react-native';
import SearchRestaurantCell from '../cell/SearchRestaurantCell'
import RestaurantTableView from './RestaurantTableView'
import RestaurantMapContainer from './RestaurantMapContainer'
import RestaurantFilter from './RestaurantFilter'
import {PullView} from 'react-native-pull';

const{width, height} = Dimensions.get('window');

var resturantList = [];

var showMap = false;
var showFilter = false;

// create a component
class RestaurantSearch extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(resturantList),
            refreshing: false,
            showMap: false,
            showFilter: false,
            params: new RestaurantFilter(),
            search_param:''
        };
        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
        this._onPressMap = this._onPressMap.bind(this);
        this._onPressFilter = this._onPressFilter.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            search_param : nextProps.params1
        })
    }

    _onPressMap(){
        showMap = !showMap;
        this.setState({showMap});
    }

    _onPressFilter(){
        showFilter = !showFilter;
        this.setState({showFilter});

        console.log('**********')
        var a = this.state.params._onPressApply()
        console.log(a)

    }

    onPullRelease(resolve){
      setTimeout(() => {
        resolve();
      }, 3000)
    }

    topIndicatorRender(pulling, pullok, pullrelease){
        const hide = {position:'absolute', left: 10000};
        const show = {position: 'relative', left:0}
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


    render() {
        const showMap = this.state.showMap;
        const showFilter = this.state.showFilter; 
        if(!showMap){
            if (showFilter){
                return (
                    <View style={styles.container}>
                        <View style = {styles.menuview}>
                            <TouchableOpacity onPress = {this._onPressMap} style = {styles.mapview}>
                                <Text style = {{color:'darkgray'}}>Map</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this._onPressFilter} style = {styles.filterview}>
                                <Text style = {{color:'darkgray'}}>Filter</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <View style = {{backgroundColor:'lightgray', width:1, height:42, position:'absolute', left:width/2, top:1}}></View>
                            <View style = {{backgroundColor:'lightgray', width:width, height:1, position:'absolute', bottom:1, left:0}}></View>
                        </View>

                        <RestaurantFilter navigator = {this.props.navigator} doneButtonPressed = {this._onPressFilter}/> 
                                      
                    </View> 
                 );
            }else{
                return (
                    <View style={styles.container}>
                        <View style = {styles.menuview}>
                            <TouchableOpacity onPress = {this._onPressMap} style = {styles.mapview}>
                                <Text style = {{color:'darkgray'}}>Map</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this._onPressFilter} style = {styles.filterview}>
                                <Text style = {{color:'darkgray'}}>Filter</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <View style = {{backgroundColor:'lightgray', width:1, height:42, position:'absolute', left:width/2, top:1}}></View>
                            <View style = {{backgroundColor:'lightgray', width:width, height:1, position:'absolute', bottom:1, left:0}}></View>
                        </View>

                        <RestaurantTableView navigator = {this.props.navigator} search_param = {this.state.search_param}/>                    
                    </View>
                );
            }
            
            
        }else{
            if(showFilter){
                return (
                    <View style={styles.container}>
                        <View style = {styles.menuview}>
                            <TouchableOpacity onPress = {this._onPressMap} style = {styles.mapview}>
                                <Text style = {{color:'darkgray'}}>List</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this._onPressFilter} style = {styles.filterview}>
                                <Text style = {{color:'darkgray'}}>Filter</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>                        
                            <View style = {{backgroundColor:'lightgray', width:1, height:42, position:'absolute', left:width/2, top:1}}></View>
                            <View style = {{backgroundColor:'lightgray', width:width, height:1, position:'absolute', bottom:1, left:0}}></View>
                        </View>

                        <RestaurantFilter navigator = {this.props.navigator} doneButtonPressed = {this._onPressFilter}/>
                    </View>
                 );
            }
            else{
                return (
                    <View style={styles.container}>
                        <View style = {styles.menuview}>
                            <TouchableOpacity onPress = {this._onPressMap} style = {styles.mapview}>
                                <Text style = {{color:'darkgray'}}>List</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this._onPressFilter} style = {styles.filterview}>
                                <Text style = {{color:'darkgray'}}>Filter</Text>
                                <Image source = {require('../images/button_down_arrow.png')} style = {{width:12, height:7, marginLeft:5, resizeMode:'contain'}}/>
                            </TouchableOpacity>                        
                            <View style = {{backgroundColor:'lightgray', width:1, height:42, position:'absolute', left:width/2, top:1}}></View>
                            <View style = {{backgroundColor:'lightgray', width:width, height:1, position:'absolute', bottom:1, left:0}}></View>
                        </View>

                        <RestaurantMapContainer navigator = {this.props.navigator}/>
                    </View>
                );
            }
            
        }
    }

}

// define your styles
const styles = StyleSheet.create({
    container: {
          flex: 1,
          backgroundColor:'white',
    },
    menuview:{
        width: width,
        height:44,
        backgroundColor:'white', 
        flexDirection:'row',
    },
    mapview:{
        width:width/2,
        height: 44,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    filterview:{
        width:width/2,
        height: 44,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row',
    },
});



//make this component available to the app
export default RestaurantSearch;
