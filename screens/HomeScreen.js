import React from 'react';
import {Text, View, Button, AsyncStorage} from 'react-native';
import {StackNavigator} from "react-navigation";
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import User from "../Data/User";
//const util = require('util');

export default class HomeScreen extends React.Component {
	
    static navigationOptions =({navigation, screenProps }) => ( {
    	title: 'Home',
        headerLeft: (
            <Button
                onPress={() => this.changeDrawer()}
                title="Menu"
                
            />
        ),
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                
            />
        ),
    });
    changeDrawer(){
        var {navigate} =  this.props.navigation;
        navigate.toggleDrawer();
    }
    componentDidMount(){
    	this.changeDrawer = this.changeDrawer.bind(this);
		/*_retrieveData = async () => {
		  try {
			const value = await AsyncStorage.getItem('@lastLoadDate:key');
			if (value !== null) {
			  // We have data!!
			  console.log("value found: ",value);
			}
			else{
				console.log("value is null: ");
				this.loadData();
			}
		   } catch (error) {
		   	this.loadData();
			 // Error retrieving data
		   }
		}*/
    	var user:User = require('../Data/User').default;
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



        
        //this.loadData();
		
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
        var {navigate} =  this.props.navigation;
        return(
            <View style={{
				flex: 1,
				backgroundColor: 'white'
			  }}>
                <Text> This is screen 1</Text>
                    <Button
                        onPress = {
                            () => this.chooseScreen("maternityunits")

                        }
                        title = "Maternity unity"
                    />
                <Button
                    onPress = {
                        () => this.chooseScreen("your-pregnancy")

                    }
                    title = "Before birth"
                />
                <Button
                    onPress = {
                        () => this.chooseScreen("labour-and-birth")

                    }
                    title = "Birth"
                />
                <Button
                    onPress = {
                        () => this.chooseScreen("after-your-babys-birth")

                    }
                    title = "After Birth"
                />
                
            </View>
        );

    }
    chooseScreen (str){
    	var user:User = require('../Data/User').default;
        var {navigate} =  this.props.navigation;
        user.setCurrentPage(str);
        if(str == "maternityunits"){
            navigate("MaternityUnits", {})
            //navigate("DefaultContent", {title:"temp title", desc: "description text to show what could be shown", image:"test"})
       
        }
        else{
            navigate("DefaultContent", {})
        }
        /*if(str==""){
            user.setCurrentPage(str);
            navigate("DefaultContent", {title:"temp title", desc: "description text to show what could be shown", image:"test"})
        }
        else if(str==2){
            navigate("Third", {})
        }
        else if("MaternityUnits"){
        	
    	}*/
	}
}

