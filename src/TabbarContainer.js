
import React,{Component} from 'react';
import {StyleSheet, Platform, Text, Navigator, Image, AsyncStorage} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'

import FeedNav from './feed/FeedNav'
import RestaurantNav from './restaurant/RestaurantNav'
import NewNav from './new/NewNav'
import MessagesNav from './messages/MessagesNav'
import ProfileNav from './profile/ProfileNav'

import {Tabs, Tab} from 'react-native-elements'

export default class TabbarContainer extends Component {

    constructor () {
         super()
         this.state = {
            selectedTab: 'feed'
         }
        this.changeTab = this.changeTab.bind(this)
    }
    
    changeTab (selectedTab) {
        this.setState({
            selectedTab
        })
     }

    render() {
        const {selectedTab} = this.state
        return (
            <Tabs hideTabTouch>
                <Tab
                    titleStyle = {[styles.titleStyle,  {marginTop:-1}]}
                    tabStyle = {selectedTab != 'feed' && {marginBottom: -6}}
                    selectedTitleStyle = {[styles.titleSelected, {marginTop:-3, marginBottom:7}]}
                    selected = {selectedTab == 'feed'}
                    title={selectedTab === 'feed' ? 'FEED' : null}
                    renderIcon = {() => <Image source = {require('./images/tab_feed.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('./images/tab_feed.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('feed')}>
                    <FeedNav navigator={this.props.navigator}/>
                </Tab>
                <Tab
                    titleStyle = {[styles.titleStyle, {marginTop:-1}]}
                    tabStyle = {selectedTab != 'restaurant' && {marginBottom: -6}}
                    selectedTitleStyle = {[styles.titleSelected, {marginTop:-3, marginBottom:7}]}
                    selected={selectedTab == 'restaurant'}
                    title = {selectedTab === 'restaurant' ? 'RESTAURANT' : null}           
                    renderIcon = {() => <Image source = {require('./images/tab_fork.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('./images/tab_fork.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('restaurant')}>
                    <RestaurantNav navigator = {this.props.navigator}/>
                </Tab>
                <Tab
                    titleStyle = {[styles.titleStyle, {marginTop:-1}]}
                    tabStyle = {selectedTab != 'new' && {marginBottom: -6}}
                    selectedTitleStyle = {[styles.titleSelected, {marginTop:-3, marginBottom:7}]}
                    selected={selectedTab == 'new'}
                    title = {selectedTab === 'new' ? 'New' : null}           
                    renderIcon = {() => <Image source = {require('./images/tab_new.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('./images/tab_new.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('new')}>
                    <NewNav navigator = {this.props.navigator} name = 'tab'/>
                </Tab>
                <Tab
                    titleStyle = {[styles.titleStyle, {marginTop:-1}]}
                    tabStyle = {selectedTab != 'messages' && {marginBottom: -6}}
                    selectedTitleStyle = {[styles.titleSelected, {marginTop:-3, marginBottom:7}]}
                    selected={selectedTab == 'messages'}
                    title = {selectedTab === 'messages' ? 'Messages' : null}           
                    renderIcon = {() => <Image source = {require('./images/tab_message.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('./images/tab_message.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('messages')}>
                    <MessagesNav navigator = {this.props.navigator}/>
                </Tab>
                <Tab
                    titleStyle = {[styles.titleStyle, {marginTop:-1}]}
                    tabStyle = {selectedTab != 'profile' && {marginBottom: -6}}
                    selectedTitleStyle = {[styles.titleSelected, {marginTop:-3, marginBottom:7}]}
                    selected={selectedTab == 'profile'}
                    title = {selectedTab === 'profile' ? 'Profile' : null}           
                    renderIcon = {() => <Image source = {require('./images/tab_profile.png')} style = {styles.tabImg}/>}
                    renderSelectedIcon = {() => <Image source = {require('./images/tab_profile.png')} style = {styles.tabImg}/>}
                    onPress = {() => this.changeTab('profile')}>
                    <ProfileNav navigator = {this.props.navigator}/>
                </Tab>
            </Tabs>
        );
    }
}

const styles = StyleSheet.create({
    titleStyle:{
    },
    tabImg:{
        width: 26,
        height: 26,
        paddingBottom:0,
        resizeMode:'contain',
    }
})