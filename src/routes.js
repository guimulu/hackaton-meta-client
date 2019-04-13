import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import HeaderRight from 'components/HeaderRight';
import Welcome from 'pages/welcome';
import Profile from 'pages/profile';
import Register from 'pages/register';

import { metrics, colors } from 'styles';

const createNavigator = (isLogged = false) => StackNavigator({
  Welcome: { screen: Welcome },
  Register: { screen: Register },
  User: {
    screen: TabNavigator({
      Profile: { screen: Profile },
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        activeTintColor: colors.white,
        inactiveTintColor: colors.whiteTransparent,
        style: {
          backgroundColor: colors.secundary,
        },
        indicatorStyle: {
          backgroundColor: colors.regular,
        },
      },
    }),
  },
}, {
  initialRouteName: isLogged ? 'User' : 'Welcome',
  navigationOptions: ({ navigation }) => ({
    headerStyle: {
      paddingHorizontal: metrics.basePadding,
    },
    headerRight: <HeaderRight navigation={navigation} />,
  }),
});

export default createNavigator;
