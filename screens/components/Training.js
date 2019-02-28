import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Left, Thumbnail, Body, Text } from 'native-base';

import moment from 'moment';

let attendance;
let thumbnailImage;
export default class Training extends React.Component { 
    constructor(props){
        super(props);
        attendance = this.props.attendance;
        thumbnailImage = require('../../assets/images/tempGi.png');
    }

    render(){
        return(
            <Content padder>
                <Card>
                    <CardItem>
                        <Left>
                        <Thumbnail source={thumbnailImage} />
                            <Body>
                                <Text>{attendance.classAttended.name}</Text>
                                <Text note>{moment(attendance.createdDate).format ('DD/MM/YYYY HH:mm')} ({attendance.classAttended.day})</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </Content>
        );
    }
}