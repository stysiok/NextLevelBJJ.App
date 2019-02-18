import React from 'react';

import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './screens/Home';
import CodeScanner from './screens/CodeScanner';

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
    }
  },
  {
    initialRouteName: 'Home'
  }
);

export default createAppContainer(RootStack);
