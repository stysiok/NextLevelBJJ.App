import React from 'react';
import { Alert, AsyncStorage,View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Button, Text, Icon } from 'native-base';
import { HeaderBackButton } from 'react-navigation';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: false
        };
    }

    static navigationOptions = ({navigation}) => {
        return{
          headerLeft:(<HeaderBackButton onPress={() => {

                Alert.alert(
                'Wyloguj się',
                'Czy na pewno chcesz się wylogować z aplikacji? Będziesz ponownie musiał/a zeskanować swój kod QR.',
                [
                {
                    text: 'Tak',
                    onPress: async() => {
                        await AsyncStorage.removeItem('student', () => navigation.navigate('Home'))
                    },
                },
                { text: 'Nie', onPress: () => {} },
                ],
                { cancellable: false }
                );
          }} tintColor={'white'}/>)
       }
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

    logOut = async() => {
        Alert.alert(
            'Wyloguj się',
            'Czy na pewno chcesz się wylogować z aplikacji? Będziesz ponownie musiał/a zeskanować swój kod QR.',
            [
              {
                text: 'Tak',
                onPress: async() => {
                    await AsyncStorage.removeItem('student', () => this.props.navigation.navigate('Home'))
                },
              },
              { text: 'Nie', onPress: () => {} },
            ],
            { cancellable: false }
          );
    }

    render(){
        const { navigation } = this.props;
        const student = navigation.getParam('student');
        
        return (
        <Container>
            <StatusBar />
            <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
            <View style={styles.overlay} />
            <View style={styles.textBox}>
                <Text style={styles.greeting}>Oss {student.firstName}!</Text>
            </View>
            <View style={styles.buttons}>
            <Button iconLeft large style={styles.button} onPress={() => { this.props.navigation.navigate('Pass', { passCode: student.passCode })}}>
                <Icon name="account-card-details" type="MaterialCommunityIcons" />
                <Text> Karnet </Text>
            </Button>
            <Button iconLeft large style={styles.button} onPress={() => {this.props.navigation.navigate('Schedule')}}>
                <Icon name="calendar-clock" type="MaterialCommunityIcons"/>
                <Text> Grafik </Text>
            </Button>
            <Button iconLeft large style={styles.button} onPress={() => {this.props.navigation.navigate('PriceList')}}>
                <Icon name="currency-usd"  type="MaterialCommunityIcons" />
                <Text> Cennik </Text>
            </Button>
            <Button iconLeft large style={styles.button} onPress={() => {this.props.navigation.navigate('Attendances', { id: student.id})}}>
                <Icon name="calendar-multiselect" type="MaterialCommunityIcons" />
                <Text> Treningi </Text>
            </Button>
            <Button bordered dark iconLeft style={[styles.button, styles.leave]} onPress={() => {this.logOut()}}>
                <Icon name="exit-run"  type="MaterialCommunityIcons" color="black" />
                <Text> Wyloguj </Text>
            </Button>
            </View>
        </Container>
        );
    }
}

const styles = StyleSheet.create({
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