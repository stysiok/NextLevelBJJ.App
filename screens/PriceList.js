import React from 'react';
import { View, StyleSheet, StatusBar, Image, FlatList } from 'react-native';
import { Container, Card, CardItem, Left, Right, Body, Text, Icon } from 'native-base';
import { graphQLFetch } from '../extensions/GraphQL';
import Activity from './sharedScreens/Activity';

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
                <Container>
                    <StatusBar />
                        <Image style={styles.backgroundImage} source={require('../assets/images/welcomeBg.jpg')}/>
                        <View style={styles.overlay} />
                        <View style={styles.textBox}>
                            <Text style={styles.greeting}>Dostępne karnety!</Text>
                        </View>
                        <View style={{flex: 5}}>
                            <FlatList 
                                data={passTypes}
                                keyExtractor={item => item.id}
                                renderItem={({item}) => {
                                    return(
                                        <View style={{padding: 10}}>
                                        <Card>
                                            <CardItem>
                                                <Left>
                                                <Icon name={this.getIconForCarnet(item.id)} type="MaterialCommunityIcons" />
                                                    <Body>
                                                        <Text>{item.name}</Text>
                                                        <Text note>Ilość wejść: {item.isOpen ? '∞' : item.entries}</Text>
                                                    </Body>
                                                </Left>
                                                <Right>
                                                    <Text>{item.price} PLN</Text>
                                                </Right>
                                            </CardItem>
                                        </Card>
                                    </View>
                                    );
                                }}
                            />
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