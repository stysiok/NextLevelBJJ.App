import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import { Container, Card, CardItem, Left, Right, Body, Text, Icon, Content } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';
import globalStyles from './../extensions/commonStyles';
import CardItemWithIcon from './components/CardItemWithIcon';

let passTypes;
const icons = [{
    id: 1,
    icon: 'chess-pawn'
}, {
    id: 2,
    icon: 'chess-bishop'
}, {
    id: 6,
    icon: 'chess-knight'
}, {
    id: 4,
    icon: 'chess-king'
}, ];

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: true
        }
    }
    
    componentWillMount = async() => {
        await this.getPriceList();
        
        this.setState({ isLoading: false });
    }

    getPriceList = async() => {
        var response = await graphQLFetch(`{
            passTypes{
              id
              name
              price
              entries
              isOpen
            }
          }`);
        console.log(response);
        if(response.data.passTypes != null){
            passTypes = response.data.passTypes;
        } else {
            this.props.navigation.navigate('Error', {
                headerText: response.Message ? "Błąd podczas pobierania dnia treningowe" : "Podano błędny kod",
                text: response.Message ? response.Message : "Nie udało się pobrać dzisiejszego treningu"
            });
        }
    }

    getIconForCarnet = (id) => {
        let obj = icons.find(c => c.id == id);
        return obj === undefined ? 'chess-rook' : obj.icon;
    }
    
    render(){
        if(this.state.isLoading){
            return(
                <Activity headerText="Wczytuje dostępne karnety" />
            );
        } else {
            return (
                <Container style={globalStyles.background}>
                <Content padder>
                <StatusBar />
                <View style={globalStyles.sectionContainer}>
                    <View style={globalStyles.sectionHeader}>
                        <Text style={globalStyles.sectionText}>Dostępne karnety</Text>
                    </View>
                    <Content padder>
                        <FlatList 
                            data={passTypes}
                            keyExtractor={item => item.id}
                            renderItem={({item}) => {
                                return(
                                   <Card style={globalStyles.card}>
                                   <CardItem style={globalStyles.cardItem}>
                                       <Left>
                                           <Icon name={this.getIconForCarnet(item.id)} type="MaterialCommunityIcons" style={{color: '#FFF'}}/>
                                           <Body>
                                               <Text style={globalStyles.cardText}>{item.name}</Text>
                                               <Text style={globalStyles.cardText} note>Ilość wejść: {item.isOpen ? '∞' : item.entries}</Text>
                                           </Body>
                                       </Left>
                                       <Right>
                                           <Text style={globalStyles.cardText}>{item.price} PLN</Text>
                                       </Right>       
                                   </CardItem>
                               </Card>
                            )}} />
                    </Content>
                </View>
                <View style={globalStyles.sectionContainer}>
                    <View style={globalStyles.sectionHeader}>
                        <Text style={globalStyles.sectionText}>Pamiętaj!</Text>
                    </View>
                    <Content padder>
                        <Card style={globalStyles.card}>
                            <CardItemWithIcon iconName='asterisk' iconColor='#2196f3' text='Każdy karnet jest ważny przez 30 dni od daty zakupu.'/>
                        </Card>
                    </Content> 
                </View>
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