import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
//const util = require('util');

export default class SplashScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
        title: 'Splash',
        header: null,
    });
    componentDidMount(){
        console.log("componentDidMount function");
        
    	this.loadWelcomeScreen = this.loadWelcomeScreen.bind(this);
    	var user:User = require('../Data/User').default;
    	return fetch('http://www.davidhoskins.co.uk/appdata/wp-json/wp/v2/posts?per_page=100')
            .then((response) => response.json())
            .then((responseJson) => {

                try {
                    var data = responseJson;
                    
                    for(var i in data)
                    {
                       /* var post = data[i];
                        for(var k in post)
                        {*/
                            console.log("add post" + data[i].slug);
                            
                            // var id = data[i].id;
                            //var name = data[i].name;
                            AsyncStorage.setItem('@'+data[i].slug+':key', "["+JSON.stringify(data[i])+"]");
                        //}

                    }
                    
                    this.loadWelcomeScreen();
    				console.log("load home screen");
                    

                } catch (error) {
                    console.log("error loading data")
                    // Error saving data
                }

            })
            .catch((error) =>{
                console.error(error);
            });
			
    }
    async loadWelcomeScreen(){
		try {
				
				const value = await AsyncStorage.getItem('@Welcome:key');
				//console.log("gettin");
				var {navigate} =  this.props.navigation;
				if (value !== null) {
				  // We have data!!
				  console.log(value);
				  console.log("Goto home screen")  
				  navigate("Home", {title:"temp title", desc: "description text to show what could be shown", image:"test"})
				}
				else{
					try {
				await AsyncStorage.setItem('@Welcome:key', 'set');
				  } catch (error) {
					// Error saving data
				  }
                  console.log("Goto welcome screen")  
                  navigate("Welcome", {title:"temp title", desc: "description text to show what could be shown", image:"test"})
				}
				 //this.props.navigation.navigate('ScreenRegister', {title: 'WHATEVER'})
			} catch (error) {
				console.log("Error retrieving data" + error);
			}
    	
    	

    }
    loadData(){
    	const REQUEST_URL  = 'http://www.davidhoskins.co.uk/appdata/wp-json/wp/v2/posts';
        return fetch('http://www.davidhoskins.co.uk/appdata/wp-json/mylistingplugin/v1/title/'+'Hospital3')
            .then((response) => response.json())
            .then((responseJson) => {

                try {
                    var data = responseJson;
                    console.log("Hello" + data.length);
                    for(var i in data)
                    {
                        var post = data[i];
                        for(var k in post)
                        {
                            console.log("add post" + post[k].post_name);
                            // var id = data[i].id;
                            //var name = data[i].name;
                            AsyncStorage.setItem('@'+post[k].post_name+':key', "["+JSON.stringify(post[k])+"]");
                        }
						
                    }
					

                } catch (error) {
                    // Error saving data
                }

            })
            .catch((error) =>{
                console.error(error);
            });
            
    }
    render(){
        console.log("render function");
        return(
            <View style={{
				flex: 1,
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white'
			  }}>
                <Text>Temp Loading screen</Text>
            </View>
        );

    }
    

}

