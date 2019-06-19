import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList, Text } from 'react-native';
import { Container, Accordion, Content } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';
import globalStyles from './../extensions/commonStyles';
import DaySchedule from './components/DaySchedule';

let today, week;
export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }
    
    componentWillMount = async() => {
        await this.getTrainingWeek();
        
        week.trainings = week.trainings.filter(el => el.classes.length > 0);
        
        this.setState({ isLoading: false });
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
            <Container style={globalStyles.background}>
                <Content padder>
                <StatusBar />
                <FlatList 
                    data={week.trainings}
                    keyExtractor={item => item.day}
                    renderItem={({item}) => 
                        <DaySchedule trainingDay={item} />
                    }
                 />
                </Content>
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