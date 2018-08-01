import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
//const util = require('util');

export default class WelcomeScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
    	title: 'Welcome',
        header: null,
    });
    componentDidMount(){
    	var user:User = require('../Data/User').default;
		
    }
    
    
    render(){
        var {navigate} =  this.props.navigation;
        return(
            <View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white'
			  }}>
                <Text>Introduction screen</Text>
                                    <Button
                        onPress = {
                            () => this.loadHomeScreen()

                        }
                        title = "Choose Hospital"
                    />
            </View>
        );

    }
    loadHomeScreen (){
        var {navigate} =  this.props.navigation;
		navigate("Third", {})
        
    }
    

}

