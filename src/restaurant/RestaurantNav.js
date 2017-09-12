import React, { Component } from 'react'
import { Navigator, Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, ListView } from 'react-native'
import AtoZListView from 'react-native-atoz-listview'
import RestaurantSearch from './RestaurantSearch'
import Search from '../searchbox/AutoCompleteSearchBox.js'
const{width, height} = Dimensions.get('window')
var isLocationMenu = false;
var isdropdown = false;

const restaurantData = [
    {text: 'American'},
    {text: 'Breakfast & Brunch'},
    {text: 'Burgers'},
    {text: 'Chinese'},
    {text: 'Indian'},
    {text: 'Italian'},
    {text: 'Japanese'},
    {text: 'Korean'},
    {text: 'Mexican'},
    {text: 'Pizza'},
    {text: 'Sandwiches'},
    {text: 'Seafood'},
    {text: 'Steakhouse'},
    {text: 'Sushi'},
    {text: 'Thai'},
    {text: 'Vietnamese'}
];

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class RestaurantNav extends Component {
  constructor (props) {
    super(props);
    this.state = {
        restaurantName: '',
        locationName: '',
        isSuggestionList: false,
        isLocationMenu: false,
        isdropdown : false,
        str_restaurant: 'Restaurant',
        str_searchRestaurant: '',
        params:'',
        suggestedArray:[],
        dataSource: ds.cloneWithRows([])
    }
  }

  loadListView() {
      this.setState ({
            dataSource: ds.cloneWithRows(this.state.suggestedArray.map(function (element) {
                return element.text
            }))
      })
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    return (
      <TouchableOpacity onPress={() => {
          this.pressRow(rowID);
        }}>
        <View style={styles.cell}>
           <Text style={styles.celltext}>
              {rowData}
           </Text>
        </View>
      </TouchableOpacity>
    );
  }

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View
        key={`${sectionID}-${rowID}`}
        style={{
          height: 1,
          backgroundColor: '#CCCCCC',
        }}
      />
    );
  }

  pressRow(rowID) {
    this.setState ({str_searchRestaurant:this.state.suggestedArray[rowID].text})
    this.setState({ isSuggestionList: false })
  }

  _onPressSearch(){
      var searchText = this.state.str_searchRestaurant
      var params = '&query=' + searchText + '&rank=' + 'distance' + '&price=' + ''
      console.log(params)
      this.setState({ params:params })
  }

  showDropDown(){
      if(this.state.isdropdown == true){
          return(                                                                          
              <View style = {styles.dropView}>
                  <TouchableOpacity onPress = {this.restaurantTag}>
                      <Text style = {{color: 'white',height: 20}}>Restaurant</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress = {this.dishTag}>
                      <Text style = {{color: 'white', marginTop: 7}}>Dish</Text>
                  </TouchableOpacity>
              </View>
          );     
      }else{
          return null;
      }
  }

  _onPressRestaurant = () => {
      isdropdown =! isdropdown
      this.setState({isdropdown})
  }

  restaurantTag = () => {
      isdropdown =! isdropdown
      this.setState({
          str_restaurant:'Restaurant',
          str_searchRestaurant:'Search Restaurants',
          isdropdown: isdropdown,
      })
  }
  dishTag = () => {
      isdropdown =! isdropdown
      this.setState({
          str_restaurant:'Dish',
          str_searchRestaurant: 'Dish',
          isdropdown: isdropdown,
      })
  }

  findData() {
    if (this.state.str_searchRestaurant === '') {
      return [];
    }
    const regex = new RegExp(`${this.state.str_searchRestaurant.toString().trim()}`, 'i');
    return restaurantData.filter(data => data.text.search(regex) >= 0);
  }
  
  render () {

    const restaurantData = this.findData();
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

    return (
        <View style = {styles.wrapper}>
            <View style = {styles.navview}>
                <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Search</Text>
            </View>
            <View style = {styles.menuview}>
                <View style = {{height:40, flexDirection:'row', alignItems:'center'}}>

                    <TouchableOpacity onPress = {this._onPressRestaurant}>
                            <Text style = {{color:'white', marginLeft: 10, textAlign:'center'}}>{this.state.str_restaurant}</Text>
                    </TouchableOpacity>  
                    <View style = {{ height:40, position:'absolute', right:10, left: 90}}>
                        <Search
                            ref = 'SearchBar'
                            keyword = {this.state.str_searchRestaurant}
                            backgroundColor = 'transparent'
                            titleCancelColor = 'white'
                            onChangeText = {(text) => {
                                this.setState({str_searchRestaurant: text})
                                this.setState({suggestedArray: this.findData()})
                                this.setState({isSuggestionList: true})
                                this._onPressSearch()
                                this.loadListView()
                            }}
                            onFocus = {() =>{
                                this.setState({isLocationMenu : true})
                            }}
                            onCancel = {() =>{
                                this.setState({isLocationMenu : false})
                                this.setState({isSuggestionList: false})
                            }}
                            onSearch = {() => {
                                this._onPressSearch()
                            }}
                        />
                    </View>
                </View>
                {
                    (this.state.isLocationMenu)?
                    <View style = {{height:40, flexDirection:'row', alignItems:'center',marginTop:-5}}>
                        <Text style = {{color:'white', marginLeft: 10}}>Location</Text>
                        <View style = {{ height:40, position:'absolute', right:10, left: 90}}>
                            <Search
                                ref = 'SearchBar'
                                placeholder =' Search Locations'
                                backgroundColor = 'transparent'
                                titleCancelColor = 'white'
                            />
                        </View>
                    </View>
                    :
                    null
                }
            </View>
            <View style = {styles.suggestionListViewContainer}>
                {
                    (this.state.isSuggestionList)?
                    <ListView
                        removeClippedSubviews = {false}
                        dataSource={this.state.dataSource}
                        renderRow={this.renderRow.bind(this)}
                        renderSeparator={this.renderSeparator.bind(this)}
                        enableEmptySections={true}
                    />
                    :
                    null
                }
            </View>
            <RestaurantSearch navigator = {this.props.navigator} params1 = {this.state.params}/>
            {this.showDropDown()}
        </View>
    )
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
    menuview:{
        width: width,
    //   backgroundColor:'lightgray',
        backgroundColor:'#652D6C',
    },
    dropView:{
        width: 100,
        height: 60,
        backgroundColor: '#652D6C',
        position:'absolute',
        left: 0,
        top: 90,
        justifyContent:'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 15,
        margin: 2
    },
    cell: {
        height: 30,
        backgroundColor: '#EEEEEE',
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    suggestionListViewContainer: {
        flex: 1,
        position: 'absolute',
        right: 74,
        left: 95,
        top: 90,
        borderWidth: 0,
        borderRadius: 3,
        borderColor:'#DDDDDD',
        opacity: 1,
        zIndex: 1001
    }
});

export default RestaurantNav
