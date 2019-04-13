import React, { Component } from 'react';
import api from 'services/api';

import {
  ScrollView,
  Text,
  AsyncStorage,
  View,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import ProfileInfo from './components/ProfileInfo';

import styles from './styles';

export default class Profile extends Component {
  static navigationOptions = {
    title: 'Perfil',
    tabBarIcon: ({ tintColor }) => <Icon name="user" size={20} color={tintColor} />,
  };

  state = {
    data: { },
    loading: true,
    refreshing: false,
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = async () => {
    this.setState({ refreshing: true });
    const username = await AsyncStorage.getItem('@appGithub:username');
    const response = await api.get(`/users/${username}`);

    this.setState({
      data: response.data,
      loading: false,
      refreshing: false,
    });
  }

  // renderProfile = ({ data }) => <ProfileInfo profile={data} />;
  renderProfile = () => <ProfileInfo profile={this.state.data} />;

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
            />
          }
        >
          { !!this.state.loading
            ? <ActivityIndicator style={styles.loading} />
            : this.renderProfile()
          }
        </ScrollView>
      </View>
    );
  }

}
