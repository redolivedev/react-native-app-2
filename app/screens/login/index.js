import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import {
  Input,
  TextLink,
  Loading,
  Button,
  AlertComp,
} from '../../components/common';
import http from '../../services/http';
import styles, {colors} from '../../styles/index.style';
import Logo from '../../components/common/Logo';

const Login = props => {
  const [email, updateEmail] = useState('');
  const [password, updatePassword] = useState('');
  const [loading, updateLoading] = useState(false);

  const loginUser = async () => {
    const response = await http.post('login', {
      email: email,
      password: password,
    });

    if (response.data.success) {
      try {
        await AsyncStorage.setItem('token', response.data.data.access_token);
      } catch (error) {
        console.log(error);
      }
      Actions.root();
    } else {
      AlertComp('Login Error', response.data.data.errors.join(', '));
    }
  };

  return (
    <ImageBackground
      style={backgroundStyles.background}
      imageStyle={{resizeMode: 'contain', top: -160}}
      source={{url: 'http://mojo-dojo-api.test/images/onboarding-bg.png'}}>
      <Logo />
      <View style={styles.form}>
        <View style={styles.section}>
          <Input
            label="Email Address"
            value={email}
            reverse
            onChangeText={email => updateEmail(email)}
          />
        </View>
        <View style={styles.section}>
          <Input
            secureTextEntry
            label="Password"
            value={password}
            reverse
            onChangeText={password => updatePassword(password)}
          />
          <View style={{alignItems: 'flex-end', marginBottom: 18}}>
            <TextLink onPress={() => Actions.forgot()}>
              Forgot Password
            </TextLink>
          </View>
        </View>

        {!loading ? (
          <Button onPress={() => loginUser()} arrow reverse>
            Login
          </Button>
        ) : (
          <Loading size={'large'} />
        )}
        <View
          style={{
            marginTop: 50,
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}>
          <Text style={{color: 'white', marginRight: 10}}>
            Don't have an account?{' '}
          </Text>
          <TextLink onPress={() => Actions.register()}>SIGN UP</TextLink>
        </View>
      </View>
    </ImageBackground>
  );
};

const backgroundStyles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.background1,
    padding: 50,
    backgroundColor: colors.red,
  },
});

export default Login;
