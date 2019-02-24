import React from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar, Image, ScrollView } from 'react-native';
import { Container, Button, Text, Content, Icon } from 'native-base';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: false
        };
    }

    componentWillMount() {
        this.loadFonts();
    }
    async loadFonts() {
        await Expo.Font.loadAsync({
            Roboto: require("native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            MaterialCommunityIcons: require("@expo/vector-icons/fonts/MaterialCommunityIcons.ttf")
        });
    }

    render(){
        const { navigation } = this.props;
        const student = navigation.getParam('student');
        
        console.log(student);

        return (
        <Container>
            <StatusBar />
            <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
            <View style={styles.overlay} />
            <View style={styles.textBox}>
                <Text style={styles.greeting}>Oss {student.firstName}!</Text>
            </View>
            <View style={styles.buttons}>
            <Button iconLeft large style={styles.button}>
                <MaterialCommunityIcons name="account-card-details" size={32} color="white" />
                <Text> Karnet </Text>
            </Button>
            <Button iconLeft large style={styles.button}>
                <MaterialCommunityIcons name="calendar-clock" size={32} color="white" />
                <Text> Grafik </Text>
            </Button>
            <Button iconLeft large style={styles.button}>
                <MaterialCommunityIcons name="currency-usd" size={32} color="white" />
                <Text> Cennik </Text>
            </Button>
            <Button iconLeft large style={styles.button}>
                <MaterialCommunityIcons name="calendar-multiselect" size={32} color="white"/>
                <Text> Historia </Text>
            </Button>
            <Button bordered dark iconLeft style={[styles.button, styles.leave]}>
                <MaterialCommunityIcons name="exit-run" size={32} color="black" />
                <Text> Wyloguj </Text>
            </Button>
            </View>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    btn: {
        flex: 1,
        justifyContent: 'center'
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
    textBox:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    greeting:{
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    buttons: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button:{
        alignSelf: 'center',
        backgroundColor: 'black'
    },
    leave:{
        backgroundColor: 'white',
    }
});