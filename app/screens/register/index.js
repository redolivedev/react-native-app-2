import React, {useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {
  Input,
  TextLink,
  Button,
  Loading,
  AlertComp,
} from '../../components/common';
import http from '../../services/http';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../styles/index.style';

const Registration = props => {
  const [inputData, updateInputData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
  });
  const [loading, updateLoading] = useState(false);

  const registerUser = async () => {
    const response = await http.post('register', inputData);

    if (response.data.success) {
      try {
        await AsyncStorage.setItem('token', response.data.data.access_token);
      } catch (error) {
        console.log('error');
      }
      startSNSVerification(response.data.data.user.id);
    } else {
      AlertComp('Register Error', response.data.data.errors.join(', '));
    }
  };

  const startSNSVerification = async id => {
    const response = await http.post('users/' + id + '/phone_verification', {});
    if (response.data.success) {
      Actions.root();
    } else {
      <AlertComp
        title="Registration Error"
        message={response.data.errors.join(', ')}
      />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={[styles.section, {flex: 1, marginRight: 5}]}>
            <Input
              placeholder="First Name"
              label="First Name"
              value={inputData.first_name}
              onChangeText={first_name =>
                updateInputData({...inputData, first_name: first_name})
              }
            />
          </View>

          <View style={[styles.section, {flex: 1, marginLeft: 5}]}>
            <Input
              placeholder="Last Name"
              label="Last Name"
              value={inputData.last_name}
              onChangeText={last_name =>
                updateInputData({...inputData, last_name: last_name})
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Input
            placeholder="user@email.com"
            label="Email"
            value={inputData.email}
            onChangeText={email =>
              updateInputData({...inputData, email: email})
            }
          />
        </View>

        <View style={styles.section}>
          <Input
            placeholder="Phone Number"
            label="Phone"
            value={inputData.phone}
            onChangeText={phone =>
              updateInputData({...inputData, phone: phone})
            }
          />
        </View>

        <View style={styles.section}>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={inputData.password}
            onChangeText={password =>
              updateInputData({...inputData, password: password})
            }
          />
        </View>

        <View style={styles.section}>
          <Input
            secureTextEntry
            placeholder="confirm password"
            label="Confirm Password"
            value={inputData.password_confirmation}
            onChangeText={password_confirmation =>
              updateInputData({
                ...inputData,
                password_confirmation: password_confirmation,
              })
            }
          />
        </View>

        {!loading ? (
          <Button onPress={() => registerUser()}>Register</Button>
        ) : (
          <Loading size={'large'} />
        )}
      </View>

      <TextLink onPress={() => Actions.login()}>
        Already have an account? Log in!
      </TextLink>
    </View>
  );
};

export default Registration;
