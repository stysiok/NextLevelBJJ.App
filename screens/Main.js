import React from 'react';
import { View, StatusBar } from 'react-native';
import { Container, Text, Content, Card } from 'native-base';
import Activity from './sharedScreens/Activity';
import { graphQLFetch } from '../extensions/GraphQL';
import globalStyles from '../extensions/commonStyles';
import moment from 'moment';
import Training from './components/Training';
import CardItemWithIcon from './components/CardItemWithIcon';
import DaySchedule from './components/DaySchedule';

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
                startHour
                name
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
                let activityColor = isPassActive ? '#b2ff59' : '#CF6679';
                console.log(this.state.trainingDay);
                return (
                    <Container style={globalStyles.background}>
                        <Content padder>
                        <StatusBar />
                        <View style={globalStyles.sectionContainer}>
                            <View style={globalStyles.sectionHeader}>
                                <Text style={globalStyles.sectionText}>Stan karnetu</Text>
                            </View>
                            <Content padder>
                                <Card style={globalStyles.card}>                                   
                                    <CardItemWithIcon iconName={isPassActive ? "check-circle" : "close-circle"} iconColor={activityColor} text={passActivityText} />
                                    <CardItemWithIcon iconName="calendar-multiselect" text={passUsageText} />
                                </Card>
                            </Content>
                        </View>
                        <View style={globalStyles.sectionContainer}>
                            <View style={globalStyles.sectionHeader}>
                                <Text style={globalStyles.sectionText}>Ostatni odbyty trening</Text>
                            </View>
                                <Content padder>
                                   <Training attendance={this.state.student.lastAttendance} />
                                </Content>
                        </View>
                        {this.state.trainingDay.classes.length === 0 ? (
                            <View style={globalStyles.sectionContainer}>
                            <View style={globalStyles.sectionHeader}>
                                <Text style={globalStyles.sectionText}>Dzisiejsze treningi ({this.state.trainingDay.day})</Text>
                            </View>
                            <Content padder>
                                <Card style={globalStyles.card}>                                   
                                    <CardItemWithIcon iconName="battery-charging-70" text="Dziś nie ma żadnych treningów. Naładuj baterie na kolejne sparingi!" />
                                </Card>
                            </Content>
                        </View>
                        ) : (
                            <DaySchedule trainingDay={this.state.trainingDay} text='Dzisiejsze treningi'/>
                        ) }
                        </Content>
                    </Container>
                );
        }else{
            return ( <View><Text>Error</Text></View>);
        }
    }
}

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