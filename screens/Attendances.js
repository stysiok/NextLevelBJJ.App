import React from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Icon, Button, Text } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import moment from 'moment';
import Activity from './sharedScreens/Activity';
import Training from './components/Training';

let attendances;
export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }
    
    componentWillMount = async() => {
        await this.getAttendances();

        this.setState({ isLoading: false });
    }

    getAttendances = async() => {
        let id = this.props.navigation.getParam('id');

        var response = await await graphQLFetch(``);

        if(response.data.attendances != null){
            attendances = response.data.attendances;
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania treningów" : "Nie odbyłeś żadnego treningu",
                text: response.Message ? response.Message : "Treningi klubowicza nie istnieją w bazie danych"
            });
        }
    }
    
    render(){
        if(this.state.isLoading){
            return(
                <Activity headerText="Wczytuje odbyte treningi"></Activity>
            );
        } else {
            return (
                <Container>
                    <StatusBar />
                        <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={styles.overlay} />
                        <View style={styles.textBox}>
                            <Text style={styles.greeting}>Odbyte treningi!</Text>
                        </View>
                </Container>
            );
        }
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
        fontSize: 35,
        fontWeight: 'bold'
    },
});