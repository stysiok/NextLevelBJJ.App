import React, { Component } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';

export default class Activity extends Component {
    render(){
        const { navigation } = this.props;
        const headerText = navigation.getParam('headerText', 'Aplikacja odklepała');
        const text = navigation.getParam('text', 'Coś poszło nie tak');

        return (
            <View style={styles.mainView}>
                <Image style={styles.backgroundImage} source={require('../../assets/images/welcomeBg.jpg')}/>
                <View style={styles.overlay} />
                <Text style={styles.header}>
                    {headerText}
                </Text>
                <Text style={styles.text}>
                    {text}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    header: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 25,
    },
    text: {
        fontSize: 25,
        backgroundColor: 'transparent',
        textAlign: 'center',
        width: '70%',
        color: 'white',
        marginTop: 15,
    }
});
