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

import QuotesList from './QuotesList';

var Firebase = require('firebase');

class CategoriesList extends Component {
  constructor(props) {
    super(props);
    this.dataSource = new ListView.DataSource(
      { rowHasChanged: (r1, r2) => r1 !== r2 }
    );

    let path = "/categories";
    this.items = [];

    this.state = {
      dataSource: this.dataSource.cloneWithRows(this.items),
      isLoading: true,
      isListFetching: false,
      offset: 0,
      limit: 30
    };
    
    var me = this;
    Firebase.database().ref(path)
          .orderByChild("name")
          .startAt("")
          .limitToFirst(30)
          .on('value', (snapshot) => {
            snapshot.forEach((child) => {
                me.items.push({
                  id: child.val().id,
                  number: child.val().number,
                  name: child.val().name
                });
            });
            this.setState({dataSource: this.dataSource.cloneWithRows(me.items),isLoading:false,offset:me.items[me.items.length-1].name});
          });

    
  }

  rowPressed(categoryObj) {
    this.props.navigator.push({
      title: categoryObj.name,
      component: QuotesList,
      passProps: {category: categoryObj}
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
            <View style={styles.bgImageWrapper}>
              <Image style={styles.bgImage} source={{uri:"http://loremflickr.com/400/400/"+rowData.name}} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>{rowData.name.toUpperCase()}</Text>
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
    let path = "/categories";
    console.log("offset:",me.state.offset);
    console.log("limit:",me.state.limit);
    Firebase.database().ref(path)
        .orderByChild("name")
        .startAt(me.state.offset+"1")
        .limitToFirst(me.state.limit)
        .on('value', (snapshot) => {
          snapshot.forEach((child) => {
              me.items.push({
                id: child.val().id,
                number: child.val().number,
                name: child.val().name
              });
          });
          me.setState({offset:me.items[me.items.length-1].name,isListFetching:false,dataSource:me.dataSource.cloneWithRows(me.items)});
          console.log(me.items.length);
          
        });
  }

  render() {
    let spinner = this.state.isLoading ? (<ActivityIndicator size={80} />) : (<View/>);
    let listSpinner = this.state.isListFetching ? (<ActivityIndicator size="large" />) : (<View/>);
    return (
      <View style={{ flex: 1}}>
        <Text style={{ fontSize: 14,margin:8,color: 'black',textAlign: 'left',fontFamily: 'Helvetica', }}>select a category</Text>
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
  bgImageWrapper: {
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0
    },
    bgImage: {
        flex: 1,
        opacity: 0.25,
        resizeMode: "cover"
    },
  thumb: {
    width: 30,
    height: 30,
    marginRight: 10
  },
  textContainer: {
    flex: 1
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E'
  },
  title: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'JosefinSans'
  },
  rowContainer: {
    flexDirection: 'row',
    padding: 50
  }
});

module.exports = CategoriesList;
