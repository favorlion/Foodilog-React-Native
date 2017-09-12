/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import app from './src/app'
import SplashScreen from 'react-native-splash-screen'

import App from "./src/app";

AppRegistry.registerComponent('Foodilog', () => App)