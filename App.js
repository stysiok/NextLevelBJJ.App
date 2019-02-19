import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './screens/Home';
import CodeScanner from './screens/CodeScanner';
import Main from './screens/Main';

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
