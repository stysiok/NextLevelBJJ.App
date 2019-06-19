import React from 'react';
import { View, FlatList } from 'react-native';
import { Card, CardItem, Left, Thumbnail, Body, Text, Right, Button, Icon, Content } from 'native-base';
import globalStyles from './../../extensions/commonStyles';
import { getTrainingImage } from './../../extensions/commonMethods';

export default class DaySchedule extends React.PureComponent { 
    constructor(props){
        super(props);
        trainingDay = this.props.trainingDay;
        text = this.props.text;
    }

    render(){
        return(
            <View style={globalStyles.sectionContainer}>
                <View style={globalStyles.sectionHeader}>
                    <Text style={globalStyles.sectionText}>{text ? `${text} (${trainingDay.day})` : trainingDay.day}</Text>
                </View>
                <Content padder>
                    <Card style={globalStyles.card}>
                    <FlatList
                        data={trainingDay.classes}
                        keyExtractor={obj => obj.name}
                        renderItem={({item: training}) => 
                            <CardItem style={globalStyles.cardItem}>
                                <Left>                                    
                                    <Thumbnail source={getTrainingImage(training.name)} />
                                    <Body>
                                        <Text style={globalStyles.cardText}>{training.name}</Text>
                                        <Text note style={globalStyles.cardText}>Od {training.startHour} do {training.finishHour}</Text>
                                    </Body>
                                </Left>
                            </CardItem>
                        }
                    />                       
                    </Card>
                </Content>
            </View>
        );
    }
}