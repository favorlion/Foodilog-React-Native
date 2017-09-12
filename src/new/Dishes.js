//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Navigator, TouchableOpacity, ListView, ScrollView, AsyncStorage } from 'react-native';
import API from '../service/API'
import Search from 'react-native-search-box';
import MenuDishCell from '../cell/MenuDishCell'
import MenuDishHeaderCell from '../cell/MenuDishHeaderCell'
import FLMenu from '../Logic/Model/FLMenu'
import FLMenuSection from '../Logic/Model/FLMenuSection'

const{width, height} = Dimensions.get('window');
var menus = [];
var userAdded = [];
var inSearch  = false;
var dataSource = [];
var searchResult = [];
var explandDefault = true;
var isExpland = [];

// create a component
class Dishes extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2,
            sectionHeaderHasChanged:(s1, s2) => s1 !== s2
        });

        this.state = {
            dataSource: ds.cloneWithRowsAndSections(dataSource),
            searchText:'',
        }
    }

    _onPressCancel = () => {
        this.props.navigator.pop()
    }
    _onPressDone = () => {
        this.props.navigator.pop()
    }

    _onPressSearch(){
        
    }

    _onPressAdd = () => {
        this.props.navigator.push({
            name:'menuadd'
        })
    }

    componentDidMount() {
        this.getDishList()
    }
    getDishList(){
        dataSource = []
        menus = []
        userAdded = []
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataSource),
        })
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_MENU_URL + this.props.rid + '?token=' + value
            // var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_MENU_URL + '59106acb00827662e5cc77b4' + '?token=' + value
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
                    var sections = [];
                    menus = responseData.menus
                    userAdded = responseData.userAdded 
                    if(menus.length > 0){
                        menus.forEach(function(menu){
                            if(menu.name){
                                for(var i=0; i<menu.sections.length; i++){
                                    if(menu.sections[i].name){
                                        menu.sections[i].name = menu.name + '-' + menu.sections[i].name
                                    }
                                    sections.push(menu.sections[i])
                                }
                            }else{
                                sections.push(menu.sections)
                            }
                        })
                        dataSource = sections
                    }else{
                        dataSource = []
                    }

                    userAdded.forEach(function(dish){
                        dataSource.push(dish)
                    })

                    var dishCategoryMap = []
                    dataSource.forEach(function(dishItem){
                        if(!dishCategoryMap[dishItem.category]){
                            dishCategoryMap[dishItem.category] = []
                        }
                        dishCategoryMap[dishItem.category].push(dishItem)
                    });
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRowsAndSections(dishCategoryMap),
                    })
                }
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Dishes</Text>  
                    <TouchableOpacity onPress = {this._onPressCancel} style = {styles.backButton}>
                        <Text style = {styles.edit}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressDone} style = {styles.doneButton}>
                        <Text style = {styles.edit}>Done</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{flex:1}}>
                    <ScrollView>
                        <Search
                            ref = '  Restaurant Name  '
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

                        <ListView 
                            dataSource = {this.state.dataSource}
                            renderRow = {(data) => <MenuDishCell rowdata = {data} navigator ={this.props.navigator}/>}
                            renderSectionHeader = {(sectionData, category) => <MenuDishHeaderCell data = {category} />}
                            />

                        <TouchableOpacity onPress = {this._onPressAdd} style = {styles.addButton}>
                             <Text style = {{color:'white', fontSize:16}}>Add New Dish</Text>   
                        </TouchableOpacity>

                        <View style = {styles.space}></View>
                        
                    </ScrollView>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    backButton:{
        position:'absolute',
        left: 10,
        width: 60,
        height: 40,
        alignItems:'center',
        justifyContent: 'center',
    },
    doneButton:{
        position:'absolute',
        width: 50,
        height: 40,
        right: 10,
        alignItems:'center',
        justifyContent: 'center',
    },
    edit: {
        color: 'white',
        fontSize: 15
    },
    addButton:{
        width: width - 20,
        height: 35,
        marginLeft: 10,
        marginTop:20,
        borderRadius: 10,
        backgroundColor:'#38B664',
        justifyContent:'center',
        alignItems:'center',
    },
    space:{
        width: width,
        height: 50,
        backgroundColor: 'transparent',
    },

    
});

//make this component available to the app
export default Dishes;
