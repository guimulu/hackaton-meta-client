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
  static propTypes = {
    navigation: PropTypes.shape({
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    name: '',
    email: '',
    cpf: '',
    phone_number: '',
    loading: false,
    errorMessage: null,
  }

  saveUser = async () => {
    const {
      cpf,
      name,
      phone_number,
      email,
    } = this.state;

    api.post('/user', {
      name: name,
      email: email,
      cpf: cpf,
      phone_number: phone_number,
    }).then((response) => {
      console.log(response);
      this.goBack();
    }).catch((error) => {
      console.log(error);
    });
  };

  validForm = async () => {
    const { cpf, name, phone_number } = this.state;
    if (cpf && name && phone_number) {
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
        NavigationActions.navigate({ routeName: 'Welcome' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>
          Realize seu Cadastro
        </Text>

        <View style={styles.form}>
          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu Nome"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.name}
            onChangeText={name => this.setState({ name })}
          />

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

          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu número de telefone"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.phone_number}
            onChangeText={phone_number => this.setState({ phone_number })}
            mask={"([00]) [0] [0000]-[0000]"}
          />

          <TextInputMask
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder="Digite seu e-mail"
            underlineColorAndroid="rgba(0, 0, 0, 0)"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
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
