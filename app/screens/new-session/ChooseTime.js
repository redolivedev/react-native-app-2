import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Loading} from '../../components/common';
import styles, {colors} from '../../styles/index.style';
import TypeSelect from '../../components/TypeSelect';
import NewSessionHeader from './NewSessionHeader';
import http from '../../services/http';
import {getProgress} from '../../services/ComputedValues';
import {formatTime, formatDate} from '../../services/formatTime';

const getAvailableTimes = async query => {
  return await http.get('facilities/1/get_available_times?' + query);
};

const formatTimes = times => {
  return times.map(time => ({
    value: time,
    label: formatTime(time),
  }));
};

const ChooseTime = props => {
  const progress = getProgress(
    Object.keys(props.newSession),
    props.newSession.type === 'private',
  );
  const [loading, updateLoading] = useState(true);
  const [times, updateTimes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const queryObj = {
        capacity: props.newSession.capacity ? props.newSession.capacity : 8,
        time_frame: props.newSession.time_frame,
        preferred_game_id: props.newSession.preferred_game_id,
        package_id: props.newSession.package_id,
        date: formatDate(props.newSession.date),
      };

      const queryString = Object.keys(queryObj)
        .map(key => key + '=' + queryObj[key])
        .join('&');

      const response = await getAvailableTimes(queryString);
      if (response.data.success) {
        updateTimes(formatTimes(response.data.data));
        updateLoading(false);
      }
    };
    getData();
  }, [props]);

  return (
    <SafeAreaView style={{backgroundColor: colors.background1, flex: 1}}>
      <NewSessionHeader progress={progress} title="Choose Time" />
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <View style={styles.form}>
          {loading ? (
            <Loading size="large" />
          ) : (
            <>
              <Text style={[styles.labelStyle, {color: 'white'}]}>
                Choose Time
              </Text>
              <TypeSelect
                content={times}
                onTypeSelect={value => props.updateSession({time: value})}
                selected={props.newSession.time}
              />
            </>
          )}
          {props.newSession.time && (
            <>
              <View style={{height: 60}} />
              <Button onPress={() => Actions.push('reservationconfirm')}>
                Review Reservation
              </Button>
            </>
          )}
        </View>
        <View style={{height: 240}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapState = state => ({
  newSession: state.newSession,
});

const mapDispatch = dispatch => ({
  updateSession: data => dispatch.newSession.add(data),
});

export default connect(mapState, mapDispatch)(ChooseTime);
