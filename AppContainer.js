import React, { Component } from 'react';
import {	
	View,
	Text,
	StyleSheet,
	TabBarIOS,
	NavigatorIOS	
} from 'react-native';

import AuthService from './AuthService';
import Search from './Search';

import Feed from './Feed.js';


export default class AppContainer extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	 selectedTab: 'feed'
	  }
	}
	render(){
		return (
			<TabBarIOS style={styles.container}> 
				<TabBarIOS.Item
					title='Feed'					
					icon={require('image!inbox')}
					selected={this.state.selectedTab === 'feed'}
					onPress={()=> this.setState({selectedTab:'feed'})} >
						<NavigatorIOS
							style={{flex:1}}
							initialRoute={{
								component:Feed,
								title: 'Feed'
							}}	/>
						

					</TabBarIOS.Item>
				
				<TabBarIOS.Item
					title='Search'
					selected={this.state.selectedTab === 'search'}
					icon={require('image!search')}
					onPress={()=>this.setState({selectedTab:'search'})}>
					<NavigatorIOS
							style={{flex:1}}
							initialRoute={{
								component:Search,
								title: 'Busqueda'
							}}	/>
						
					</TabBarIOS.Item>

				
			</TabBarIOS>
			);
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
  }
});