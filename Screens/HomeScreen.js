import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Geolocation from '@react-native-community/geolocation';

'use strict';

//navigator.geolocation = require('@react-native-community/geolocation');

export default class HomeScreen extends React.Component<
  {},
  $FlowFixMeState,
>{
  state = {
     initialPosition: 'unknown',
     lastPosition: 'unknown',
   };

   watchID: ?number = null;

   componentDidMount() {
     Geolocation.getCurrentPosition(
       position => {
         const initialPosition = JSON.stringify(position);
         this.setState({initialPosition});
       },
       //error => Alert.alert('Error', JSON.stringify(error)),
       {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
     );
     this.watchID = Geolocation.watchPosition(position => {
       const lastPosition = JSON.stringify(position);
       this.setState({lastPosition});
     });
   }

   componentWillUnmount() {
     this.watchID != null && Geolocation.clearWatch(this.watchID);
   }

    render(){
      Geolocation.getCurrentPosition(info => console.log(info));
        return (
            <ScrollView style={styles.container}>
              <View>
                <Text>
                  <Text style={styles.title}>Initial position: </Text>
                  {this.state.initialPosition}
                </Text>
              <Text>
                <Text style={styles.title}>Current position: </Text>
                  {this.state.lastPosition}
                </Text>
              </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: wp('5%'),
        backgroundColor: 'white',
    },
    wrapContent: {
        width: wp('90%'),
        height: wp('90%'),
        paddingBottom: wp('5%'),

    },
    content: {
        width: "100%",
        height: "100%",
        backgroundColor: "#46c3ad",
    }
})
