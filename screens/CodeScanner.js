import React, { Component } from 'react';
import { Alert, Linking, Dimensions, LayoutAnimation, Text, View, StatusBar, StyleSheet, TouchableOpacity } from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

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

  _handleBarCodeRead = result => {
    console.log(this.state.lastScannedValue)
    if (result.data !== this.state.lastScannedValue) {
      LayoutAnimation.spring();
      this.setState({ lastScannedValue: result.data });
    }
    console.log(result);
  };

  render() {
    return (
      <View style={styles.container}>

        {this.state.hasCameraPermission === null
          ? <Text>Requesting for camera permission</Text>
          : this.state.hasCameraPermission === false
              ? <Text style={{ color: '#fff' }}>
                  Camera permission is not granted
                </Text>
              : <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={StyleSheet.absoluteFill}>
                  <View style={styles.margins}></View>
                  <View style={styles.inside}>
                    <View style={styles.side}></View>
                    <View style={styles.highlight}></View>
                    <View style={styles.side}></View>
                  </View>
                  <View style={styles.margins}></View>
                  </BarCodeScanner>}
        <StatusBar hidden />
      </View>
    );
  }

  _handlePressUrl = () => {
    Alert.alert(
      'Open this URL?',
      this.state.lastScannedValue,
      [
        {
          text: 'Yes',
          onPress: () => Linking.openURL(this.state.lastScannedValue),
        },
        { text: 'No', onPress: () => {} },
      ],
      { cancellable: false }
    );
  };

  _handlePressCancel = () => {
    this.setState({ lastScannedValue: null });
  };
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
    backgroundColor: opacity
  },
  inside: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  side: {
    flex: 1, 
    backgroundColor: opacity
  },
  highlight: {
    flex: 8
  }
});
