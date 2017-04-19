'use strict';

import React, {Component} from 'react';
import {
  StyleSheet, 
  Image, 
  View, 
  Text , 
  BackAndroid, 
  TouchableHighlight,
  ScrollView,
  Clipboard,
  ToastAndroid
} from 'react-native';

import Share from 'react-native-share';


class QuoteView extends Component {
  copyToClipboard(){
    let str = '"'+this.props.quoteData.quote+'"-'+this.props.quoteData.author;
    Clipboard.setString(str);
    ToastAndroid.show('Your quote was copied to clipboard!', ToastAndroid.SHORT);
  }
  
  render() {
    let _quote = this.props.quoteData;

    let str = '"'+_quote.quote+'"-'+_quote.author;

    let shareOptions = {
      title: "QUOTEAPP quote",
      message: str,
      url: "http://quoteapp.info/",
      subject: str //  for email
    };

    return(
      <View style={styles.container}>
        <ScrollView style={styles.heading}>
            <Text style={styles.title}>{_quote.quote}</Text>
            <View style={styles.separator}/>
            <Text style={styles.author}>{_quote.author}</Text>
            <View style={{justifyContent: 'center',alignItems: 'center', marginTop:40}}>
              <Image style={{height:150, width:150}} source={require('../resources/symbol-28.png')}/>
            </View>
        </ScrollView>
        <View style={styles.flowDown}>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={()=>{
              Share.open(shareOptions);
            }}
          >
            <Text style={styles.buttonText}>Share</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.button}
            underlayColor='#99d9f4'
            onPress={this.copyToClipboard.bind(this)}
          >
            <Text style={styles.buttonText}>Copy</Text>
          </TouchableHighlight>
        </View>
      </View>
      
    );
  }
}

const styles = StyleSheet.create({
  button: {
    height: 36,
    flex:1,
    flexDirection: 'row',
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  flowDown: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  container: {
    flex:1
  },
  heading: {
    flex:1,
    backgroundColor: '#F8F8F8',
    marginBottom: 60
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  author: {
    fontSize: 25,
    fontWeight: 'bold',
    margin:5,
    color: '#48BBEC',
    textAlign: 'right'
  },
  title: {
    fontFamily: 'sans-serif-light',
    fontSize: 28,
    margin: 10,
    color: '#656565'
  }
});


module.exports = QuoteView;
