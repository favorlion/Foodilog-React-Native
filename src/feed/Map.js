//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';


const{width, height} = Dimensions.get('window')
var watchID: ?number = null;

// create a component
class Map extends Component {
    constructor(props){
        super(props)
        this.state = {
            mapRegion: null,

        }
    }

    componentWillMount() {
        this.getUserLocation();
    }
    getUserLocation(){
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
            },
            (error) => alert(error.message)
        )

        // this.watchID = navigator.geolocation.watchPosition((position) => {

        //     let region = {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude,
        //         latitudeDelta: 0.0922,
        //         longitudeDelta: 0.0421,
        //     }
        //     this.setState({
        //         mapRegion: region,
        //     })
        // });
        
    }
    _onPressBack = () => {
        this.props.navigator.pop()
    }


    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
    }
    render() {
        console.log(this.props.rinfo)
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>{this.props.rinfo.name}</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {{flex: 1}}>
                    <MapView
                        style = {styles.map}
                        region = {this.state.mapRegion}
                        showsUserLocation = {true}
                        followUserLocation = {true}>

                        <MapView.Marker
                            ref = {ref => { this.marker1 = ref}}
                            coordinate = {{
                                latitude: this.props.rinfo.lat ,
                                longitude: this.props.rinfo.lng ,
                            }}
                            title = {this.props.rinfo.name}
                            description = {this.props.rinfo.address}
                            pinColor = 'purple'/>
                        
                        {/*<MapView.Marker
                            coordinate = {{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}>
                            <View style = {styles.radius}>
                                <View style = {styles.marker}/>
                            </View>
                        </MapView.Marker>*/}

                    </MapView>
                </View>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    navview:{
        backgroundColor: '#652D6C',
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
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
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    radius:{
        height: 50,
        width: 50,
        borderRadius: 50/2,
        overflow: 'hidden',
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        borderWidth: 1,
        borderColor: 'rgba(0,112, 255, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    marker:{
        height: 20,
        width: 20,
        borderWidth: 3,
        borderColor: 'white',
        borderRadius: 20/2,
        overflow: 'hidden',
        backgroundColor: '#007AFF',
    },
});

//make this component available to the app
export default Map;
