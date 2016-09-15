import React, { Component } from 'react';
import {	
	View,
	Text,
  StyleSheet,
  ListView,
  ActivityIndicator,
  Image,
  TouchableHighlight
} from 'react-native';

import AuthService from './AuthService';
 

export default class SearchResult extends Component {
	constructor(props) {
	  super(props);
      var ds = new ListView.DataSource({
        rowHasChanged:(r1, r2)=> r1!= r2
      });
	  this.state = {	  
        dataSource: ds,
        showProgress: true,
        searchQuery : props.searchQuery
	  }

	}

  
  renderRow(rowData) {
    return (
      <TouchableHighlight 
          underlayColor='#ddd'>
        <View style={styles.cell} />
         
      </TouchableHighlight>
    );    
  }
  
  componentDidMount() {
    this.doSearch();
  }
  
  doSearch() {
    AuthService.getAuthInfo((err,authInfo)=> {
      var url='https://api.github.com/search/repositories?q='+ encodeURIComponent(this.state.searchQuery);
      fetch(url)
        .then((response)=> response.json())
        .then((responseData)=> {        
            this.setState({
            repositories:responseData.respositories,
            dataSource: this.state.dataSource.cloneWithRows(responseData.items)             
          });            
        })
        .finally(()=> {
              this.setState({
                showProgress: false
              })
          });
    });
  }
  
	render(){
    if (this.state.showProgress) {
      return (
        <View style={styles.containerCenter}>
                <ActivityIndicator
                    size="large"
                    animating={true} />
            </View>
      )
    }

		return (
          <View style ={styles.container} >
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)} />
          </View>
        );
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start'    ,
    marginTop: 50
  },
    containerCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  cell: {
    flex:1,
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    borderColor: '#D7D7D7',
    borderBottomWidth: 1
  },
  avatar: {
    height: 36,
    width: 36,
    borderRadius: 18    
  },
  infoList: {
    paddingLeft: 20

  },
  listview: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});