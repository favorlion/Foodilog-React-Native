import React, {Component,} from 'react';
import {
  StyleSheet,
  Text,
  View,
//   Navigator,
  BackAndroid
} from 'react-native';

import LoginPage from './guide/Login';
import TabbarContainer from './TabbarContainer';
import DiscoverPeople from './feed/DiscoverPeople';
import FeedDetail from './feed/FeedDetail';
import RestaurantDetail from './restaurant/RestaurantDetail';
import NewNav from './new/NewNav'
import NewDish from './new/NewDish'
import Menu from './feed/Menu'
import EditProfile from './profile/EditProfile'
import LogDraft from './profile/LogDrafts'
import UserLogs from './profile/UserLogs'
import UserProfile from './profile/UserProfile'
import GuideProfile from './guide/GuideProfile'
import GuideFollow from './guide/GuideFollow'
import FeedNav from './feed/FeedNav'
import UserFollowers from './profile/UserFollowers'
import UserFollowing from './profile/UserFollowing'
import MyFavorites from './profile/MyFavorites'
import LogDish from './feed/LogDish'
import DishDetail from './feed/DishDetail'
import MustTryView from './feed/MustTryView'
import RestaurantList from './new/RestaurantList'
import Dishes from './new/Dishes'
import NLDishComment from './new/NLDishComment'
import RestaurantLogs from './feed/RestaurantLogs'
import Map from './feed/Map'
import NavigationExperimental from 'react-native-deprecated-custom-components'

var _navigation;

BackAndroid.addEventListener('hardwareBackPress', () => {
	if(_navigation && _navigation.getCurrentRoutes().length > 1){
		_navigation.pop();
		return true;
	}
	return false;
});

export default class  App extends Component{
    constructor(props){
        super(props);
    }

    renderScene(route, navigator){
        _navigation = navigator;
        switch (route.name){
            case 'login':
                return (
                    <LoginPage navigator={navigator}/>
                );
            case 'approotcontainer':
                return(
                    <AppRootContainer navigator = {navigator}/>
                );
            case 'tabcontainer':
                return(
                    <TabbarContainer navigator  = {navigator}/>
                );
            case 'discover_people':
                return(
                    <DiscoverPeople navigator = {navigator}/>
                );
            case 'feednav':
                return(
                    <FeedNav navigator = {navigator} />
                );
            case 'feed_detail':
                return(
                    <FeedDetail navigator = {navigator}
                        logInfo ={route.logInfo}
                        fid = {route.fid}
                        uid = {route.uid}/>
                );
            case 'restaurantDetail':
                return(
                    <RestaurantDetail 
                        navigator = {navigator}
                        restaurantId = {route.restaurantId}
                        restaurantName = {route.restaurantName}/>
                );
            case 'startnewlog':
                return(
                    <NewNav navigator = {navigator}/>
                );
            case 'menu':
                return(
                    <Menu navigator = {navigator}
                        rid = {route.rid}
                        rname = {route.rname}/>
                );
            case 'menuadd':
                return(
                    <NewDish navigator = {navigator}/>
                );
            case 'editprofile':
                return(
                    <EditProfile navigator = {navigator} 
                        username = {route.username}
                        location = {route.location}
                        about = {route.about}/>
                );
            case 'logdraft':
                return(
                    <LogDraft navigator = {navigator}/>
                );
            case 'userlogs':
                return(
                    <UserLogs navigator = {navigator}/>
                );
            case 'userprofile':
                return(
                    <UserProfile navigator = {navigator} data = {route.uid}/>
                );
            case 'guideprofile':
                return(
                    <GuideProfile navigator = {navigator}/>
                );
            case 'guidefollow':
                return(
                    <GuideFollow navigator = {navigator}/>
                );
            case 'userfollowers':
                return(
                    <UserFollowers navigator = {navigator}/>
                );
            case 'userfollowing':
                return(
                    <UserFollowing navigator = {navigator} />
                );
            case 'myfavorites':
                return(
                    <MyFavorites navigator = {navigator}  />
                );
            case 'logdish':
                return(
                    <LogDish navigator = {navigator}
                        dishInfo = {route.dishInfo}
                        userName = {route.userName} />
                );
            case 'dishdetail':
                return(
                    <DishDetail navigator = {navigator} 
                        dishInfo = {route.dishInfo}/>
                );
            case 'musttryview' :
                return(
                    <MustTryView navigator = {navigator} 
                        rid = {route.rid}/>
                );
            case 'restaurantlist':
                return(
                    <RestaurantList navigator = {navigator} />
                );
            case 'dishes':
                return(
                    <Dishes navigator = {navigator}
                        rid = {route.rid} />
                );
            case 'NLDishComment':
                return(
                    <NLDishComment navigator = {navigator}
                        dishinfo = {route.dishinfo}/>
                );
            case 'RestaurantLogs':
                return(
                    <RestaurantLogs navigator = {navigator} 
                        rid = {route.rid}/>
                );
            case 'map':
                return(
                    <Map navigator = {navigator}
                        rinfo = {route.rinfo}/>
                )
        }
    }

    render(){
        return (
            <NavigationExperimental.Navigator
                initialRoute={{
                    name:'login'
                }}
                renderScene={this.renderScene}
                navigationnBarHidden
            />
        );
    }
}
