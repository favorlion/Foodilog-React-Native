import React,{Component} from 'react';
import AtoZListView from 'react-native-atoz-listview';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, TouchableHighlight, ScrollView, ListView, ActivityIndicator,AsyncStorage} from 'react-native';
import Search from 'react-native-search-box';
import DiscoverPeopleCell from '../cell/DiscoverPeopleCell'
import API from '../service/API'

const{width, height} = Dimensions.get('window');
const rowHeight = 40;
var isshowIndicator = false;
var searchText = String
uid = ''
userList = [];

export default class DiscoverPeople extends Component {

    constructor(props){
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
        this.state = {
            dataSource:ds.cloneWithRows(userList),
            isshowIndicator: false,
            animating: true,
            searchText:'',
            uid:'',
        }
        this._onPressBack = this._onPressBack.bind(this);
    }

    _onPressBack(){
        this.props.navigator.pop();
    }
    _onPressCell = () =>{
        this.props.navigator.push({
            name: 'userprofile',
        })
    } 

    setToggleTimeout(){
        this._timer = setTimeout(() => {
            this.setState({animating:!this.state.animating});
            // this.setToggleTimeout();
        }, 3000);
    }

    showIndicator(){
        if(this.state.isshowIndicator){
            return(
                <ActivityIndicator 
                    animating = {this.state.animating}
                    style = {styles.centering}
                    size = 'small'
                    color = 'gray'
                />
            );
        }
    }
    _onPressSearch(){
        susers = [];
        userList = [];
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(userList),
            isshowIndicator:true,
        })
        AsyncStorage.getItem('FoodilogToken').then((value)=>{
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_USER_URL + '?token=' + value + '&name=' + this.state.searchText + '&limit=100'
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData);
                if(responseData.ok == true){ 
                    var susers = responseData.users
                    var uid;
                    for(uid in susers){
                        userList.push(susers[uid]);
                    }
                    console.log(userList);
                    if(userList.length>0){
                        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
                        this.setState({
                            dataSource:ds.cloneWithRows(userList),
                            isshowIndicator:false,
                        })
                    }else{
                        alert('No result');
                        this.setState({
                            isshowIndicator:false
                        })            
                    }
                }
                else{
                    this.setState({
                            isshowIndicator:false
                    })
                    alert('Request failed');
                }
            }).catch((error) =>{
                console.log(error)
            })
      })
    }

    componentWillMount() {
        userList = [];
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(userList),
            isshowIndicator:false,
        })
    }

    render() {
        return (
            <View style = {{flex:1, backgroundColor:'white',}}>
                <View style={styles.navview}>
                    <Text style={{color:'white', fontSize:14, fontWeight:'bold'}}>Discover People</Text>                     
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                         <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                     </TouchableOpacity>
                </View>

                <View>
                    <Search
                        ref = 'SearchBar'
                        placeholder = '  Search Users '
                        titleCancelColor = '#652D6C'
                        backgroundColor = 'lightgray'
                        cancelTitle = 'Cancel'
                        onChangeText = {(text) => {
                            this.setState({searchText : text})
                        }}
                        onSearch = {() => {
                            this._onPressSearch();
                        }}
                    />
                    {this.showIndicator()}
                </View>
                <ScrollView>
                    <TouchableOpacity onPress = {this._onPressDiscoer} style = {styles.facebookbutton}>
                          <Text style = {{color:'white', fontSize:16}}>Facebook friends</Text>   
                     </TouchableOpacity>
                     <ListView
                        dataSource = {this.state.dataSource}
                        renderRow = {(data) => < DiscoverPeopleCell rowdata = {data} navigator = {this.props.navigator} />}
                        enableEmptySections = {true}
                        />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    facebookbutton:{
      width: width - 20,
      height: 35,
      marginLeft: 10,
      marginTop:10,
      borderRadius: 10,
      backgroundColor:'#38B664',
      justifyContent:'center',
      alignItems:'center',
    },
    centering:{
        alignItems:'center',
        justifyContent:'center',
        padding: 5,
        marginTop:-35,
        height:30,        
    },

});