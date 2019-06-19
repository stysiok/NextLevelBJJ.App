import React from 'react';
import { Card, CardItem, Left, Thumbnail, Body, Text, Right, Button, Icon } from 'native-base';
import globalStyles from './../../extensions/commonStyles';
import { getTrainingImage } from './../../extensions/commonMethods';

import moment from 'moment';

export default class Training extends React.PureComponent { 
    constructor(props){
        super(props);
        attendance = this.props.attendance;
    }

    render(){
        return(
                <Card style={globalStyles.card}>
                    <CardItem style={globalStyles.cardItem}>
                        <Left>
                        <Thumbnail large source={getTrainingImage(attendance.classAttended.name)} />
                            <Body>
                                <Text style={globalStyles.cardText}>{attendance.classAttended.name}</Text>
                                <Text style={{color: '#FFF', opacity: 0.8}}>{moment(attendance.createdDate).format ('DD/MM/YYYY HH:mm')} ({attendance.classAttended.day})</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
        );
    }
}