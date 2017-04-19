'use strict';

import React, { Component } from 'react';
import {
  Text,
  StyleSheet,
  TouchableHighlight,
  ListView,
  View,
  Image,
  ActivityIndicator
} from 'react-native';

import QuoteView from './QuoteView';

var Firebase = require('firebase');

class QuotesList extends Component {
  constructor(props) {
    super(props);

    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 }
    );

    this.items = [];
    

    this.state = {
      dataSource: this.dataSource.cloneWithRows(this.items),
      isLoading: true,
      isListFetching: false,
      offset: 0,
      limit: 30
    };

    let path = "/quotes/"+this.props.category.name;


    
    
    var me = this;
    Firebase.database().ref(path)
          .orderByChild("id")
          .startAt("")
          .limitToFirst(30)
          .on('value', (snapshot) => {
            snapshot.forEach((child) => {
              console.log(child);
                me.items.push({
                  id: child.val().id,
                  quote: child.val().quote,
                  author: child.val().author
                });
            });
            
            this.setState({dataSource: this.dataSource.cloneWithRows(me.items),isLoading:false,offset:me.items[me.items.length-1].id});
          });
  }

  renderCategoryTitle(string){

  }

  rowPressed(quoteObj) {
    this.props.navigator.push({
      title: "Quote",
      component: QuoteView,
      passProps: {quoteData: quoteObj}
    });
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight
        onPress={() => this.rowPressed(rowData)}
        underlayColor='#dddddd'
      >
        <View>
          <View style={styles.rowContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={3}>{rowData.quote}</Text>
            </View>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  onEndReached(){
    this.setState({ isListFetching: true});
    var me = this;
    let path = "/quotes/"+this.props.category.name;
    console.log("offset:",me.state.offset);
    console.log("limit:",me.state.limit);
    Firebase.database().ref(path)
        .orderByChild("id")
        .startAt(me.state.offset+"0")
        .limitToFirst(me.state.limit)
        .on('value', (snapshot) => {
          snapshot.forEach((child) => {
              me.items.push({
                id: child.val().id,
                quote: child.val().quote,
                author: child.val().author
              });
          });
          me.setState({offset:me.items[me.items.length-1].id,isListFetching:false,dataSource:me.dataSource.cloneWithRows(me.items)});
          
        });
  }

  render() {
    let spinner = this.state.isLoading ? (<ActivityIndicator size={80} />) : (<View/>);
    let listSpinner = this.state.isListFetching ? (<ActivityIndicator size="large" />) : (<View/>);
    return (
      <View style={{ flex: 1}}>
        <Text style={{ fontSize: 20,fontWeight: 'bold',margin:5,color: '#355C7D',textAlign: 'left',fontFamily: 'Helvetica', }}>{this.props.category.name.toUpperCase()} QUOTES</Text>
        {spinner}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          onEndReached={this.onEndReached.bind(this)}
          onEndReachedThreshold={100}
          enableEmptySections={true}
        />
        {listSpinner}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textContainer: {
    flex: 1
  },
  separator: {
    height: 0.7,
    backgroundColor: 'black'
  },
  title: {
    fontSize: 20,
    color: '#355C7D',
    fontFamily: 'Helvetica'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 10
  }
});

module.exports = QuotesList;
