import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  View
} from 'react-native';

class About extends Component {
    render(){
        return(
            <View style={{flex:1,alignItems:"center", margin:20}}>
                <ScrollView style={{flex:1}}>
                    <Text style={{fontSize:18,color:"white"}}>Hey there! QuoteApp here</Text>
                    <Text style={{fontSize:18,color:"white"}}>Please support us with a review on Google Play either you like or you don't like our app. Thank you!</Text>
                    <Text style={{fontSize:18,color:"white"}}>QuoteApp has:</Text>
                    <Text style={{fontSize:18,color:"white"}}>*Over 75.000 quotes</Text>
                    <Text style={{fontSize:18,color:"white"}}>*Over 117 categories</Text>
                    <Text style={{fontSize:18,color:"white"}}>*Great UI designed for reading</Text>
                    <Text style={{fontSize:18,color:"white"}}>Please support us for our next releases that will include: offline database, search by quote/category/author, more than 200.000 quotes, picture generation based on quote.Thank you so much! Seba,Darius</Text>
                </ScrollView>
            </View>
        );
    }
}

module.exports = About;