import React from 'react';
import * as Expo from "expo";
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Button, Text, Body } from 'native-base';
import Activity from './sharedScreens/Activity';

export default class Welcome extends React.Component{
    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    async componentWillMount() {
        await this.loadFonts();

        let student = await AsyncStorage.getItem('student');
        if(student !== null){
            this.props.navigation.navigate('Main', {
                student: JSON.parse(student)
              });
        }
        
        this.setState({
            isReady: true
        });
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf")
        });
    }
    
    render(){
        if(this.state.isReady){
            return (
                <View style={styles.view}>
                    <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                    <View style={styles.overlay} />
                    <Image style={styles.logo} source={require('../assets/images/nextLevelLogo.png')}/>
                    <Text style={styles.header}>
                        {'Oss Jujiterio!'.toUpperCase()}
                    </Text>
                    <Text style={styles.text}>
                        Witaj w mobilnej aplikacji klubu Next Level Opole. Sprawdzisz tu ważność karnetu, treninigi na które uczęszczałeś czy plan zajęć.
                    </Text>
                    <Body style={styles.body}>
                        <Button primary rounded large style={styles.button} onPress={() => {this.props.navigation.navigate('CodeScanner')}}>
                            <Text>{' wczytaj karnet '.toUpperCase()}</Text>
                        </Button>
                    </Body>
                </View>
            );
        }else{
            return(
                <Activity headerText="Zczytuję ustawienia" />
            );
        }
    }
}

const styles = StyleSheet.create({
    view: {
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
    logo: {
        alignSelf: 'center',
        width: '65%',
        height: '65%',
        flex: 4
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    header: {
        flex: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    text: {
        backgroundColor: 'transparent',
        textAlign: 'center',
        color: '#ffffff',
        fontSize: 20,
        flex: 2,
        width: '80%'
    },
    body: {
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center'
    }    
});