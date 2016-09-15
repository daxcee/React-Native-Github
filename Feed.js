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
import moment from 'moment';
import PushPayload from './PushPayload';

// importacion de la traducciones
import localeEs from 'moment/locale/es';

export default class Feed extends Component {
	constructor(props) {
	  super(props);
      var ds = new ListView.DataSource({
        rowHasChanged:(r1, r2)=> r1!= r2
      });
	  this.state = {	  
        dataSource: ds,
        showProgress: true
	  }

    moment.locale('es');
	}

  pressRow(rowData){
    this.props.navigator.push({
      title: 'Push Event',
      component : PushPayload,
      passProps: {
        pushEvent: rowData
      }
    });
  }
  
  renderRow(rowData) {
    return (
      <TouchableHighlight 
        onPress={()=> this.pressRow(rowData)}
          underlayColor='#ddd'
      >
        <View style={styles.cell} >
          <Image 
            style = {styles.avatar}
            source = {{uri: rowData.actor.avatar_url}} />
            <View style= {{paddingLeft: 20}}> 
              <Text > {moment(rowData.created_at).fromNow()} </Text>
              <Text > {rowData.actor.login} </Text>
              <Text > {rowData.payload.ref.replace('refs/heads/','')} </Text>
              <Text > {rowData.repo.name} </Text> 
            </View>       
        </View>
      </TouchableHighlight>
    );    
  }
  
  componentDidMount() {
    this.fetchFeed();
  }
  
  fetchFeed() {
    AuthService.getAuthInfo((err,authInfo)=> {
      var url='https://api.github.com/users/'+ authInfo.user.login+'/received_events';
      fetch(url, {headers:authInfo.header})
        .then((response)=> response.json())
        .then((responseData)=> {
          var feedItems = responseData.filter((ev)=>ev.type == 'PushEvent');
        console.log(feedItems);
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems) ,
          showProgress:false 
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