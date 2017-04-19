/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, Navigator, View ,BackAndroid, StatusBar, ToolbarAndroid} from 'react-native';
import CategoriesList from './app/views/CategoriesList';
import About from './app/views/About';


var Firebase = require('firebase');

BackAndroid.addEventListener('hardwareBackPress', function() {
  if (navigator &&navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
});

var config = {
  apiKey: "AIzaSyAeGfGN0pzczc2DLG2JB9DQSLTiH1Kk8kg",
  authDomain: "quote-679e8.firebaseapp.com",
  databaseURL: "https://quote-679e8.firebaseio.com",
  storageBucket: "quote-679e8.appspot.com",
  messagingSenderId: "717396586965"
};
Firebase.initializeApp(config);


function renderScene(route, navigator) {
  
    var Component = route.component;
    return (
      <Component { ...route.passProps} navigator={navigator} route={route} />
    );
}

export default class BestQuotes extends Component {


  onActionSelected(position){
    if(position == 0){
      navigator.push({
        title: 'About',
        component: About
      });
    } else if(position == 1){
      navigator.push({
        title:'Quote of the day',
        component: QuoteOfTheDay
      });
    }
    
  }

  render() {
    const initialRoute = {
      component: CategoriesList
    };
    
    return (
      <View style={{ flex: 1,backgroundColor:"#daf4ff" }}>
        <StatusBar
          backgroundColor="#355C7D"
          barStyle="light-content"
        />
        <ToolbarAndroid
          style={{height:56,backgroundColor: 'white'}}
          title="QUOTEAPP"
          subtitle="best whatsapp and fb status quotes"
          subtitleColor="#355C7D"
          actions={[
            {title: 'About', show: 'never'},
            {title: 'Quote of the day', show:'never'}
          ]}
          onActionSelected={this.onActionSelected}
          titleColor="#355C7D"
        />
        <Navigator
          ref={(nav) => { navigator = nav; }}
          initialRoute={initialRoute}
          renderScene={renderScene}
          configureScene={(route, routeStack) => Navigator.SceneConfigs.FadeAndroid}
        />
      </View>
    );
  }
}
        // <Text style={{ fontSize: 25,fontWeight: 'bold',marginBottom:8,backgroundColor:'white',color: '#355C7D',textAlign: 'center',fontFamily: 'Helvetica', }}>QUOTEAPP</Text>

AppRegistry.registerComponent('BestQuotes', () => BestQuotes);
