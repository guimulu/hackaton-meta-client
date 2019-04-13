import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from 'services/api';
import TextInputMask from 'react-native-text-input-mask';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  state = {
    user: [{ name: '' }],
    loading: false,
    points: '',
    cupom: '',
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('@appHavanClient:user');
    this.setState({ user: JSON.parse(user) });
    console.tron.log(this.state.user[0].name);
  }

  registerPoints = () => {
    const { points, user} = this.state;
    api.post('/point', {
      cpf: user[0].cpf,
      points: points,
    }).then((response) => {
      console.log(response);
      this.goBack();
    }).catch((error) => {
      console.log(error);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>
          Bem-vindo de volta {this.state.user[0].name}
        </Text>

        <Text style={styles.title}>
          Você possui N H-Coins
        </Text>

        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seus H-Coins"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.points}
            onChangeText={points => this.setState({ points })}
            mask={"[0000]"}
          />

          <TouchableOpacity style={styles.button} onPress={this.registerPoints}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Registrar H-Coins</Text>
            }
          </TouchableOpacity>
        </View>

        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Cupom de desconto"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.cupom}
            onChangeText={cupom => this.setState({ cupom: cupom.toUpperCase() })}
            mask={"[AAAA00]"}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Resgatar desconto</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
