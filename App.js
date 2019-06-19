import React from 'react';
import { Text, SafeAreaView, ScrollView, ImageBackground, View } from 'react-native';
import { Icon } from 'native-base';
import { createStackNavigator, createAppContainer, createDrawerNavigator, DrawerItems } from 'react-navigation';

import Home from './screens/Home';
import CodeScanner from './screens/CodeScanner';
import Main from './screens/Main';
import Schedule from './screens/Schedule';
import Pass from './screens/Pass';
import PriceList from './screens/PriceList';
import Attendances from './screens/Attendances';

const CustomDrawerComponent = (props) => (
  <SafeAreaView style={{flex: 1, backgroundColor: '#121212'}}>
    <View style={{height: 150}}>
      <ImageBackground source={require('./assets/images/teamDrawer.jpg')} style={{height: 150, width: 280, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{position: 'absolute', top: 115, left: 10, right: 0, bottom: 0}}>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: 'bold'}}>Next Level BJJ</Text>
        </View>
      </ImageBackground>
    </View>
    <ScrollView>
      <DrawerItems {...props} iconContainerStyle={{opacity: 1}} />
    </ScrollView>
  </SafeAreaView>
);

const mainStackNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerTitle: 'Next Level BJJ',
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#383838',
      },
      headerTitleStyle:{
        color: '#FFFFFF'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: ({ tintColor }) => (
        <Icon style={{paddingLeft: 10, fontSize: 30, color: tintColor}} 
          name="menu" 
          type="MaterialCommunityIcons"
          onPress={() => navigation.openDrawer()} />
      )
    }
}});

const scheduleStackNavigator = createStackNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      headerTitle: 'Grafik',
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#383838',
      },
      headerTitleStyle:{
        color: '#FFFFFF'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: ({ tintColor }) => (
        <Icon style={{paddingLeft: 10, fontSize: 30, color: tintColor}} 
          name="menu" 
          type="MaterialCommunityIcons"
          onPress={() => navigation.openDrawer()} />
      )
    }
}});

const passStackNavigator = createStackNavigator({
  Pass: {
    screen: Pass,
    navigationOptions: {
      headerTitle: 'Karnet',
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#383838',
      },
      headerTitleStyle:{
        color: '#FFFFFF'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: ({ tintColor }) => (
        <Icon style={{paddingLeft: 10, fontSize: 30, color: tintColor}} 
          name="menu" 
          type="MaterialCommunityIcons"
          onPress={() => navigation.openDrawer()} />
      )
    }
}});

const priceListStackNavigator = createStackNavigator({
  PriceList: {
    screen: PriceList,
    navigationOptions: {
      headerTitle: 'Cennik',
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#383838',
      },
      headerTitleStyle:{
        color: '#FFFFFF'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: ({ tintColor }) => (
        <Icon style={{paddingLeft: 10, fontSize: 30, color: tintColor}} 
          name="menu" 
          type="MaterialCommunityIcons"
          onPress={() => navigation.openDrawer()} />
      )
    }
}});

const attendancesStackNavigator = createStackNavigator({
  Attendances: {
    screen: Attendances,
    navigationOptions: {
      headerTitle: 'Treningi',
    }
  }
},{
  defaultNavigationOptions: ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: '#383838',
      },
      headerTitleStyle:{
        color: '#FFFFFF'
      },
      headerTintColor: '#FFFFFF',
      headerLeft: ({ tintColor }) => (
        <Icon style={{paddingLeft: 10, fontSize: 30, color: tintColor}} 
          name="menu" 
          type="MaterialCommunityIcons"
          onPress={() => navigation.openDrawer()} />
      )
    }
}});

const menuDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: mainStackNavigator,
    navigationOptions: {
      title: 'Ekran główny',
      drawerIcon: ({tintColor}) => (
        <Icon name="home" type="MaterialCommunityIcons" style={{fontSize: 24, color: tintColor}}/>
      )
    }     
  },
  Pass: {
    screen: passStackNavigator,
    navigationOptions: {
      title: 'Twój karnet',
      drawerIcon: ({tintColor}) => (
        <Icon name="account-card-details" type="MaterialCommunityIcons" style={{fontSize: 24, color: tintColor}}/>
      )      
    },
    contentOptions: {
      onItemPress: (routes) => console.log(routes)
    }
  },
  Attendances: {
    screen: attendancesStackNavigator,
    navigationOptions: {
      title: 'Historia treningów',
      drawerIcon: ({tintColor}) => (
        <Icon name="calendar-multiselect" type="MaterialCommunityIcons" style={{fontSize: 24, color: tintColor}}/>
      )
    }
  },
  Schedule: {
    screen: scheduleStackNavigator,
    navigationOptions: {
      title: 'Aktualny Grafik',
      drawerIcon: ({tintColor}) => <Icon name="calendar-clock" type="MaterialCommunityIcons" style={{fontSize: 24, color: tintColor}}/>    }
  },
  PriceList: {
    screen: priceListStackNavigator,
    navigationOptions: {
      title: 'Cennik karnetów',
      drawerIcon: ({tintColor}) => <Icon name="currency-usd" type="MaterialCommunityIcons" style={{fontSize: 24, color: tintColor}}/>
    }
  },
},{
  contentComponent: CustomDrawerComponent,
  contentOptions: {
    inactiveTintColor: '#FFFFFF',
    activeTintColor: '#2196f3'
  }
});

const entrenceStackNavigator = createStackNavigator({
    Home: {
      screen: Home
    },
    CodeScanner: {
      screen: CodeScanner
    },
    Menu: {
      screen: menuDrawerNavigator
    }
},{
  defaultNavigationOptions: {
    header: null
  } 
});


export default createAppContainer(entrenceStackNavigator);
