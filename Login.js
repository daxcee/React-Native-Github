import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	ActivityIndicator
} from 'react-native';

import AuthService from './AuthService';

export default class Login extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	showProgress: false
	  }
	}

	render() {

		var errorCtrl = <View />;
		if(!this.state.success && this.state.badCredentials) {
			errorCtrl=<Text style={styles.error} > 
				El Usuario o password no son correctos
			</Text>;
		}

		if(!this.state.success &&  this.state.unknownError) {
			errorCtrl=<Text style={styles.error} > 
				Ocurrio un error desconocido
			</Text>;
		}

		return (
			<View style={styles.container} >
				<Image style={styles.logo}
					source={require('image!Octocat')} />
					<Text style= {styles.heading}>
						Github Browser
					</Text>
					<TextInput 
						onChangeText={(text)=>this.setState({username:text})}
						style={styles.input} 
						placeholder ="Github username" />
					<TextInput 
						onChangeText={(text)=>this.setState({password:text})}
						style={styles.input} 
						placeholder ="Github  password" 
						secureTextEntry={true} />
					<TouchableHighlight 
						onPress={this.onLoginPressed.bind(this)}
						style={styles.button}>
						<Text style={styles.buttonText}> Log In </Text>
					</TouchableHighlight>
					{errorCtrl}
					<ActivityIndicator
						animating ={this.state.showProgress}
						size="large" />
			</View>
	 		);

		
 	}

 	onLoginPressed(){
			
			this.setState({showProgress:true});			
			
			AuthService.login({
				username: this.state.username,
				password: this.state.password
			},(results)=> {
				this.setState(Object.assign({
					showProgress:false
				},results));  

				if (results.success && this.props.onLogin){
					this.props.onLogin();
				}
			});
		}
}

var styles = StyleSheet.create({
	// Contenedor principal de la vista
	container: {
		backgroundColor: '#F5FCFF',
		flex:1,
		paddingTop: 50,
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
	}, 
	loader : {
		marginTop:20,

	},
	error : {
		color: 'red',
		paddingTop:10
	}
})


