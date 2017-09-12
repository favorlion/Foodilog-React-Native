//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Navigator, Image, Dimensions, AsyncStorage, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import FLFSQSearchResult from '../Logic/Model/FLFSQSearchResult'
import FLAnnotation from '../Logic/Model/FLAnnotation'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var placesdataSource = []
var cordinatesArray = []
var placesIDArray = []

// create a component
class RestaurantMapContainer extends Component {
    constructor(props){
        super(props)
        this.state = {
            isDetail: false,
            mapRegion: null,
            // region:{
            //     latitude: 37.78825,
            //     longitude: -122.4323,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0421,
            // },
            dataSource:[],
            markers: [],
        }
    }
    componentWillMount() {
        this.searchRestaurants()
    }
    searchRestaurants(){
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let region = {
                    latitude: Number(position.coords.latitude.toFixed(8)),
                    longitude: Number(position.coords.longitude.toFixed(8)),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,   
                }
                this.setState({
                    mapRegion: region,
                })
                AsyncStorage.getItem('FoodilogToken').then((value) => {
                  placesdataSource = []
                  markers = []
                    REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.SEARCH_URL + '?token=' + value + '&ll=' + region.latitude + ',' + region.longitude
                    fetch(REQUEST_URL, {
                        method: 'GET',
                        headers: {
                            'Accept' : 'application/json',
                            'Content-Type' : 'application/json',
                        }
                    })
                    .then((response) => response.json())
                    .then((responseData) => {
                        if(responseData.ok == true){
                            placesdataSource = responseData.restaurants
                            placesdataSource.forEach(function(place){
                                var coordinateValue = []
                                coordinateValue = {
                                    coordinate:{
                                        latitude: Number(place.location.lat.toFixed(8)),
                                        longitude: Number(place.location.lng.toFixed(8)),
                                    },
                                    id: place.id,
                                    name: place.name,
                                    address: place.location.formattedAddress,
                                    type: place.type,
                                    priceTier: place.priceTier,
                                    distance: place.location.distance,          
                                }
                                markers.push(coordinateValue)
                            })
                            this.setState({
                                markers: markers,
                            })
                            this.setUpMapView()
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
                
            },
            (error) => alert(error.message)
        )
    }

    onRegionChange(region){
        this.setState({ mapRegion: region });
    }

    setUpMapView(){
        var annotations = [FLAnnotation];
        console.log('123123123')
        console.log(this.state.markers)   
    }

    takeMarker = (marker) => {

        console.log('==========')
        console.log(marker)

        this.props.navigator.push({
            name:'restaurantDetail',
            restaurantId: marker.id,
            restaurantName: marker.name,
        })

    }

    showRestaurantDetail(){
        return(
            <View style = {styles.setupRestaurantView}>
                <Image 
                    source = {require('../images/feed_image_default.png')} 
                    style = {styles.backgroundimage}
                    defaultSource = {require('../images/feed_image_default.png')}/>
            </View>
        );
    }

    render() {
      return (
          <View style ={styles.container}>
              <MapView
                  provider = {this.props.provider}  
                  style = {styles.map}
                  region = {this.state.mapRegion}>

                  {this.state.markers.map(marker => (
                        <MapView.Marker
                            key = {marker.id}
                            coordinate = {marker.coordinate}
                            title = {marker.name}
                            description = {marker.address}
                            pinColor = 'purple'
                            
                            onCalloutPress = {this.takeMarker.bind(this, marker)}
                        >
                              
                        </MapView.Marker>
                        
                  ))}
                  
              </MapView>

              {/*{this.showRestaurantDetail()}*/}
              
      </View>
      );
  }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    setupRestaurantView:{
        width: width,
        height: 115,
        backgroundColor: 'yellow',
        position: 'absolute',
        bottom: 0,
    },
    backgroundimage:{
        resizeMode: 'contain',
        width: width,
        height: 115
    }
});

//make this component available to the app
export default RestaurantMapContainer;
