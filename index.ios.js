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
  View,
  ActivityIndicator
} from 'react-native';

import  Login from './Login'
import  AppContainer from './AppContainer'

import AuthService from "./AuthService"

class GithubBrowser extends Component {
  constructor(props) {
     super(props);
     this.state = {
      isLoggedIn : false,
      checkingAuth : true
    };
   }

  render() {
  
    if (this.state.checkingAuth) {
      return (
          <View style={styles.container}>
            <ActivityIndicator
            animating ={true}
            size="large" />
          </View>          
          );
    }

    if (this.state.isLoggedIn){
        return (
          <AppContainer />       
          );
      } else {
        console.log('Estado', this.state.isLoggedIn);
        return (<Login onLogin={this.onLogin.bind(this)}/> );
    }
  }

   onLogin() {
      console.log("Login Correcto");
      console.log("Estado antes de modificar", this.state.isLoggedIn);
      this.setState({isLoggedIn:true});
      console.log("Estado despues de modificar", this.state.isLoggedIn);

   } 

   componentDidMount() {
     AuthService.getAuthInfo((err,authInfo)=> {
        this.setState({
          checkingAuth:false,  // ocultamos el loader ActivityIndicator
          isLoggedIn: authInfo != null
        });
     });

   }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
