import React from 'react';
import { View } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body, Text, Right, Button, Icon } from 'native-base';

import moment from 'moment';

let attendance;
let thumbnailImage;
export default class Training extends React.PureComponent { 
    constructor(props){
        super(props);
        attendance = this.props.attendance;
        thumbnailImage = require('../../assets/images/tempGi.png');
    }

    render(){
        return(
            <View style={{padding: 10}}>
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
            </View>                
        );
    }
}