import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList, Text } from 'react-native';
import { Container, Accordion, Content } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';

let today, week;
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
        
        week.trainings = week.trainings.filter(el => el.classes.length > 0);
        week.trainings.forEach(tr => tr.classes.forEach(cl => console.log(cl.startHour)));
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
                        <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={styles.overlay} />
                        <View style={styles.today}>
                            <Text style={styles.heading}>Dziś! ({today.training.day})</Text>
                            <FlatList
                            data={today.training.classes}
                            keyExtractor={item => item.name}
                            renderItem={({item}) => <Text style={styles.training}> {item.startHour} - {item.finishHour} {item.name}</Text>} />
                        </View>
                        <View style={styles.week}>
                            <Text style={styles.heading}>Pełen tydzień!</Text>
                            <FlatList
                            data={week.trainings}
                            keyExtractor={item => item.day}
                            renderItem={({item}) => 
                                    <View>
                                    <Text style={styles.heading}>{item.day}</Text>
                                    <FlatList
                                        data={item.classes}
                                        keyExtractor={obj => obj.name}
                                        renderItem={({item: training}) => <Text style={styles.training}> {training.startHour} - {training.finishHour} {training.name}</Text>} />
                                    </View>
                                } />
                        </View>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    today: {
        flex: 1,
        backgroundColor: 'transparent',
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