import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import styles from '../../styles/index.style';
import SessionSummary from '../../components/SessionSummary';

const SessionBooked = props => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {textAlign: 'center', color: 'white'}]}>
        Session is booked!
      </Text>
      <Text
        style={[
          styles.bodyCopy,
          {textAlign: 'center', color: 'white', marginBottom: 30},
        ]}>
        Information about arriving early and inviting friends.
      </Text>
      {props.session.id && (
        <SessionSummary session={props.session} user={props.user} />
      )}
    </View>
  );
};

const mapState = state => ({
  session: state.session,
  user: state.user,
});

const mapDispatch = dispatch => ({
  updateSession: session => dispatch.session.add(session),
});

export default connect(mapState, mapDispatch)(SessionBooked);
