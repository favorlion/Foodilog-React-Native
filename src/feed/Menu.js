//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, ListView, ScrollView, AsyncStorage} from 'react-native';
import API from '../service/API'
import MenuDishCell from '../cell/MenuDishCell'
import MenuDishHeaderCell from '../cell/MenuDishHeaderCell'
import Search from 'react-native-search-box';
import AtoZListView from 'react-native-atoz-listview';

const {width, height} = Dimensions.get('window');
var categories = []
var menus = [];
var userAdded = [];
var searchResult = [];
var explandDefault = true;
var isExpland = [];

// create a component
class Menu extends Component {
    constructor(props){
        super(props);
        const ds = new ListView.DataSource({
            rowHasChanged:(r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        })
        this.state = {
            dataSource: ds.cloneWithRowsAndSections(categories),
            searchText: '',
        }
    }
    _onPressBack = () => {
        this.props.navigator.pop();
    }
    _onPressAdd = () =>{
        this.props.navigator.push({
            name:'menuadd'
        })
    }
    _onPressSearch(){
        searchResult = []
        var text = this.state.searchText
        categories.forEach(function(menuSection){
            var newSection = []
            if(menuSection.dishs){
                if(menuSection.dishs.length > 0){
                    (menuSection.dishs).forEach(function(dish){
                        if(dish.name.toLowerCase().indexOf(text) !== -1){
                            newSection.push(dish)
                        }
                    })
                    if(newSection.length > 0){
                        if(!searchResult[menuSection.name]){
                            searchResult[menuSection.name] =[]
                        }
                        newSection.forEach(function(item){
                            searchResult[menuSection.name].push(item)
                        })
                    }
                }
            }else{
                var newSection= []
                searchResult = []
                categories.forEach(function(dishItem){
                    if(dishItem.name.toLowerCase().indexOf(text) !== -1){
                        newSection.push(dishItem)
                    }

                });
                newSection.forEach(function(item){
                    if(!searchResult[item.category]){
                        searchResult[item.category] = []
                    }
                    searchResult[item.category].push(item)
                })
                console.log(searchResult)          
            }
        })
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(searchResult),
        })
    }

    componentWillMount() {
        this.getDishList()
    }

    getDishList(){
        categories = []
        menus = []
        userAdded = []
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(categories),
        })
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.GET_MENU_URL + this.props.rid + '?token=' + value
            fetch(REQUEST_URL, {
                method: 'GET',
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => response.json())
            .then((responseData) => {
                console.log(responseData)
                if(responseData.ok == true){
                    var sections = [];
                    menus = responseData.menus
                    userAdded = responseData.userAdded 
                    if(menus != null){
                        if(menus.length > 0){
                            var sections = []
                            menus.forEach(function(menu){
                                if(menu.name){
                                    (menu.sections).forEach(function(section){
                                        if(section.name){
                                            section.name = menu.name + '-' + section.name
                                        }
                                        sections.push(section)
                                    })
                                }else{
                                    sections.push(menu.sections)
                                }
                            })
                            categories = sections
                            var dishCategoryMap = []
                            categories.forEach(function(dishItem){
                                if(!dishCategoryMap[dishItem.name]){
                                    dishCategoryMap[dishItem.name] = []
                                }
                                (dishItem.dishs).forEach(function(item){
                                    dishCategoryMap[dishItem.name].push(item)
                                })
                            })
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRowsAndSections(dishCategoryMap),
                            })
                        }else{
                            categories = []
                        }


                        if(userAdded.length > 0){
                            userAdded.forEach(function(dish){
                                categories.push(dish)
                            })
                            var dishCategoryMap = []
                            categories.forEach(function(dishItem){
                                if(!dishCategoryMap[dishItem.category]){
                                    dishCategoryMap[dishItem.category] = []
                                }
                                dishCategoryMap[dishItem.category].push(dishItem)
                            });
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRowsAndSections(dishCategoryMap),
                            })
                        }

                        if(categories.length > 5){
                            explandDefault = false
                        }
                    }
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style = {{color:'white', fontSize:14, fontWeight:'bold'}}>{this.props.rname}</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress = {this._onPressAdd} style = {styles.addButton}>
                         <Text style = {{color:'white', fontSize:14}}>Add</Text>
                     </TouchableOpacity>
                </View>
                <View style = {{flex:1}}>
                    <ScrollView>
                        <Search
                            ref = 'Dish Name'
                            titleCancelColor = '#652D6C'
                            backgroundColor = 'lightgray'
                            cancelTitle = 'Cancel'
                            onChangeText = {(text) => {
                                this.setState({searchText: text})
                                this._onPressSearch()
                            }}
                            onSearch = {() => {
                                this._onPressSearch()
                            }}/> 
                        <ListView
                            dataSource = {this.state.dataSource}
                            renderRow = {(data) => <MenuDishCell rowdata = {data} navigator ={this.props.navigator}/>}
                            renderSectionHeader = {(sectionData, category) => <MenuDishHeaderCell data = {category} />}
                        />
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
        backgroundColor:'white',
    },
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
    addButton:{
        position: 'absolute',
        right: 10,
    },
});

//make this component available to the app
export default Menu;
