//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions , TouchableOpacity} from 'react-native';
const {width, height} = Dimensions.get('window');
// create a component

var selected = false;

class SortButton extends Component {

    constructor(props){
        super(props);
        // this._onRelevance = this._onRelevance.bind(this);
        this.state = {
            selected: false
        };
        this._onPressButton = this._onPressButton.bind(this);
    }

    _onPressButton(){
        selected = !selected;
        this.setState({selected});
    }

    render() {
        const selected = this.state.selected;
        if(selected){
            return (
                <TouchableOpacity  style = {styles.button_selected}>
                    <Text style = {styles.textButton_selected}>{this.props.name}</Text>
                </TouchableOpacity>
            );
        }else{
            return (  
                <TouchableOpacity  style = {styles.button_unselected}>
                    <Text style = {styles.textButton_unselected}>{this.props.name}</Text>
                </TouchableOpacity>
            );
        }
        
    }
}

// define your styles
const styles = StyleSheet.create({
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
    }

});

//make this component available to the app
export default SortButton;
