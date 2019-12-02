import React, {useState} from 'react';
import {View, Text, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import moment from 'moment';
import styles, {colors} from '../../styles/index.style';
import FlipToggle from 'react-native-flip-toggle-button';
import PlayerGamesLists from './PlayerGamesLists';
import GameSlider from './GameSlider';
import SessionAlert from './SessionAlert';

const Session = props => {
  const [start, updateStart] = useState(false);

  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.background2,
        flex: 1,
      }}>
      <SessionAlert startTime={props.session.startTime} />
      <ScrollView
        style={[
          styles.scrollableContainer,
          {backgroundColor: colors.background2, padding: 0},
        ]}
        bounces={false}>
        <View style={{flex: 1}}>
          <View style={{height: 60}} />
          <View style={{paddingHorizontal: 50}}>
            <Text style={[styles.labelStyle, {marginBottom: 0}]}>
              Team Name
            </Text>
            <Text style={styles.title}>{props.session.team_name}</Text>
            {props.session.toggle === 'dashboard' && (
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginBottom: 45,
                }}>
                <View style={{width: '48%'}}>
                  <Text style={styles.labelStyleGray}>Date</Text>
                  <Text style={{fontSize: 18}}>
                    {moment(props.session.startTime).format('MMM D')}
                  </Text>
                </View>
                <View style={{width: '48%'}}>
                  <Text style={styles.labelStyleGray}>Start Time</Text>
                  <Text style={{fontSize: 18}}>
                    {moment(props.session.startTime).format('h:mma')}
                  </Text>
                </View>
              </View>
            )}
          </View>
          {props.session.toggle === 'game' ? (
            <GameSlider
              games={props.session.games}
              activeSlide={
                props.session.activeSlide ? props.session.activeSlide : 0
              }
            />
          ) : (
            <View style={{paddingHorizontal: 50}}>
              <PlayerGamesLists
                players={props.session.players}
                games={props.session.games}
              />
              <Text
                style={{textAlign: 'center', marginTop: 40, marginBottom: 10}}>
                Everyone's checked in and ready to play?
              </Text>
              <FlipToggle
                value={start}
                buttonWidth={viewportWidth - 100}
                buttonHeight={60}
                buttonRadius={60}
                sliderWidth={50}
                sliderHeight={50}
                sliderRadius={50}
                onLabel={'SESSION ACTIVE'}
                offLabel={'SLIDE TO INITIATE PLAY'}
                labelStyle={{color: '#ccc', letterSpacing: 1}}
                onToggle={value => props.toggleView({toggle: 'game'})}
                buttonOnColor={'#666'}
                buttonOffColor={'#4F4F4F'}
                sliderOffColor={'white'}
                sliderOnColor={'white'}
                // onToggleLongPress={() => console.log('toggle long pressed!')}
              />
            </View>
          )}
          <View style={{height: 100}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const {width: viewportWidth} = Dimensions.get('window');

const mapState = state => ({
  user: state.user,
  session: state.session,
});

const mapDispatch = dispatch => ({
  addSession: data => dispatch.session.add(data),
  toggleView: data => dispatch.session.toggle(data),
});

export default connect(mapState, mapDispatch)(Session);
