import React from 'react';
import {AsyncStorage,TouchableOpacity, Text, View, Image,FlatList,StyleSheet,ScrollView, Dimensions, Button} from 'react-native';
//const util = require('util');
import HTMLView from 'react-native-htmlview';
import { WebView } from 'react-native';
import {createStackNavigator,withNavigation, DrawerActions} from 'react-navigation';
import User from "../Data/User";
//const util = require('util');
class CreateContent extends React.Component {
    getNewIndex(){
   	 	this.newIndex++;
   	 	//console.log("new index:", this.newIndex);
    	return(
    		this.newIndex
    	);
    }
    constructor(props){
        super(props);
        this.state ={ isLoading: true, txt: null, tableHead: ['Head', 'Head2'],
            tableData: []
						}
						


		}
    componentDidMount(){
        //this.navigationOptions.title = "test";
        this.newIndex = 0;
        this.getNewIndex = this.getNewIndex.bind(this); //add this line
        this.chooseScreen = this.chooseScreen.bind(this);
        this.renderNode = this.renderNode.bind(this);
        var user:User = require('../Data/User').default;
        this.getKey(user.getCurrentPage());
				
        return
            this.render();
    }
    async getKey(currentPage:String) {
        try {
        	console.log("try get key");
						const value = await AsyncStorage.getItem('@'+currentPage+':key');
						this.setState({txt: value, dataSource: JSON.parse(value), isLoading:false});
						
             const {setParams} = this.props.navigation;
    		setParams({ title: 'titleText' })
             //this.props.navigation.navigate('ScreenRegister', {title: 'WHATEVER'})
        } catch (error) {
            console.log("Error retrieving data" + error);
				}
				
    }
    render() {
				const state = this.state;
				
        return (
            <View>
							<ScrollView>
									<FlatList
											data={this.state.dataSource}
											renderItem={({item}) => this.processHTML(item.content.rendered)
											}
											keyExtractor={(item, index) => String(index)}
									/>
							</ScrollView>
            </View>
        );
    }
    processHTML(postContent:String){
			
        return (
         <View style={{backgroundColor: '#FFFFFF', padding: 15}}>
           <HTMLView  	addLineBreaks={false} 
           				value={'<p>'+postContent.replace(/(\r\n|\n|\r)/m, "")+'</p>'}
           				renderNode={this.renderNode}
    							stylesheet={styles2}
                  />
   				</View>
        );
    }
    
    renderNode(node, index, siblings, parent, defaultRenderer) {
    var tempIndex:int = this.getNewIndex();
    //console.log("what is the index:", index);
    //console.log("what is the tempindex:", this.newIndex);
  	if (node.name == 'iframe') {
			const a = node.attribs;
			const dimensions = Dimensions.get('window');
			var videoHeight = Math.round((dimensions.width-30) * (9 / 16));
			var videoWidth = dimensions.width-30;
			const iframeHtml = `<iframe src="${a.src}" scrolling="no" style="width:100%;height:100%;"></iframe>`;
			return (
				<View key={tempIndex}>
					<Text>Video</Text>
					<View style={{flex:1, width: Number(videoWidth), height: Number(videoHeight)}}>
						<WebView
							style={{flex:1}}
							javaScriptEnabled={true}
							source={{uri: a.src}}
							/>
					</View>
				</View>
			);
			}
  	/*	if (node.name == 'img') {
			const a = node.attribs;
			const dimensions = Dimensions.get('window');
			var rawImageWidth = a.width;
      		var rawImageHeight = a.height;
			var imageHeight = Math.round((dimensions.width-30) * rawImageHeight / rawImageWidth);
			var imageWidth = dimensions.width-30;
			return (
				<View key={tempIndex}>
					<Image
						style={{width:imageWidth, height:imageHeight}}
						source={{uri: a.src}}
					/>	
			   </View>
			);
			}*/
  		
		if(node.name == 'div'){
			const a = node.attribs;
			if (a.class == 'goto') {
			  const specialSyle = node.attribs.style;
			  var linkNode;
			  for(var i:int =0; i<node.children.length; i++){
				if(node.children[i].name == "a"){
					linkNode = node.children[i];
				}
			  }
			  console.log("goto children length: ",node.children.length);
		  
			  return (
				<TouchableOpacity key={tempIndex} onPress={() => this.chooseScreen(linkNode.attribs.href)}>
					<View style={styles.internalLink}>
						<Text style={styles.buttonText}>
						  {linkNode.children[0].data}
						</Text>
					</View>
				</TouchableOpacity>
			
			  )
			}
			if (a.class == 'relatedlinks') {
			  const specialSyle = node.attribs.style;
			  var relatedLinks:Array = [];
			  for(var i:int =0; i<node.children.length; i++){
				if(node.children[i].name == "a"){
					var linkNode = node.children[i];
					const linkRef =  linkNode.attribs.href
					console.log("unique ref: "+linkRef);
					var chooseFunction = () => this.chooseScreen(linkRef);
					relatedLinks.push(
					<TouchableOpacity onPress={chooseFunction}>
						<View style={styles.relatedbutton}>
							<Text style={styles.relatedbuttonText}>
							  {linkNode.children[0].data}
							</Text>
						</View>
					</TouchableOpacity>
					);
				}
			  }
			  console.log("goto children length: ",node.children.length);
		  
			  return (
			   <View key={tempIndex}>
				  <View style={styles.relatedLinksBar}>
							<Text style={styles.buttonText}>
							  Related Links
							</Text>
					</View>
					{relatedLinks}
				</View>
			
			  )
			}
			if(a.class =='submenu'){
			const specialSyle = node.attribs.style;
		  
			  var hyperLinks:Array = [];
			  for(var i:int =0; i<node.children.length; i++){
				if(node.children[i].name == "a"){
					var linkNode = node.children[i];
					const linkRef =  linkNode.attribs.href
					console.log("unique ref: "+linkRef);
					var chooseFunction = () => this.chooseScreen(linkRef);
					hyperLinks.push(
					<View>
					<TouchableOpacity key={tempIndex} onPress={chooseFunction}>
						<View style={styles.subitem}>
							<View style={{margin:10,flex:2}}>
							<Text style={styles.subitemText}>
							  {linkNode.children[0].data}
							</Text>
							</View>
							<View style={{margin:10, height:100,width:160, backgroundColor: 'grey'}}/>
						</View>
					</TouchableOpacity>
					</View>
					);
				}
			  }

			  return (
				<View key={tempIndex}>
					{hyperLinks}
				</View>
			
			  )
			}
		}
		
		
	}
    
    chooseScreen (str){
    		console.log("choose screen triggered");
        var user:User = require('../Data/User').default;
        console.log("Screen to:" + str);
				var splitArray = str.split("/")
				var pageName:String = splitArray[splitArray.length-2];
				console.log("Screen to 2:" + pageName);
        user.setCurrentPage(pageName);
        var {push} =  this.props.navigation;
        push("DefaultContent", {title:"temp title", desc: "description text to show what could be shown", image:"test"})


    }
}
const styles = StyleSheet.create({
relatedLinksBar: {
    backgroundColor:'#2CC4AA',
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
  },
  subitem: {
    backgroundColor:'#ffffff',
    flex: 1, 
    flexDirection: 'row',
    height:120,
    width:null,
   borderTopColor: '#FA7E5B',
    borderTopWidth: 1,
  },
  subitemText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'Lato-Light',
    textAlign: 'left',
  },
  relatedbutton: {
    backgroundColor:'#ECFAF7',
    flexGrow:1,
    height:80,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
  },
  relatedbuttonText: {
    color: '#808080',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    height:30,
    textAlign: 'left',
  },
  internalLink: {
    backgroundColor:'#FA7E5B',
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Lato-Regular',
    height:30,
    textAlign: 'left',
  },
});

const styles2 = StyleSheet.create({
	default: {
		color: '#FA7E5B',
		fontFamily: 'Merriweather-Regular',
		fontSize: 14,
	},
	h1: {
		fontFamily: 'Merriweather-Regular',
		fontSize: 24,
		textAlign: 'left',
		color: '#000000',
	},
	h2: {
		fontFamily: 'Lato-Light',
		fontSize: 18,
		textAlign: 'left',
		color: '#644D45',
	},
	
	p: {
        fontFamily: 'Lato-Light',
        fontSize: 14,
    },
    a: {
        color: '#2CC4A7', // pink links
        fontFamily: 'Lato-Light',
    },
    ol:{
        color: '#FA7E5B',
        fontFamily: 'Lato-Regular',

    },
    
    ul: {
        color: '#FA7E5B',
        fontFamily: 'Lato-Light',
    },
    li: {
        color: '#000000',
        fontFamily: 'Lato-Light',
    },
    span: {
        color: '#000000',
        fontFamily: 'Lato-Light',
    },
})

export default withNavigation(CreateContent);
