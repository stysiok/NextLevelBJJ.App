import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import { Container, Text } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';
import Training from './components/Training';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true,
            id: 0,
            skip: 0,
            take: 8,
            attendances: []
        }
    }
    
    componentWillMount = async() => {
        await this.promisedSetState({id: this.props.navigation.getParam('id')});

        let response = await this.getAttendances();

        if(response.data.attendances != null) {
            var joined = response.data.attendances;
            this.setState({ attendances: joined })
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania treningów" : "Nie odbyłeś żadnego treningu",
                text: response.Message ? response.Message : "Treningi klubowicza nie istnieją w bazie danych"
            });
        }
        this.setState({ isLoading: false });
    }

    getAttendances = async() => {
        return await graphQLFetch(`{ 
            attendances(studentId: ${this.state.id}, take: ${this.state.take}, skip: ${this.state.skip}){
                createdDate
                classAttended{
                    day
                    name
                    startHour
                    finishHour
                }
            }
        }`);
    }

    loadAttendances = () => {
        this.setState({ skip: this.state.skip + this.state.take}, 
            () => {
                this.promisedSetState({ skip: this.state.skip + this.state.take }).then(() => {
                    this.getAttendances().then((response) => {
                        if(response.data.attendances != null) {
                            var joined = [...this.state.attendances, ...response.data.attendances];
                            this.setState({ attendances: joined })
                        }
                    })
                });               
            });
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
                        <View style={{flex: 5}}>
                            <FlatList
                                data={this.state.attendances}
                                keyExtractor={item => item.createdDate}
                                renderItem={({item}) => <Training attendance={item} /> }
                                onEndReachedThreshold={0.5}
                                onEndReached={() => this.loadAttendances()}
                                />
                        </View>
                </Container>
            );
        }
    }

    promisedSetState = (newState) => {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve()
            });
        });
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