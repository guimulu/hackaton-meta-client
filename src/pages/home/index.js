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
  Alert,
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
    coin: '',
  }

  async componentDidMount() {
    const user = await AsyncStorage.getItem('@appHavanClient:user');
    this.setState({ user: JSON.parse(user) });
    await this.getPoints();
  }

  getPoints = async () => {
    const points = await api.get(`/point/${this.state.user[0].cpf}`);
    console.tron.log(points);
    this.setState({ coin: points.data[0].current_points });
  };

  registerPoints = () => {
    const { points, user} = this.state;
    api.post('/point', {
      cpf: user[0].cpf,
      points: points,
    }).then((response) => {
      console.log(response);
      this.getPoints();
      Alert.alert(
        'Parabéns!',
        `Você acaba de ganhar ${this.state.points} H-Coins!`,
        [
          { text: 'OK', onPress: () => { this.setState({ points: '' }); } },
        ],
      );
    }).catch((error) => {
      console.log(error);
    });
  };

  validateCoupon = async () => {
    api.get(`/coupon/${this.state.cupom}`).then((response) => {
      Alert.alert(
        'Parabéns!',
        `Você resgatou com sucesso o cupom ${this.state.cupom}`,
        [
          { text: 'OK', onPress: () => { this.setState({ cupom: '' }); this.getPoints(); } },
        ],
      );
    }).catch((error) => {
      Alert.alert(
        'Ops!',
        'Infelizmente não foi possível realizar o resgate de H-Coins. ',
        [
          { text: 'OK', onPress: () => {} },
        ],
      );
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />

        <Text style={styles.title}>
          Bem-vindo de volta {this.state.user[0].name}
        </Text>

        { this.state.coin !== ''
          ? (
            <Text style={styles.titleMax}>
              Você possui {this.state.coin} H-Coins
            </Text>
          )
          : (
            <Text style={styles.titleMax}>
              Você ainda não possui H-Coins :(
            </Text>
          )
        }

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
          />

          <TouchableOpacity style={styles.button} onPress={this.validateCoupon}>
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
