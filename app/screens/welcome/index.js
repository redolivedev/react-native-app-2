import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button} from '../../components/common';
import styles, {colors} from '../../styles/index.style';
import Sessions from './Sessions';
import Intro from './Intro';
import SessionSummary from '../../components/SessionSummary';

const Welcome = props => {
  const heading = () => {
    if (props.session.id) {
      return 'Ready to have some fun?';
    }

    return `Welcome ${(props.session.id != null || props.pastSessions.length) &&
      ' back'}, ${props.user.first_name}!`;
  };

  if (!props.session.id && !props.pastSessions.length) {
    return <Intro name={props.user.first_name} />;
  }

  if (!props.session.id) {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, {color: 'white'}]}>
          Welcome back, {props.user.first_name}!
        </Text>
        <Sessions sessions={props.pastSessions} />
        <Button onPress={() => Actions.push('newsession')}>
          Book A New Session
        </Button>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background1,
        flex: 1,
      }}>
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <View style={{flex: 1}}>
          <View style={{height: 80}} />
          <Text style={[styles.title, {marginBottom: 35, color: 'white'}]}>
            {heading()}
          </Text>

          {props.session.id && (
            <SessionSummary session={props.session} user={props.user} />
          )}
          {props.pastSessions && <Sessions sessions={props.pastSessions} />}
          <View style={{height: 100}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapState = state => ({
  user: state.user,
  session: state.session,
  pastSessions: state.pastSessions,
});

export default connect(mapState)(Welcome);
