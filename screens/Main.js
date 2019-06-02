import React from 'react';
import { Alert, AsyncStorage,View, StyleSheet, StatusBar, Image } from 'react-native';
import { Container, Button, Text, Icon, Content, Card, CardItem, Left, Body } from 'native-base';
import Activity from './sharedScreens/Activity';
import { HeaderBackButton } from 'react-navigation';
import { graphQLFetch } from '../extensions/GraphQL';
import moment from 'moment';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true,
            student: null,
            trainingDay: null
        };
    }

    componentWillMount = async() => {
        const { navigation } = this.props;
        const passedStudent = navigation.getParam('student');

        let studentResponse = await this.fetchStudent(passedStudent.passCode);
        let trainingDayResponse = await this.fetchTrainingDay();

        this.setState({
            trainingDay: trainingDayResponse.data.training,
            student: studentResponse.data.student,
            isLoading: false
        });
    }

    fetchStudent = async(passCode) => {
        let response = await graphQLFetch(`
        {
            student(passCode: "${passCode}"){
            firstName
              recentPass{
                expirationDate
                remainingEntries
                passType{
                  entries
                  isOpen
                }
              }
              lastAttendance{
                classAttended{
                  day
                  name
                  startHour
                }
                createdDate
              }
            }
          }
        `);

        return response;
    }

    fetchTrainingDay = async() => {
        let response = await graphQLFetch(`{
            training{
              classes{
                day
                finishHour
              }
              day
            }
          }`);
        
        return response;
    }

    render(){        
        if(this.state.isLoading){
            if(this.state.student === null) {
                return ( <Activity headerText="Wczytuję Twoje dane!"/> );
            } else if (this.state.trainingDay === null){
                return ( <Activity headerText="Wczytuję dzisiejsze treningi!"/> );
            }
            else{
                return ( <View><Text>Error</Text></View>);
            }
        }else if(!this.state.isLoading && 
            this.state.student !== null && 
            this.state.trainingDay !== null){
                let isPassActive = moment(this.state.student.recentPass.expirationDate).isAfter(moment.now);
                let passActivityText = `${ isPassActive ? 'Aktywny': 'Nieaktywny' } (${ isPassActive ? 'do' : 'od'} ${moment(this.state.student.recentPass.expirationDate).format('DD/MM/YYYY')})`;
                let passUsageText = `${ isPassActive ? `Pozostało` : `Wykorzystałeś`} ${isPassActive ? `${this.state.student.recentPass.passType.isOpen ? `∞` : `${this.state.student.recentPass.remainingEntries}`}` : `${this.state.student.recentPass.passType.entries - this.state.student.recentPass.remainingEntries}` } z ${this.state.student.recentPass.passType.isOpen ? `∞` : `${this.state.student.recentPass.passType.entries}`} wejść`;
                return (
                    <Container style={{backgroundColor: '#121212'}}>
                        <Content padder>
                        <StatusBar />
                        <Text style={styles.greeting}>Oss {this.state.student.firstName}!</Text>
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>Aktualny karnet</Text>
                            </View>
                            <Content padder>
                                <Card >
                                    <CardItem>
                                            <Body>
                                                <Text><Icon name={isPassActive ? "check-circle" : "close-circle"} type="MaterialCommunityIcons" /> {passActivityText}</Text>
                                                <Text><Icon name="calendar-multiselect" type="MaterialCommunityIcons" /> {passUsageText}</Text>
                                            </Body>
                                    </CardItem>
                                </Card>
                            </Content>
                        </View>
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>Ostatni odbyty trening</Text>
                            </View>
                                <Content padder>
                                   <Card >
                                        <CardItem>
                                                <Body>
                                                    <Text>BJJ nowy nabór</Text>
                                                    <Text>Poniedziałek o 17:15</Text>
                                                </Body>
                                        </CardItem>
                                    </Card>
                                </Content>
                        </View>
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionText}>Dzisiejsze zajęcia</Text>
                            </View>
                                <Content padder>
                                   <Card >
                                        <CardItem>
                                                <Body>
                                                    <Text>BJJ nowy nabór</Text>
                                                    <Text>Poniedziałek o 17:15</Text>
                                                </Body>
                                        </CardItem>
                                        <CardItem>
                                                <Body>
                                                    <Text>BJJ nowy nabór</Text>
                                                    <Text>Poniedziałek o 17:15</Text>
                                                </Body>
                                        </CardItem>
                                        <CardItem>
                                                <Body>
                                                    <Text>BJJ nowy nabór</Text>
                                                    <Text>Poniedziałek o 17:15</Text>
                                                </Body>
                                        </CardItem>
                                    </Card>
                                </Content>
                        </View>
                        </Content>
                    </Container>
                );
        }else{
            return ( <View><Text>Error</Text></View>);
        }
    }
}

const styles = StyleSheet.create({
    greeting:{
        color: '#ffffff',
        fontSize: 40,
        fontWeight: 'bold'
    },
    sectionContainer: {
      flex: 1
    },
    sectionHeader:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    sectionText:{
        color: '#ffffff',
        fontSize: 20
    }
});

// static navigationOptions = ({navigation}) => {
//     return{
//       headerLeft:(<HeaderBackButton onPress={() => {

//             Alert.alert(
//             'Wyloguj się',
//             'Czy na pewno chcesz się wylogować z aplikacji? Będziesz ponownie musiał/a zeskanować swój kod QR.',
//             [
//             {
//                 text: 'Tak',
//                 onPress: async() => {
//                     await AsyncStorage.removeItem('student', () => navigation.navigate('Home'))
//                 },
//             },
//             { text: 'Nie', onPress: () => {} },
//             ],
//             { cancellable: false }
//             );
//       }} tintColor={'white'}/>)
//    }
//   }

// logOut = async() => {
//     Alert.alert(
//         'Wyloguj się',
//         'Czy na pewno chcesz się wylogować z aplikacji? Będziesz ponownie musiał/a zeskanować swój kod QR.',
//         [
//           {
//             text: 'Tak',
//             onPress: async() => {
//                 await AsyncStorage.removeItem('student', () => this.props.navigation.navigate('Home'))
//             },
//           },
//           { text: 'Nie', onPress: () => {} },
//         ],
//         { cancellable: false }
//       );
// }