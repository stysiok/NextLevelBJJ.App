import React from 'react';
import { Alert, View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Icon, Button, Text } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Modal from 'react-native-modal';
import moment from 'moment';
import Activity from './sharedScreens/Activity';
import Training from './components/Training';
import QRCode from 'react-native-qrcode-svg';

let student;
export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true,
            modalVisible: false,
            student: null
        }
    }
    
    componentWillMount = async() => {
        await this.getStudentPass();
    }

    getStudentPass = async() => {
        let passCode = this.props.navigation.getParam('passCode');

        var response = await graphQLFetch(`{
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
            this.setState({student: student} , () => this.setState({ isLoading: false }))
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania karnetu" : "Podano błędny kod",
                text: response.Message ? response.Message : "Karnet klubowicza nie istnieje w bazie danych"
            });
        }
    }

    signInForTraining = async() => {
        var signInResult = await graphQLFetch(`
            mutation{
                signInForTraining(studentId: 2, kidsClassFilter: ${this.state.student.recentPass.passType.name == 'Dzieci'})
            }
        `);
        
        let title = "", message = "";
        if(signInResult.data != null){
            title = 'Udanego treningu!'
            message = 'Udało Ci się zapisać na trening.'
        } else {
            title = 'Błąd podczas zapisywania się na trening';
            message = signInResult[0].Message; 
        }
        
        Alert.alert(
            title,
            message,
            [
              { text: 'Ok', onPress: () => {} }
            ],
            { cancellable: false }
        );
    }
    
    render(){
        if(this.state.isLoading){
            return(
                <Activity headerText="Wczytuje Twój karnet"></Activity>
            );
        } else {
            return (
                <Container>
                    <Modal 
                        isVisible={this.state.modalVisible}
                        onBackdropPress={() => this.setState({ modalVisible: false })}
                        onBackButtonPress={() => this.setState({ modalVisible: false })}
                        >
                        <View style={modalStyles.modalContainer}>
                            <Text>Kod QR Twojego karnetu</Text>
                            <QRCode 
                                value={this.props.navigation.getParam('passCode')}
                                size={200}
                            />
                            <Button block iconLeft style={styles.button} onPress={() => { this.setState({ modalVisible: false })}}>
                                <Icon name="close-circle" type="MaterialCommunityIcons" />
                                <Text> Zamknij </Text>
                            </Button>
                        </View>
                    </Modal>
                    <StatusBar />
                        <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={styles.overlay} />
                        <View style={styles.textBox}>
                            <Text style={styles.greeting}>Twój aktualny karnet!</Text>
                        </View>
                        <View style={styles.passInfoContainer}>
                            <Text style={styles.passInfo}>
                                <Icon name="chess-king" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Nazwa karnetu : {this.state.student.recentPass.passType.name}
                            </Text>
                            <Text style={styles.passInfo}>
                                <Icon name="bank" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Cena : {this.state.student.recentPass.price}zł</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-check" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Zakupiony : {moment(this.state.student.recentPass.createdDate).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-remove" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Wygaśnie : {moment(this.state.student.recentPass.expirationDate).format('DD/MM/YYYY')}</Text>
                            <Text style={styles.passInfo}>
                                <Icon name="calendar-multiselect" type="MaterialCommunityIcons" style={styles.icon} /> 
                                Pozostało wejść : {this.state.student.recentPass.remainingEntries < 31 ? this.state.student.recentPass.remainingEntries : "brak limitu" }</Text>
                            <Text style={styles.passInfo}><Icon name="calendar" type="MaterialCommunityIcons" style={styles.icon} /> 
                            Ostatni odbyty trening : </Text>
                        </View>
                        <View style={styles.lastAttendanceContainer}>
                            <Training attendance={this.state.student.lastAttendance} />
                        </View>
                        <View style={styles.buttonsContainer}>
                            <Button block iconLeft style={styles.button} onPress={() => { this.signInForTraining() }}>
                                <Icon name="account-multiple-check" type="MaterialCommunityIcons" />
                                <Text> Zapisz się </Text>
                            </Button>
                            <Button block iconLeft style={styles.button} onPress={() => { this.setState({ modalVisible: true })}}>
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

const modalStyles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-around',
        backgroundColor: "#FFF",
        borderRadius: 4,
        borderColor: "#C0C0C0",
        borderWidth: 2,
        marginHorizontal: 40,
        marginVertical: 80
      }
});