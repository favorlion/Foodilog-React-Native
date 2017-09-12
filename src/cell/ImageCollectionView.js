//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableHighlight, TouchableOpacity, AsyncStorage, Navigator, Image, ListView} from 'react-native';
import GridView from 'react-native-gridview'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var photos1 = [{'name':'view1'},{'name':'view1'}, {'name':'view1'}, {'name':'view1'}, {'name':'view1'}, {'name':'view1'}, {'name':'view1'}, {'name':'view1'}];
const itemsPerRow = 3

var REQUEST_URL = ''
var photos = [];
var thumbPhotos = [];

// create a component
class ImageCollectionView extends Component {
    constructor(props){
        super(props)
        const ds = new  GridView.DataSource({rowHasChanged:(r1, r2) => r1 != r2})

        this.state = {
             dataSource: ds.cloneWithRows(photos),
             photos:[],
        }
    }

    componentWillMount() {
        this.initPhotos()
    }

    initPhotos(){
        photos = []
        for(var i = 0 ; i < Object.keys(this.props.data).length; i++){
            // REQUEST_URL = ':80/v1/resource/' + this.props.data[i] + 'L'
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.HEAD_ICON_RES_URL + this.props.data[i] + 'L'
            photos.push(REQUEST_URL)
        }
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(photos)
        })
        
    }

    render() {
    
        return (
            <View style={styles.container}>
                <ListView
                    contentContainerStyle = {{flexDirection:'row', flexWrap:'wrap'}}                   
                    dataSource = {this.state.dataSource}
                    renderRow = {(data) =><Image source = {{uri:data}} style = {styles.image}/>}
                    enableEmptySections = {true}
                    style = {styles.listView}/>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        width: width,
    },
    image:{
        width: 60,
        height: 60,
        marginLeft: (width - 300)/6,
        marginTop:8,
        resizeMode: 'contain',
    },
    item:{
        backgroundColor:'red',
        margin: 3,
        width: 100,
        
    },
    listView:{
        paddingBottom : 8,
    },
});

//make this component available to the app
export default ImageCollectionView;
