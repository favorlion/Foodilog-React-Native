//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image, Navigator, ListView} from 'react-native';
import DraftCell from '../cell/DraftCell';
const {width, height} = Dimensions.get('window')
var draftsList = [
  {
    name: 'American Restaurant',
    dishCount: 1,
    photoCount: 2,
    date: '5 hours ago',
  },
  {
    name: 'Itanlian Restaurant',
    dishCount: 3,
    photoCount: 2,
    date: '6 hours ago',
  },
  
];

// create a component
class LogDrafts extends Component {
    constructor(props){
        super(props);
        this._onPressBack = this._onPressBack.bind(this);
        
        const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 != r2});
        this.state = {
            dataSource:ds.cloneWithRows(draftsList),
        };
    }
    _onPressBack(){
        this.props.navigator.pop();
    }
    render() {
        return (
            <View style={styles.container}>
                <View style = {styles.navview}>
                    <Text style={{color:'white', fontSize:16, fontWeight:'bold'}}>Drafts</Text>
                    <TouchableOpacity onPress = {this._onPressBack} style = {styles.backButton}>
                        <Image source = {require('../images/back.png')} style = {styles.backImage}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.wrapper}>
                    <ListView 
                        dataSource = {this.state.dataSource}
                        renderRow = {(data)=> <DraftCell rowData={data} onPressClicked={this._onPressCell}/>}
                    />
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
        width: width,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#652D6C',
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
    wrapper:{
        width: width,
        height: height-50,
    }
});

//make this component available to the app
export default LogDrafts;
