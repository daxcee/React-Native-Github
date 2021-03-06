import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TextInput,	
	TouchableHighlight,
	
} from 'react-native';

import AuthService from './AuthService';
import SearchResult from './SearchResult'

export default class Search extends Component {
	constructor(props) {
	  super(props);
	  this.state = {	  
	  
	  }
	}

	render() {
		return (
			<View style={styles.container} >				
					<Text style= {styles.heading}>
						Github Browser
					</Text>
					<TextInput 
						onChangeText={(text)=>this.setState({searchQuery:text})}
						style={styles.input} 
						placeholder ="Busqueda" />
					
					<TouchableHighlight 
						onPress={this.onSearchPressed.bind(this)}
						style={styles.button}>
						<Text style={styles.buttonText}> Search </Text>
					</TouchableHighlight>					
			</View>
	 		);

		
 	}

 	onSearchPressed(){
			 
			this.props.navigator.push({
				component: SearchResult,
				title: 'Results',
				passProps : {
					searchQuery: this.state.searchQuery	
				}
			});
		}
}

var styles = StyleSheet.create({
	// Contenedor principal de la vista
	container: {
		backgroundColor: '#F5FCFF',
		flex:1,
		paddingTop: 100,
		alignItems: 'center',
		padding:10
	},
	logo: {
		width: 66,
		height:55
	},
	heading: {
		fontSize:30,
		marginTop:10
	},
	input: {
		height:50,
		marginTop:10,
		padding:4,
		fontSize:18,
		borderWidth:1,
		borderColor:'#48bbec'
	},
	button: {
		height:50,
		backgroundColor:'#48BBEC',
		alignSelf: 'stretch',
		marginTop:10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize:22,
		color:'#FFF',
		alignSelf:'center'
	}
})


