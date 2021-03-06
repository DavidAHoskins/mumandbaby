/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Button, AsyncStorage} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation';
import SplashScreen from './screens/SplashScreen';
import WelcomeScreen from "./screens/WelcomeScreen";
import HomeScreen from './screens/HomeScreen';
import MaternityUnitsScreen from './screens/MaternityUnitsScreen';
import SecondScreen from './screens/SecondScreen';
import ThirdScreen from "./screens/ThirdScreen";
import DefaultContentScreen from "./screens/DefaultContentScreen";
import AppointmentsScreen from './screens/AppointmentsScreen';
import BackupScreen from './screens/BackupScreen';
import PersonalCarePlanScreen from './screens/PersonalCarePlanScreen';


const Navigation = createStackNavigator({
	  Splash:{screen:SplashScreen},
	  Welcome:{screen:WelcomeScreen},
    Home:{screen:HomeScreen},
    MaternityUnits:{screen:MaternityUnitsScreen},
    Appointments:{screen:AppointmentsScreen},
    Backup:{screen:BackupScreen},
    PersonalCarePlan:{screen:PersonalCarePlanScreen},
    DefaultContent:{screen:DefaultContentScreen}
  
},
  {
  	headerMode: 'float',
    initialRouteName: 'Splash',
    /* The header config from HomeScreen is now here */
    navigationOptions: ({navigation, screenProps }) => ({
      headerStyle: {
        backgroundColor: '#FA7E5B',
      },
      headerBackTitle: null,
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    })
  });

  export default Navigation;

const DrawerNavigation = createDrawerNavigator({
	 Home: {
	   screen: SplashScreen,
	   navigationOptions: {
		 title: "RN WC Store"
	   }
	 }
	});


//export default DrawerNavigation;
