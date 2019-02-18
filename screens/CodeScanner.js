import React, { Component } from 'react';
import { Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';
import { GraphQLFetch } from '../extensions/GraphQL';

export default class App extends Component {
  state = {
    hasCameraPermission: null,
    lastScannedValue: null,
  };

  componentDidMount() {
    this._requestCameraPermission();
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = async(result) => {
    console.log(result);
    if (result.data !== this.state.lastScannedValue) {
      LayoutAnimation.spring();
      this.setState({ lastScannedValue: result.data });
    }

    var data = await GraphQLFetch(`{
      getStudentByPassId(passCode:"NL096") {
        firstName
        lastName
      }
    }`);
    console.log(data.data.getStudentByPassId.firstName);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null
          ? <Text>Potrzebujemy Twojego aparatu, żeby zeskanować Twój kod QR.</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Nie dałeś udzieliłeś przyzwolenia, więc jak chcesz zczytać informację o karnecie?
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={StyleSheet.absoluteFill}>
                  <View style={styles.margins}>
                  <Text style={styles.topText}>Zeskanuj swój kod QR z karnetu</Text>
                  </View>
                  <View style={styles.inside}>
                    <View style={styles.side}></View>
                    <View style={styles.highlight}></View>
                    <View style={styles.side}></View>
                  </View>
                  <View style={styles.margins}>
                  <Text style={styles.bottomText} onPress={() => this.props.navigation.pop()}>Powrót</Text>
                  </View>
                  </BarCodeScanner>}
        <StatusBar />
      </View>
    );
  }
}

const { width } = Dimensions.get('window');
const opacity = 'rgba(0, 0, 0, .7)';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  }, 
  margins:{
    flex: 3,    
    backgroundColor: opacity,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topText: {
    fontSize: width * 0.09,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  inside: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between', 
  },
  side: {
    flex: 1, 
    backgroundColor: opacity
  },
  bottomText:{
    fontSize: width * 0.07,
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  highlight: {
    flex: 8
  }
});
