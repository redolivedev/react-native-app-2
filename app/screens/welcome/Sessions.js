import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {TextLink} from '../../components/common';
import GameIcon from '../../components/GameIcon';
import Moment from 'moment';
import {Actions} from 'react-native-router-flux';

const Session = ({data}) => {
  return (
    <View style={styles.session}>
      <View style={styles.header}>
        <Text style={{fontSize: 17}}>
          {Moment(data.scheduled_start).format('MM/DD/YY')}
        </Text>
        <View style={styles.teamSize}>
          <Text>{data.players.length}</Text>
        </View>
      </View>
      <View style={styles.games}>
        {data.games.map((game, index) => (
          <GameIcon key={index} iconName="soccer-ball-o" />
        ))}
      </View>
      <Text style={styles.teamName}>{data.reservation.team_name}</Text>
      <Text>High Score? Winner?</Text>
    </View>
  );
};

const renderItem = ({item, index}) => {
  return (
    <View style={styles.slide}>
      <Session data={item} />
    </View>
  );
};

const Sessions = ({sessions}) => {
  if (!sessions.length) {
    return null;
  } else {
    return (
      <View style={{width: '100%', marginBottom: 30}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}>
          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            Past Sessions
          </Text>
          <TextLink
            style={{color: '#fff', fontSize: 16}}
            onPress={() => Actions.push('pastSessions')}>
            View All
          </TextLink>
        </View>
        <View style={{height: 180}}>
          <Carousel
            // ref={c => {
            //   this._carousel = c;
            // }}
            activeSlideAlignment={'start'}
            data={sessions}
            renderItem={renderItem}
            sliderWidth={sliderWidth}
            itemWidth={220}
            inactiveSlideScale={1}
            inactiveSlideOpacity={1}
          />
        </View>
      </View>
    );
  }
};

const {width: viewportWidth} = Dimensions.get('window');
const sliderWidth = viewportWidth;
const styles = StyleSheet.create({
  firstSlide: {
    marginLeft: 30,
    marginRight: 10,
  },
  slide: {
    marginRight: 15,
  },
  session: {
    backgroundColor: '#ccc',
    padding: 20,
    borderRadius: 8,
    height: '100%',
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

export default Sessions;
