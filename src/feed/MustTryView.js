//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, AsyncStorage, ListView} from 'react-native';
import MustTryDishCell from '../cell/MustTryDishCell'
import API from '../service/API'

const{width, height} = Dimensions.get('window')
var musttryList = [];

// create a component
class MustTryView extends Component {
    constructor(props){
        super(props)
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource: ds.cloneWithRows(musttryList)
        }
    }
    _onPressBack = () => {
        this.props.navigator.pop();
    }
    
    componentWillMount() {
        this.getMustTry()
    }
    
    getMustTry(){
        musttryList = []
        AsyncStorage.getItem('FoodilogToken').then((value) => {
            var REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + API.MUST_TRY_URL + this.props.rid + '?token=' + value
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
                    musttryList = responseData.dishs
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(musttryList)
                    })
                }else{
                    alert('There is no dish')
                }
            })
            .catch((error) =>{
                console.log(error)
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Must Try</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <ListView 
                        dataSource = {this.state.dataSource}
                        renderRow = {(data) => <MustTryDishCell rowdata = {data} navigator = {this.props.navigator}/>}
                        enableEmptySections = {true}/>
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
        backgroundColor:'#652D6C',
        width: width,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row',
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
});

//make this component available to the app
export default MustTryView;
