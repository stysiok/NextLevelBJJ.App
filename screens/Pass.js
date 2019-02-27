import React from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';

let pass;
export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }
    
    componentWillMount = async() => {
        await this.getStudentPass();

        this.setState({ isLoading: false });
    }

    getStudentPass = async() => {
        let passCode = this.props.navigation.getParam('passCode');
        console.log(passCode);

        var response = await await graphQLFetch(`{
            student(passCode:"${passCode}"){
                lastAttendance{
                    createdDate
                    classAttended{
                      day
                      name
                    }
                  }
                  recentPass{
                    createdDate
                    expirationDate
                    price
                    remainingEntries
                    passType{
                      name
                      entries
                      isOpen
                    }
                  }
            }
          }`);

        if(response.data.student != null){
            pass = response.data;
            console.log(pass);
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania karnetu" : "Podano błędny kod",
                text: response.Message ? response.Message : "Karnet klubowicza nie istnieje w bazie danych"
            });
        }
    }
    
    render(){
        if(this.state.isLoading){
            return(
                <Activity headerText="Wczytuje Twój karnet"></Activity>
            );
        } else {
            return (
                <Container>
                    <StatusBar />
                        <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={styles.overlay} />
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
});