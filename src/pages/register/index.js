import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import api from 'services/api';
import TextInputMask from 'react-native-text-input-mask';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import styles from './styles';

export default class Register extends Component {
  static navigationOptions = {
    header: 'Cadastro',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    username: '',
    email: '',
    cpf: '',
    phoneNumber: '',
    loading: false,
    errorMessage: null,
  }

  saveUser = async () => {
    const {
      cpf,
      username,
      phoneNumber,
      email,
    } = this.state;
    await api.post('/user', {
      username: 'Tobias' || username,
      email: 'tobias@irriga.global' || email,
      cpf: '213.321.643-45' || cpf,
      phoneNumber: '(55) 9 1233 3124' || phoneNumber,
    }).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    });
  };

  validForm = async () => {
    const { cpf, username, phoneNumber } = this.state;
    if (cpf && username && phoneNumber) {
      this.setState({ loading: true });
      await this.saveUser();
      this.setState({ loading: false });
    } else {
      this.setState({ errorMessage: 'Você precisa preencher todos os campos obrigatórios!' });
    }
  }

  goBack = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'User' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu Nome"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />

          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu CPF"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.cpf}
            onChangeText={cpf => this.setState({ cpf })}
            mask={"[000].[000].[000]-[00]"}
          />

          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu número de telefone"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.phoneNumber}
            onChangeText={phoneNumber => this.setState({ phoneNumber })}
            mask={"([00]) [0] [0000]-[0000]"}
          />

          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.username}
            onChangeText={username => this.setState({ username })}
          />

          <TouchableOpacity style={styles.button} onPress={this.validForm}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Cadastrar</Text>
            }
          </TouchableOpacity>

          { !!this.state.errorMessage
            && <Text style={styles.error}>{ this.state.errorMessage }</Text>
          }
        </View>
      </View>
    );
  }
}
