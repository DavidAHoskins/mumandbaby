import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
import CreateContent from '../Components/CreateContent';
//const util = require('util');

export default class MaternityUnitsScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
    	title: 'Maternity units',
    });
    componentDidMount(){
    	var user:User = require('../Data/User').default;
		
    }
     
    render(){
        var {navigate} =  this.props.navigation;
        return(
            <CreateContent/>
        );
    }
    
    

}

