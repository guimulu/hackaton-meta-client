import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';

import styles from './styles';

const ProfileInfo = ({ data }) => (
  <View style={styles.container}>
    <Text style={styles.name}>
      Texto abc
    </Text>
  </View>
);

export default ProfileInfo;
