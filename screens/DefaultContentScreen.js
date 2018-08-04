import React from 'react';
import {AsyncStorage,TouchableOpacity, Text, View, Image,FlatList,StyleSheet,ScrollView, Dimensions, Button} from 'react-native';
//const util = require('util');
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native';
import User from "../Data/User";
import CreateContent from '../Components/CreateContent';


export default class DefaultContent extends React.Component {
    static navigationOptions = {
        title: 'Default content title'
    };
    
    render() {
        return (
            <View>
                <CreateContent/>
            </View>
        );
    }
    
}
