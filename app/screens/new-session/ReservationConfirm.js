import React from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button} from '../../components/common';
import styles, {colors} from '../../styles/index.style';
import NewSessionHeader from './NewSessionHeader';
import http from '../../services/http';
import {formatTime} from '../../services/formatTime';
import {getGame} from '../../services/gameData';
import Moment from 'moment';

const ReservationConfirm = props => {
  const dateStr = Moment(props.newSession.date).format('YYYY-MM-DD');
  const startTime = dateStr + ' ' + props.newSession.time;
  const reservationParams = {
    ...props.newSession,
    in_facility: 0,
    status: 'reserved',
    leader_player_id: props.user.id,
    facility_id: 1,
    startTime: startTime,
  };

  if (!reservationParams.capacity) {
    reservationParams.capacity = 8;
  }

  const bookSession = async () => {
    console.log(reservationParams);
    const response = await http.post('reservation', reservationParams);
    console.log(response);
    if (response.data.success) {
      props.addSession(response.data.data);
      Actions.push('booked');
    }
  };

  const preferred = props.newSession.preferred_game_id
    ? getGame(props.newSession.preferred_game_id)
    : null;
  const disfavored = props.newSession.disfavored_game_id
    ? getGame(props.newSession.disfavored_game_id)
    : null;

  return (
    <SafeAreaView style={{backgroundColor: colors.background1}}>
      <NewSessionHeader progress={100} title="Your Reservation" />
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <View style={styles.form}>
          <Text style={[styles.labelStyle, {color: 'white'}]}>Team Name</Text>
          <Text style={[styles.title, {marginBottom: 30, color: 'white'}]}>
            {props.newSession.team_name}
          </Text>
          <View style={[styles.twoColumn, {marginBottom: 20}]}>
            <View style={{flex: 1}}>
              <Text style={[styles.labelStyle, {color: 'white'}]}>
                Start Time
              </Text>
              <Text style={[styles.largeCopy, {color: 'white'}]}>
                {formatTime(props.newSession.time)}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.labelStyle, {color: 'white'}]}>Players</Text>
              <Text style={[styles.largeCopy, {color: 'white'}]}>
                {props.newSession.capacity
                  ? props.newSession.capacity
                  : 'Public'}
              </Text>
            </View>
          </View>
          <View style={{width: 100}}>
            <Button outline={true} onPress={() => Actions.push('newsession')}>
              Edit
            </Button>
          </View>
          <View
            style={{
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              marginVertical: 40,
            }}
          />

          <Text style={[styles.labelStyle, {color: 'white'}]}>
            Game Package
          </Text>
          <Text style={[styles.largeCopy, {marginBottom: 30, color: 'white'}]}>
            {props.newSession.package_id + 2}
          </Text>
          {props.newSession.preferred_game_id &&
            props.newSession.disfavored_game_id && (
              <>
                <Text style={[styles.labelStyle, {color: 'white'}]}>
                  Want to play
                </Text>
                <View style={[styles.box, {marginBottom: 20}]}>
                  <View style={styles.circle}></View>
                  <Text style={{fontSize: 16, color: '#333', marginLeft: 10}}>
                    {preferred.label}
                  </Text>
                </View>
                <Text style={[styles.labelStyle, {color: 'white'}]}>
                  Definitely do not want to play
                </Text>
                <View style={[styles.box, {marginBottom: 20}]}>
                  <View style={styles.circle}></View>
                  <Text style={{fontSize: 16, color: '#333', marginLeft: 10}}>
                    {disfavored.label}
                  </Text>
                </View>
              </>
            )}
          <View style={{width: 100}}>
            <Button
              outline={true}
              onPress={() => Actions.push('gamepreferences')}>
              Edit
            </Button>
          </View>
          <View style={{height: 60}} />
          <Button onPress={() => bookSession()}>Book It!</Button>
        </View>
        <View style={{height: 240}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapState = state => ({
  newSession: state.newSession,
  user: state.user,
});

const mapDispatch = dispatch => ({
  addSession: data => dispatch.session.add(data),
});

export default connect(mapState, mapDispatch)(ReservationConfirm);
