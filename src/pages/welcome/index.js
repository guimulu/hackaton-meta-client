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

export default class Welcome extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    cpf: '',
    loading: false,
    errorMessage: null,
  }

  checkUserExists = async (cpf) => {
    const user = await api.get(`/user/${cpf}`);

    return user;
  };

  saveUser = async (user) => {
    await AsyncStorage.setItem('@appHavanClient:user', user.request._response);
    console.tron.log(user);
  };

  signIn = async () => {
    const { cpf } = this.state;

    if (cpf.length === 0) return;

    this.setState({ loading: true });

    try {
      const user = await this.checkUserExists(cpf);

      await this.saveUser(user);

      const resetAction = NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home' }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    } catch (err) {
      this.setState({ loading: false, errorMessage: 'Usuário não existe.' });
    }
  };

  registerNewUser = () => {
    this.props.navigation.navigate('Register');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>
          Bem-vindo
        </Text>

        <Text style={styles.text}>
          Para continuar, precisamos que você informe seu CPF.
        </Text>

        { !!this.state.errorMessage
          && <Text style={styles.error}>{ this.state.errorMessage }</Text>
        }

        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu CPF"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.cpf}
            onChangeText={(formatted, extracted) => {
              this.setState({ cpf: extracted });
            }}
            mask={"[000].[000].[000]-[00]"}
          />

          <TouchableOpacity style={styles.button} onPress={this.signIn}>
            { this.state.loading
              ? <ActivityIndicator size="small" color="#FFF" />
              : <Text style={styles.buttonText}>Prosseguir</Text>
            }
          </TouchableOpacity>

          <Text style={styles.text2}>Não é cadastrado?</Text>
          <TouchableOpacity style={styles.button} onPress={this.registerNewUser}>
              <Text style={styles.buttonText}>
                Novo Cadastro
              </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
