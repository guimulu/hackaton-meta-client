import './config/ReactoTronConfig';
import React, { Component } from 'react';

import { AsyncStorage, YellowBox } from 'react-native';

import createNavigator from 'routes';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends Component {
  state = {
    userChecked: false,
    userLogged: false,
  }

  async componentDidMount() {
    const username = await AsyncStorage.getItem('@appHavanClient:username');

    this.appLoaded(username);
  }

  appLoaded = (username) => {
    this.setState({
      userChecked: true,
      userLogged: !!username,
    });
  }

  render() {
    if (!this.state.userChecked) return null;
    const Routes = createNavigator(this.state.userLogged);
    return <Routes />;
  }
}
