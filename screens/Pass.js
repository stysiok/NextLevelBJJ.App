import React from 'react';
import { Alert, View, StyleSheet, StatusBar, Image, AsyncStorage } from 'react-native';
import { Container, Content, Icon, Button, Text, Card, CardItem, Body } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Modal from 'react-native-modal';
import moment from 'moment';
import globalStyles from './../extensions/commonStyles';
import Activity from './sharedScreens/Activity';
import Training from './components/Training';
import QRCode from 'react-native-qrcode-svg';
import CardItemWithIcon from './components/CardItemWithIcon';

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
        
        let storedStudent = await AsyncStorage.getItem('student');
        let student = JSON.parse(storedStudent);

        let response = await this.getStudentPass(student.passCode);
        
        console.log(response);

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

    getStudentPass = async(passCode) => {
        var response = await graphQLFetch(`{
            student(passCode:"${passCode}"){
                firstName
                lastName
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
        return response;
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
                <Container style={globalStyles.background}>
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
                    <Content padder>
                    <StatusBar />
                    <View style={globalStyles.sectionContainer}>
                        <View style={globalStyles.sectionHeader}>
                            <Text style={globalStyles.sectionText}>Aktualny karnet</Text>
                        </View>
                        <Content padder>
                            <Card style={globalStyles.card}>
                                <CardItemWithIcon iconName='human-greeting' text={`Posiadacz: ${this.state.student.firstName} ${this.state.student.lastName}`} />
                                <CardItemWithIcon iconName='chess-king' text={`Typ karnetu: ${this.state.student.recentPass.passType.name}`} />
                                <CardItemWithIcon iconName='cash-multiple' text={`Cena: ${this.state.student.recentPass.price} PLN`} />
                                <CardItemWithIcon iconName='calendar-check' text={`Zakupiony: ${moment(this.state.student.recentPass.createdDate).format('DD/MM/YYYY')}`} />
                                <CardItemWithIcon iconName='calendar-remove' text={`Wygaśnie: ${moment(this.state.student.recentPass.expirationDate).format('DD/MM/YYYY')}`} />
                                <CardItemWithIcon iconName='calendar-multiselect' text={`Pozostało wejść: ${this.state.student.recentPass.passType.isOpen ?  "brak limitu" : this.state.student.recentPass.remainingEntries }`} />
                            </Card>
                        </Content>
                    </View>
                        <View style={globalStyles.sectionContainer}>
                            <View style={globalStyles.sectionHeader}>
                                <Text style={globalStyles.sectionText}>Zapisz się na trening</Text>
                            </View>
                            <Content padder>
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
                            </Content>
                        </View>
                    </Content>
                </Container>
            );
        }
    }
}

const styles = StyleSheet.create({
    button:{
        alignSelf: 'center',
        color: "white",
        backgroundColor: '#2196f3'
    },
    buttonsContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
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