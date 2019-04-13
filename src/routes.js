import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HeaderRight from 'components/HeaderRight';
import Welcome from 'pages/welcome';
import Home from 'pages/home';
import Register from 'pages/register';

import { metrics } from 'styles';

const createNavigator = () => StackNavigator({
  Welcome: { screen: Welcome },
  Register: { screen: Register },
  Home: { screen: Home },
}, {
  initialRouteName: 'Welcome',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      paddingHorizontal: metrics.basePadding,
    },
    headerRight: <HeaderRight navigation={navigation} />,
  }),
});

export default createNavigator;
