import React from 'react';
import { View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Icon, Button, Text } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import moment from 'moment';
import Activity from './sharedScreens/Activity';
import Training from './components/Training';

let student;
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
            student = response.data.student;
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
                        <View style={styles.textBox}>
                            <Text style={styles.greeting}>Twój aktualny karnet!</Text>
                        </View>
                        <View style={styles.passInfoContainer}>
                            <Text style={styles.passInfo}>
                                <Icon name="chess-king" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Nazwa karnetu : {student.recentPass.passType.name}
                            </Text>
                            <Text style={styles.passInfo}>
                                <Icon name="bank" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Cena : {student.recentPass.price}zł</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-check" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Zakupiony : {moment(student.recentPass.createdDate).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-remove" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Wygaśnie : {moment(student.recentPass.expirationDate).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-multiselect" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Pozostało wejść : {student.recentPass.remainingEntries < 31 ? student.recentPass.remainingEntries : "brak limitu" }</Text>
                            <Text style={styles.passInfo}><Icon name="calendar" type="MaterialCommunityIcons" style={styles.icon} /> 
                            Ostatni odbyty trening : </Text>
                        </View>
                        <View style={styles.lastAttendanceContainer}>
                            <Training attendance={student.lastAttendance} />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button block iconLeft style={styles.button}>
                                <Icon name="account-multiple-check" type="MaterialCommunityIcons" />
                                <Text> Zapisz się </Text>
                            </Button>
                            <Button block iconLeft style={styles.button}>
                                <Icon name="qrcode" type="MaterialCommunityIcons" />
                                <Text> Wygeneruj </Text>
                            </Button>
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
    passInfoContainer:{
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    passInfo:{
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 20,
    },
    icon:{
        fontSize: 20,
        color: "white"
    },
    lastAttendanceContainer:{
        flex: 2,
        justifyContent: 'space-around',
    },
    center:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    lastAttendance:{
        backgroundColor: 'transparent',
        color: '#ffffff',
        fontSize: 25,
    },
    buttonsContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    button:{
        alignSelf: 'center',
        color: "white",
        backgroundColor: 'black'
    },
});