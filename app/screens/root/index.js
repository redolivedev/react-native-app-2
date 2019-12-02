import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
// import {Input, TextLink, Button, Loading} from '../../components/common';
import AsyncStorage from '@react-native-community/async-storage';
import http from '../../services/http';
import styles from '../../styles/index.style';
import {Loading} from '../../components/common';

const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return http.post('auth', {}).then(response => {
        if (response.data.success) {
          return response.data.data.user;
        } else {
          return false;
        }
      });
    } else {
      return Promise.resolve(false);
    }
  } catch (error) {
    console.log(error);
  }
};

const getPastSessionsData = async id => {
  return await http.get('session/' + id + '/index');
};

const getSessionData = async id => {
  return await http.get('session/' + id + '/show');
};

const Root = props => {
  useEffect(() => {
    getUser()
      .then(async user => {
        if (user) {
          return await props.addUser(user);
        } else {
          return Actions.login();
        }
      })
      .then(user => {
        if (user.payload.phone_verified_at === null) {
          return Actions.pin();
        } else {
          return user;
        }
      })
      .then(async user => {
        const pastSessions = await getPastSessionsData(user.payload.id);
        if (pastSessions.data.success) {
          props.addPastSessions(pastSessions.data.data);
        }
        // const currSession = await getSessionData(user.payload.id);
        // if (currSession.data.success) {
        //   props.addSession(currSession.data.data);
        // }
      })
      .then(() => {
        Actions.home();
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <Loading size="large" />
    </View>
  );
};

const mapDispatch = dispatch => ({
  addUser: data => dispatch.user.add(data),
  addPastSessions: data => dispatch.pastSessions.add(data),
  addSession: data => dispatch.session.add(data),
});

export default connect(null, mapDispatch)(Root);
