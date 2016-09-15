import buffer from 'buffer'
import {
	AsyncStorage 
} from 'react-native' 

import _ from 'lodash'


const authKey = 'auth4';
const userKey = 'user4';


export default class AuthService {

	static getAuthInfo(cb) {
		AsyncStorage.multiGet([authKey,userKey], (err,val)=> {
			// Return Error if exist
			if (err) {
				return cb(err);
			}

			// if val is empty return
			if (!val){
				return cb(); 
			}
			
			var l = require('lodash');
			// if authKey it doesn't exist
			var zippedObj = _.fromPairs(val);				
			if (!zippedObj[authKey]){
				return cb();
			}

			// return the info
			var authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			}

			return cb(null,authInfo);

		});
	}
	
	// Do login
	static login(cred,cb) {
	
		var b = new buffer.Buffer(cred.username+':'+cred.password);
		var encodedAuth = b.toString('base64');

			fetch('https://api.github.com/search/repositories?q=react',{
				headers: {
					'Authorization' : 'Basic ' + b.toString('base64')
				}
			})
			.then((response)=> {
				if (response.status>= 200 && response.status <300) {
					return  response;
				}

				throw {
					badCredentials: response.status ==401,
					unknownError: response.status !=401
				}

			})
			.then((response)=> {				
				return response.json();
			})
			.then((results)=> {
				results.login = cred.username
				AsyncStorage.multiSet([
					[authKey,encodedAuth],
					[userKey, JSON.stringify(results)]
					], (err)=> {
						if(err) {
							throw err;
						}
					}); 

				return cb({success:true});
			})
			.catch ((err) => {
				console.log(err);
				return cb(err);
			})
			
	}
} 
