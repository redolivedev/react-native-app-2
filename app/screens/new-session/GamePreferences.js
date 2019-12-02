import React, {useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button, Loading} from '../../components/common';
import styles, {colors} from '../../styles/index.style';
import TypeSelect from '../../components/TypeSelect';
import NumberOfGamesSelect from '../../components/NumberOfGamesSelect';
import NewSessionHeader from './NewSessionHeader';
import {getProgress} from '../../services/ComputedValues';
import {getAllGames} from '../../services/gameData';

const GamePreferences = props => {
  const [pref, updatePref] = useState(false);
  const progress = getProgress(
    Object.keys(props.newSession),
    props.newSession.is_public === false,
  );
  const prefs = [
    {
      value: true,
      label: 'Yes',
      description: 'We want to pick our favorite and least favorite games',
    },
    {
      value: false,
      label: 'No',
      description: "Surprise us! We'll play anything",
    },
  ];

  const games = getAllGames();

  return (
    <SafeAreaView style={{backgroundColor: colors.background1}}>
      <NewSessionHeader progress={progress} title="Game Preferences" />
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <View style={styles.form}>
          <View>
            <Text style={[styles.subtitle, {marginBottom: 10, color: 'white'}]}>
              How many games do you want to play?
            </Text>

            <NumberOfGamesSelect
              onTypeSelect={value => props.updateSession({package_id: value})}
              package={props.newSession.package_id}
            />
          </View>
          <View style={{height: 60}} />
          <View>
            <Text style={[styles.subtitle, {marginBottom: 10, color: 'white'}]}>
              Would you like to choose your game preferences?
            </Text>
            <Text style={{color: 'white', marginBottom: 10}}>
              Lorum ipsum dolor sit amet, consectetur adipiscing elit.
            </Text>
            <TypeSelect
              content={prefs}
              selected={pref}
              onTypeSelect={value => updatePref(value)}
            />
          </View>
          <View style={{height: 80}} />
          {pref === true && (
            <>
              <View>
                <Text
                  style={[styles.subtitle, {marginBottom: 10, color: 'white'}]}>
                  We really want to play...
                </Text>
                <Text style={{color: '#ccc', marginBottom: 10}}>
                  Please select one
                </Text>
                <TypeSelect
                  content={games}
                  selected={props.newSession.preferred_game_id}
                  onTypeSelect={value =>
                    props.updateSession({preferred_game_id: value})
                  }
                />
              </View>

              <View style={{height: 80}} />
              <View>
                <Text
                  style={[styles.subtitle, {marginBottom: 10, color: 'white'}]}>
                  We definitely do not want to play...
                </Text>
                <Text style={{color: '#ccc', marginBottom: 10}}>
                  Please select one
                </Text>
                <TypeSelect
                  content={games}
                  selected={props.newSession.disfavored_game_id}
                  onTypeSelect={value =>
                    props.updateSession({disfavored_game_id: value})
                  }
                />
              </View>
              <View style={{height: 80}} />
            </>
          )}
          {(pref === false ||
            (props.newSession.disfavored_game_id &&
              props.newSession.preferred_game_id)) && (
            <Button onPress={() => Actions.push('chooseTime')}>
              See Available Times
            </Button>
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

export default connect(mapState, mapDispatch)(GamePreferences);
