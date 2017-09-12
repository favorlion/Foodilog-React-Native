//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Image, Navigator} from 'react-native';
import SortButton from '../Button/SortButton'
import RestaurantTableView from './RestaurantTableView'
import FilterButton from '../Button/FilterButton'
const {width, height} = Dimensions.get('window');

var isRelevance = false;
var isDistance = true;
var isRating = false;
var isOpennow = false;
var isPrice1 = false;
var isPrice2 = false;
var isPrice3 = false;
var isPrice4 = false;
var isDistance1 = false;
var isDistance2 = false;
var isDistance3 = false;
var isDistance4 = false;
var params = ''

// create a component
class RestaurantFilter extends Component {

    constructor(props){
        super(props);
        this._onPressRelevance = this._onPressRelevance.bind(this);
        this._onPressDistance = this._onPressDistance.bind(this);
        this._onPressRating = this._onPressRating.bind(this);
        this._onPressOpennow = this._onPressOpennow.bind(this);
        this._onPressPrice1 = this._onPressPrice1.bind(this);
        this._onPressPrice2 = this._onPressPrice2.bind(this);
        this._onPressPrice3 = this._onPressPrice3.bind(this);
        this._onPressPrice4 = this._onPressPrice4.bind(this);
        this._onPressDistance1 = this._onPressDistance1.bind(this);
        this._onPressDistance2 = this._onPressDistance2.bind(this);
        this._onPressDistance3 = this._onPressDistance3.bind(this);
        this._onPressDistance4 = this._onPressDistance4.bind(this);
        this._onPressClear = this._onPressClear.bind(this);
        this._onPressApply = this._onPressApply.bind(this);

        this.state = {
            isRelevance : false,
            isDistance : true,
            isRating: false,
            isOpennow: false,
            isPrice1: false,
            isPrice2: false,
            isPrice3: false,
            isPrice4: false,
            isDistance1: false,
            isDistance2: false,
            isDistance3: false,
            isDistance4: false,
            params:''
        }
    }

    

    _onPressRelevance(){
        {this.sortButtonPressedAtIndex(key = 0)}
    }
    _onPressDistance(){
        {this.sortButtonPressedAtIndex(key = 1)}
    }
    _onPressRating(){
        {this.sortButtonPressedAtIndex(key = 2)}
    }
    
    sortButtonPressedAtIndex(key){
        if(key == 0){
            isRelevance = true;
            isDistance = false;
            isRating = false;
        } else if(key == 1){
            isRelevance = false;
            isDistance = true;
            isRating = false;
        } else if (key == 2){
            isRelevance = false;
            isDistance = false;
            isRating = true;
        } 
        this.setState(
            {isRelevance, isDistance, isRating}
        )
        // this._onPressApply()
    }

    _onPressOpennow(){
        isOpennow = !isOpennow;
        this.setState({isOpennow});
        // this._onPressApply()
    }
    _onPressPrice1(){
        isPrice1 = !isPrice1;
        this.setState({isPrice1});
        // this._onPressApply()
    }
    _onPressPrice2(){
        isPrice2 = !isPrice2;
        this.setState({isPrice2});
        // this._onPressApply()
    }
    _onPressPrice3(){
        isPrice3 = !isPrice3;
        this.setState({isPrice3});
        // this._onPressApply()
    }
    _onPressPrice4(){
        isPrice4 = !isPrice4;
        this.setState({isPrice4});
        // this._onPressApply()
    }

    _onPressDistance1(){
        {this.filterButtonPressedAtIndex(key = 0)}
    }
    _onPressDistance2(){
        {this.filterButtonPressedAtIndex(key = 1)}
    }
    _onPressDistance3(){
        {this.filterButtonPressedAtIndex(key = 2)}
    }
    _onPressDistance4(){
        {this.filterButtonPressedAtIndex(key = 3)}
    }
    filterButtonPressedAtIndex(key){
        if(key == 0){
            isDistance1 = true;
            isDistance2 = false;
            isDistance3 = false;
            isDistance4 = false;
        }else if(key == 1){
            isDistance1 = false;
            isDistance2 = true;
            isDistance3 = false;
            isDistance4 = false;
        }else if(key == 2){
            isDistance1 = false;
            isDistance2 = false;
            isDistance3 = true;
            isDistance4 = false;
        }else if(key == 3){
            isDistance1 = false;
            isDistance2 = false;
            isDistance3 = false;
            isDistance4 = true;
        }
        this.setState(
            {isDistance1, isDistance2, isDistance3, isDistance4}
        )
        // this._onPressApply()
    }

    _onPressClear(){

    }

    _onPressApply(){
        params = ''
        if(this.state.isRelevance == true){
            params = 'rank=' + 'relevance'
        }
        if(this.state.isDistance == true){
            params = 'rank=' + 'distance'
        }
        if(this.state.isRating == true){
            params = 'rank=' + 'rating'
        }
        if(this.state.isOpennow == true){
            params = params + '&opennow=' + '1'
        }
        var priceStr = ''
        if(this.state.isPrice1 == true){
            priceStr += '1'
        }
        if(this.state.isPrice2 == true){
            if(this.state.isPrice1 == true){
                priceStr += ',2'
            }else{
                priceStr += '2'
            }
        }
        if(this.state.isPrice3 == true){
            if(this.state.isPrice1== true || this.state.isPrice2 == true){
                priceStr += ',3'
            }else{
                priceStr += '3'
            }
        }
        if(this.state.isPrice4 == true){
            if(this.state.isPrice1 == true || this.state.isPrice2 == true || this.state.isPrice3 == true){
                priceStr += ',4'
            }else{
                priceStr += '4'
            }
        }
        params = params + '&price=' + priceStr
        if(this.state.isDistance1 == true){
            params = params + '&distance=' + '1'
        }
        if(this.state.isDistance2 == true){
            params = params + '&distance=' + '5'
        }
        if(this.state.isDistance3 == true){
            params = params + '&distance=' + '10'
        }
        if(this.state.isDistance4 == true){
            params = params + '&distance=' + '20'
        }

        // this.setState({params})
        console.log(params)
        return params
    }
    

    render() {
        this._onPressApply()
        const distance1Str = '<1 Mile';
        const distance2Str = '<5 Miles';
        const distance3Str = '<10 Miles';
        const distance4Str = '<20 Miles';
        const isRelevance = this.state.isRelevance;
        const isDistance = this.state.isDistance;
        const isRating = this.state.isRating;
        const isOpennow = this.state.isOpennow;
        const isPrice1 = this.state.isPrice1;
        const isPrice2 = this.state.isPrice2;
        const isPrice3 = this.state.isPrice3;
        const isPrice4 = this.state.isPrice4;
        const isDistance1 = this.state.isDistance1;
        const isDistance2 = this.state.isDistance2;
        const isDistance3 = this.state.isDistance3;
        const isDistance4 = this.state.isDistance4;

        return (
            <View style = {styles.container}>
                <Text style = {{color:'lightgray', fontSize: 12,  marginTop:8, marginLeft:10}}>Sort by</Text>
                <View style = {{width:width, flexDirection:'row', marginTop:10 }}>
                    <TouchableOpacity  style = {isRelevance == true? styles.button_selected: styles.button_unselected} onPress = {this._onPressRelevance}>
                        <Text style = {isRelevance == true? styles.textButton_selected: styles.textButton_unselected}>Relevance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {isDistance == true? styles.button_selected: styles.button_unselected} onPress = {this._onPressDistance}>
                        <Text style = {isDistance == true? styles.textButton_selected: styles.textButton_unselected}>Distance</Text>
                    </TouchableOpacity>
                    <TouchableOpacity  style = {isRating == true? styles.button_selected: styles.button_unselected} onPress = {this._onPressRating}>
                        <Text style = {isRating == true? styles.textButton_selected: styles.textButton_unselected}>Rating</Text>
                    </TouchableOpacity>
                </View>
                <View style = {{backgroundColor:'lightgray', width:width, height:1, marginTop:7}}></View>

                <Text style = {{color:'lightgray', fontSize: 12,  marginTop:8, marginLeft:10}}>Filter by</Text>
                <View style = {{width:width, flexDirection:'column'}}>
                    <TouchableOpacity  style = {isOpennow == true? styles.button_selected: styles.button_unselected} onPress = {this._onPressOpennow}>
                        <Text style = {isOpennow == true? styles.textButton_selected: styles.textButton_unselected}>Open now</Text>
                    </TouchableOpacity>
                    <View style = {{flexDirection:'row', marginTop:8}}>
                        <TouchableOpacity onPress = {this._onPressPrice1} style = {isPrice1==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isPrice1==true? styles.textButton_selected: styles.textButton_unselected}>$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressPrice2} style = {isPrice2==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isPrice2==true? styles.textButton_selected: styles.textButton_unselected}>$$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressPrice3} style = {isPrice3==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isPrice3==true? styles.textButton_selected: styles.textButton_unselected}>$$$</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressPrice4} style = {isPrice4==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isPrice4==true? styles.textButton_selected: styles.textButton_unselected}>$$$$</Text>
                        </TouchableOpacity>
                        <FilterButton name = {'$$$$'}/>
                    </View>
                    <View style = {{flexDirection:'row', marginTop:8}}>
                        <TouchableOpacity onPress = {this._onPressDistance1} style = {isDistance1==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isDistance1==true? styles.textButton_selected: styles.textButton_unselected}>{distance1Str}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressDistance2} style = {isDistance2==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isDistance2==true? styles.textButton_selected: styles.textButton_unselected}>{distance2Str}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressDistance3} style = {isDistance3==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isDistance3==true? styles.textButton_selected: styles.textButton_unselected}>{distance3Str}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this._onPressDistance4} style = {isDistance4==true? styles.filterButton_selected:styles.filterButton_unselected}>
                            <Text style = {isDistance4==true? styles.textButton_selected: styles.textButton_unselected}>{distance4Str}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{flexDirection:'row', marginTop:30}}>
                        <TouchableOpacity onPress = {this.props.doneButtonPressed} style = {styles.clearButton}>
                            <Text style = {styles.textButton_unselected}>Clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress = {this.props.doneButtonPressed} style = {styles.applyButton}>
                            <Text style = {styles.textButton_selected}>Apply</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>           

        );
    }
}

// define your styles
const styles = StyleSheet.create({
     container:{
        width: width,
        height: 300,
        flexDirection: 'column',
        
     },
     button_unselected:{
        width: (width - 32)/3,
        height: 30,
        marginLeft: 8,
        marginTop: 2,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textButton_unselected:{
        color:'lightgray',
        fontSize: 13,
    },
    button_selected:{
        width: (width -32)/3,
        height: 30,
        marginLeft: 8,
        marginTop: 2,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38B664'
    },
    textButton_selected:{
        color: 'white',
        fontSize: 13,
    },
    filterButton_unselected:{
        width: (width - 40)/4,
        height: 30,
        marginLeft: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',  
    },
    filterButton_selected:{
        width: (width - 40)/4,
        height: 30,
        marginLeft: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#38B664',
    },
    filterTextButton_selected:{
        color:'white',
        fontSize: 13,
    },
    clearButton:{
        width:(width - 32)/2,
        height:35,
        marginLeft: 8,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'lightgray',
    },
    applyButton:{
        width: (width-32)/2,
        height: 35,
        marginLeft: 16,
        borderRadius: 5,
        backgroundColor: '#38B664',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

//make this component available to the app
export default RestaurantFilter;
