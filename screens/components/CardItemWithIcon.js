import React from 'react';
import { CardItem, Left, Body, Text, Icon } from 'native-base';
import globalStyles from './../../extensions/commonStyles';

export default class CardItemWithIcon extends React.PureComponent { 
    constructor(props){
        super(props);
        iconName = this.props.iconName;
        text = this.props.text;
        iconColor = this.props.iconColor;        
    }
    render(){
        return(
            <CardItem style={globalStyles.cardItem}>
                <Left>
                    <Icon name={iconName} type="MaterialCommunityIcons" style={{color: `${iconColor ? iconColor : '#FFF'}`}}/>
                    <Body>
                        <Text style={globalStyles.cardText}>{text}</Text>
                    </Body>
                </Left>
            </CardItem>
        );
    }
}