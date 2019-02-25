import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import { Container, Text } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }
    
    componentWillMount = async() => {
        await this.getTrainingDay();
        await this.getTrainingWeek();
        
        this.setState({ isLoading: false });
    }

    getTrainingDay = async() => {
        var response = await await graphQLFetch(`{
            training{
              day
              classes {
                name
                startHour
                finishHour
              }
            }
          }`);

        if(response.data.training != null){
            today = response.data;
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania dnia treningowe" : "Podano błędny kod",
                text: response.Message ? response.Message : "Nie udało się pobrać dzisiejszego treningu"
            });
        }
    }

    getTrainingWeek = async() => {
        var response = await await graphQLFetch(`{
            trainings{
              day
              classes {
                name
                startHour
                finishHour
                isKidsClass
              }
            }
          }`);

        if(response.data.trainings != null){
            week = response.data;
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania treningów" : "Podano błędny kod",
                text: response.Message ? response.Message : "Nie udało się pobrać treningów"
            });
        }
    }

    render(){
        if(this.state.isLoading){
            return(
                <Activity headerText="Wczytuje grafik"></Activity>
            );
        } else {
            return (
                <Container>
                    <StatusBar />
                        <Image style={bgStyles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={bgStyles.overlay} />
                        <View style={styles.today}>
                            <View style={[styles.today, styles.boxHeader]}>
                                <Text style={styles.heading}>Dziś! ({today.training.day})</Text>
                            </View>
                            <View style={[styles.today, styles.boxTodayTrainings]}> 
                                <FlatList
                                data={today.training.classes}
                                renderItem={({item}) => <Text style={styles.training}> {item.startHour} - {item.finishHour} {item.name}</Text>} />
                            </View>
                           </View>
                        <View style={styles.week}>
                            <Text>Pełen tydzień!</Text>
                        </View>
                </Container>
            );
        }
    }
}

let today;
let week;

const styles = StyleSheet.create({
    today: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxTodayTrainings: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    week: {
        flex: 2,
        backgroundColor: 'transparent'
    },
    heading: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 30
    },
    training: {
        flex: 2,
        textAlign: 'center',
        color: 'white',
        fontSize: 15
    }
});

const bgStyles = StyleSheet.create({
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
    }
});