import React from 'react';
import { ActivityIndicator, View, StyleSheet, StatusBar } from 'react-native';
import { Container, Button, Text, Content, Icon } from 'native-base';

export default class Main extends React.Component { 
    constructor(){
        super();
        this.state = {
            isLoading: false
        };
    }

    render(){
        return (
            <Container style={styles.cont}>
            <StatusBar />
                <Content>
                    <Button large>
                        <Icon name='md-briefcase' />
                        <Text>
                            Mój karnet
                        </Text>
                    </Button>
                    <Button large>
                        <Icon name='md-pricetag' />
                        <Text>
                            Cennik
                        </Text>
                    </Button>
                    <Button large>
                        <Icon name='calendar' />
                        <Text>
                        Grafik
                        </Text>
                    </Button>
                </Content>
        </Container>
        );
    }
}


const styles = StyleSheet.create({
    cont: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        
    },
    btn: {
        flex: 1,
        justifyContent: 'center'
    }
});