/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React,{Component} from 'react';
import { StyleSheet, View, Text, Image, StatusBar, } from 'react-native';

const logoURL = require('./images/LOGO-circle.png')
const MyStatusBar = ({backgroundColor, ...props}) => (
    <View style = {[styles.statusBar, { backgroundColor }]}>
        <StatusBar backgroundColor = { backgroundColor } {...props} />
    </View>
);

class Splash extends Component {
    
    render() {
        return (
            <View style = { styles.wrapper}>
                <Image
                    style = {styles.logo}
                    source = {logoURL} />
            </View>
        );
    }
}


const styles = StyleSheet.create ({
    wrapper:{
        backgroundColor: '#652D6C',
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 90,
        height: 90,
        marginTop: 200,
    },

})

export default Splash