import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet, Image, Text } from 'react-native';

export default class Activity extends Component {
    
    getRandomFooterText = () => {
        var randomNumber = Math.floor(Math.random() * footerTexts.length);
        return footerTexts[randomNumber];
    };
        
    render(){
        return (
            <View style={styles.mainView}>
                <Image style={styles.backgroundImage} source={require('../../assets/images/welcomeBg.jpg')}/>
                <View style={styles.overlay} />
                <Text style={styles.header}>
                    {this.props.headerText}
                </Text>
                <ActivityIndicator size="large" color="#fff" />
                <Text style={styles.footer}>
                    {this.getRandomFooterText()}
                </Text>
            </View>
        );
    }
}

const footerTexts = ['Stabilizuje boczną', 
                    'Łapie chwyty', 'Wpinam haki', 
                    'Utrzymuje dosiad', 'Rozpłaszczam półgardę', 
                    'Atakuję nogi', 'Poprawiam Gi']; 

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
    footer: {
        fontSize: 25,
        backgroundColor: 'transparent',
        textAlign: 'center',
        width: '70%',
        color: 'white',
        marginTop: 15,
    }
});
