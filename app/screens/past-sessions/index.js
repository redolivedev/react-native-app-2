import React from 'react';
import {View, Text, SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import styles, {colors} from '../../styles/index.style';
import GameIcon from '../../components/GameIcon';
import Moment from 'moment';
import {BackArrow} from '../../components/common';

const Session = ({data}) => {
  return (
    <View style={sessionStyles.session}>
      <View style={sessionStyles.header}>
        <Text style={{fontSize: 17}}>
          {Moment(data.scheduled_start).format('MM/DD/YY')}
        </Text>
        <View style={sessionStyles.teamSize}>
          <Text>{data.players.length}</Text>
        </View>
      </View>
      <View style={sessionStyles.games}>
        {data.games.map((game, index) => (
          <GameIcon key={index} iconName="soccer-ball-o" />
        ))}
      </View>
      <Text style={sessionStyles.teamName}>{data.reservation.team_name}</Text>
      <Text>High Score? Winner?</Text>
    </View>
  );
};

const PastSessions = props => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background1,
      }}>
      <BackArrow />
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <Text style={[styles.title, {color: 'white'}]}>Past Sessions</Text>
        {props.pastSessions.length &&
          props.pastSessions.map(session => (
            <Session key={session.id} data={session} />
          ))}
        <View style={{height: 100}} />
      </ScrollView>
    </SafeAreaView>
  );
};

const sessionStyles = StyleSheet.create({
  session: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  teamSize: {
    color: '#666',
    width: 23,
    height: 23,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  teamName: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
  },
  games: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
});

const mapState = state => ({
  user: state.user,
  pastSessions: state.pastSessions,
});

export default connect(mapState)(PastSessions);
