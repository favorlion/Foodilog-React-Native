import React,{Component} from 'react';
import {StyleSheet, 
    View, 
    Text, 
    Image,
    Button, 
    TouchableOpacity, 
    Navigator,
    Dimensions,
    DeviceEventEmitter,
    NativeModules,
    requireNativeComponent,
    Platform,
    AsyncStorage} from 'react-native';
import API from '../service/API'
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin'

const bg = require('../images/login_bg.png');
const logo = require('../images/LOGO.png');
const facebookicon = require('../images/fb_login.png')
const twittericon = require('../images/twitter_login.png')
const {width,height} = Dimensions.get('window');


//Facebook login
const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  SharingDialog,
  AccessToken,
  LoginButton,
} = FBSDK;
const TAG = 'Guide.login'
var ok = false;
var token = '';
var newregister = false;
var userInfo = [];
var REQUEST_URL = ''

//Google+ login
const {RNGoogleSignin, RNTwitterSignIn} = NativeModules
const RNGoogleSigninButton = requireNativeComponent('RNGoogleSigninButton', null);

export default class LoginPage extends Component{
    // static propTypes = {
    //     ...View.propTypes,
    //     size: PropTypes.number,
    //     color: PropTypes.number
    // }

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this._setupGoogleSignin();
        this._clickListener = DeviceEventEmitter.addListener('RNGoogleSigninButtonClicked', () => {
            this.props.onPress && this.props.onPress();
            this._googleSignIn();
        })
    }
    componentWillUnmount() {
        this._clickListener && this._clickListener.remove();
    }

    async _setupGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices({ autoResolve: true });
            await GoogleSignin.configure({
                iosClientId: API.GOOGLE_IOS_CLIENTID,
                offlineAccess: false
            });

            const user = await GoogleSignin.currentUserAsync();
            console.log(user);
        }
        catch(err) {
            console.log("Play services error", err.code, err.message);
        }
    }

    _googleSignIn() {
        const { dispatchLogin, } = this.props
        GoogleSignin.signIn()
        .then((user) => {
            console.log(user)
            if (user.accessToken) {
                console.log(TAG, user.accessToken);
                this.dispatchLogin(API.GOOGLE_LOGIN_URL, user.accessToken, '');
            }
        })
        .catch((err) => {
            alert("Google SignIn Error: " + err);
            console.log('WRONG SIGNIN', err);
        })
        .done();
    }

    _googleSignOut() {
        GoogleSignin.revokeAccess().then(() => GoogleSignin.signOut()).done();
    }

    _twitterSignIn() {
        RNTwitterSignIn.init(API.TWITTER_CONSUMER_KEY, API.TWITTER_CONSUMER_SECRET).then(
            RNTwitterSignIn.logIn()
            .then((loginData)=>{
                console.log(loginData);
                const { authToken, authTokenSecret } = loginData;
                if (authToken && authTokenSecret) {
                    this.dispatchLogin(API.TWITTER_LOGIN_URL, authToken, authTokenSecret);
                }
            })
            .catch((error)=>{
                console.log(error);
            })
        );
    }

    _twitterSignOut() {
        RNTwitterSignIn.logOut();
    }
    
    _facebookLogin = () =>{
        const { dispatchLogin, } = this.props
        LoginManager.logInWithReadPermissions(['email','public_profile','user_friends'])
        .then((result) => {
            console.log(result);
            result.isCancelled ? null : AccessToken.getCurrentAccessToken();
        })
        .then((data) => {
            console.log(TAG, data);
            const token = data.accessToken.toString();
            if (token) {
                this.dispatchLogin(API.FB_LOGIN_URL, token, '');
            }
        }).catch((e) => {
          console.log(TAG, e);
        });
    }

    _facebookLogout() {
        LoginManager.logOut();
    }

    dispatchLogin(login_url, token, secret){
        if (secret == '')
        {
            REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + login_url + '?access_token=' + token
        }
        else{
            REQUEST_URL = API.SERVER_URL + API.SERVICE_PORT + login_url + '?access_token=' + token + '&access_secret=' + secret + '&app_platform=' + Platform.OS + '&app_version=' + API.APP_VERSION
        }
        console.log(REQUEST_URL);
        fetch(REQUEST_URL, {
            method: 'GET',
            headers: {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            }, 
        })
        .then((response) => response.json())
        .then((responseData) => {
            console.log(responseData)
            ok = responseData.ok;
            if(ok == true){
                if(responseData.newregister){
                    newregister = responseData.newregister;
                    console.log('newregister ->' + newregister);
                }
                if(responseData.user){
                    userInfo = responseData.user;
                    console.log(userInfo)
                }else{
                    alert('Login Failed, Cannot get user info');
                    return;
                }
                if(responseData.token){
                    token = responseData.token;
                }else{
                    alert('Login Failed, Token error');
                }
                if(userInfo.account){
                    AsyncStorage.setItem('FoodilogUserID', userInfo.account);
                    AsyncStorage.setItem('FoodilogToken', token);
                    console.log('FoodilogUserID ->' + userInfo.account);
                    console.log('FoodilogToken -> ' + token );
                }else{
                    alert('Login Failed, ID error');
                }

                if(newregister){
                    this.props.navigator.push({
                        name: "guideprofile"
                    })
                }else{
                    this.props.navigator.push({
                        name: "tabcontainer"
                    })
                }
            }else{
                LoginManager.logOut();
                this.props.navigator.push({
                    name: 'login'
                })
                AsyncStorage.removeItem('FoodilogUserID');
                AsyncStorage.removeItem('FoodilogToken');

                alert('Login Failed, Server internal error');
            }
            
        })
        .done();
    }

    render(){
        return(
            <View style = {styles.container}>
                <Image
                    style = {styles.image} source = {bg} />
                <Image 
                    style = {styles.logo} source = {logo}/>
                
                <View style = {styles.facebookContainer}>
                    <TouchableOpacity onPress = {this._facebookLogin.bind(this)}>
                        <Image style = {styles.fbButton} source = {facebookicon}/>
                    </TouchableOpacity>
                </View>
                <View style = {styles.googleContainer}>
                    <GoogleSigninButton
                        style = {{width: 220, height: 48}}
                        size = {GoogleSigninButton.Size.Wide}
                        color = {GoogleSigninButton.Color.Auto}
                    />
                    {/*<RNGoogleSigninButton style={[{ backgroundColor: 'transparent' }, style]} {...props} />*/}
                </View>
                <View style = {styles.twitterContainer}>
                    <TouchableOpacity onPress = {this._twitterSignIn.bind(this)}>
                        <Image style = {styles.twitterButton} source = {twittericon}/>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

GoogleSigninButton.Size = {
  Icon: RNGoogleSignin.BUTTON_SIZE_ICON,
  Standard: RNGoogleSignin.BUTTON_SIZE_STANDARD,
  Wide: RNGoogleSignin.BUTTON_SIZE_WIDE
};

GoogleSigninButton.Color = {
  Auto: RNGoogleSignin.BUTTON_COLOR_AUTO,
  Light: RNGoogleSignin.BUTTON_COLOR_LIGHT,
  Dark: RNGoogleSignin.BUTTON_COLOR_DARK
};
class GoogleSigninError extends Error {
  constructor(error, code) {
    super(error);
    this.name = 'GoogleSigninError';
    this.code  = code;
  }
};


const styles = StyleSheet.create ({
    container:{
        flexGrow:1,
        alignItems:'center',
        justifyContent: 'center',
    },
    image: {
       flex: 1,
       position:'absolute',
       width: width,
       height: height,
       resizeMode: 'cover',
    },
    logo: {
        width: 150,
        height: 50,
        marginBottom:200,
        resizeMode:'contain',
    },
    fbButton: {
        width: 214,
        height: 48,
        resizeMode:'contain'
    },
    twitterButton: {
        width: 214,
        height: 48,
        resizeMode:'contain'
    },
    facebookContainer: {
        height: 40,
        bottom: 200,
        position:'absolute',
    },
    twitterContainer: {
        height: 40,
        bottom: 140,
        position:'absolute',
    },
    googleContainer: {
        height: 40,
        bottom: 80,
        position: 'absolute'
    }

});
