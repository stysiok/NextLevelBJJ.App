import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './screens/Home';
import CodeScanner from './screens/CodeScanner';
import Main from './screens/Main';
import Activity from './screens/sharedScreens/Activity';
import Error from './screens/sharedScreens/Error';
import Schedule from './screens/Schedule';
import Pass from './screens/Pass';
import PriceList from './screens/PriceList';
import Attendances from './screens/Attendances';

const RootStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    },
    CodeScanner: {
      screen: CodeScanner,
      navigationOptions: {
        header: null
      }
    },
    Main: {
      screen: Main      
    },
    Activity: {
      screen: Activity,
      header: null
    },
    Schedule: {
      screen: Schedule
    },
    Pass: {
      screen: Pass
    },
    PriceList: {
      screen: PriceList
    },
    Attendances: {
      screen: Attendances
    },
    Error: {
      screen: Error,
      header: null
    }
  },
  {
    initialRouteName: 'Home',
    defaultNavigationOptions: {
      title: "Next Level BJJ",
      headerStyle: {
        backgroundColor: '#000',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    }
  }
);

export default createAppContainer(RootStack);
