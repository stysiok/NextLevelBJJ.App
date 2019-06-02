import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';

import Home from './screens/Home';
import CodeScanner from './screens/CodeScanner';
import Main from './screens/Main';
import Activity from './screens/sharedScreens/Activity';
import Error from './screens/sharedScreens/Error';
import Schedule from './screens/Schedule';
import Pass from './screens/Pass';
import PriceList from './screens/PriceList';
import Attendances from './screens/Attendances';

const mainStackNavigator = createStackNavigator({
  Main: {
    screen: Main,
    navigationOptions: {
      headerTitle: 'Next Level BJJ',
    }
  }
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F',
    },
    headerTitleStyle:{
      color: '#FFFFFF'
    }
  }
});

const scheduleStackNavigator = createStackNavigator({
  Schedule: {
    screen: Schedule,
    navigationOptions: {
      headerTitle: 'Grafik',
    }
  }
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F',
    },
    headerTitleStyle:{
      color: '#FFFFFF'
    }
  }
});

const passStackNavigator = createStackNavigator({
  Pass: {
    screen: Pass,
    navigationOptions: {
      headerTitle: 'Karnet',
    }
  }
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F',
    },
    headerTitleStyle:{
      color: '#FFFFFF'
    }
  }
});

const priceListStackNavigator = createStackNavigator({
  PriceList: {
    screen: PriceList,
    navigationOptions: {
      headerTitle: 'Cennik',
    }
  }
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F',
    },
    headerTitleStyle:{
      color: '#FFFFFF'
    }
  }
});

const attendancesStackNavigator = createStackNavigator({
  Attendances: {
    screen: Attendances,
    navigationOptions: {
      headerTitle: 'Treningi',
    }
  }
},{
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#1F1F1F',
    },
    headerTitleStyle:{
      color: '#FFFFFF'
    }
  }
});

const menuDrawerNavigator = createDrawerNavigator({
  Main: {
    screen: mainStackNavigator,
    navigationOptions: {
      title: 'Główny',
    }     
  },
  Pass: {
    screen: passStackNavigator,
    navigationOptions: {
      title: 'Twój karnet',
    }
  },
  Attendances: {
    screen: attendancesStackNavigator,
    navigationOptions: {
      title: 'Historia treningów',
    }
  },
  Schedule: {
    screen: scheduleStackNavigator,
    navigationOptions: {
      title: 'Grafik',
    }
  },
  PriceList: {
    screen: priceListStackNavigator,
    navigationOptions: {
      title: 'Cennik',
    }
  },
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
