import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Modal,
} from 'react-native';
import {ButtonDark} from '../../components/common';
import Timer from './Timer';
import Score from './Score';

const uuidv4 = require('uuid/v4');

const ReportModal = ({modalVisible, handleClose}) => {
  const [issueDescription, updateIssueDescription] = useState('');
  return (
    <Modal animationType="slide" transparent={false} visible={modalVisible}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{margin: 50}}>
          <Text style={styles.labelStyle}>Issue Description</Text>
          <TextInput
            placeholder="Enter description"
            value={issueDescription}
            onChangeText={value => updateIssueDescription(value)}
            style={styles.input}
            multiline={true}
          />
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleClose(false)}
              style={styles.cancelButton}>
              <Text style={{textAlign: 'center'}}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleClose(false)}
              style={styles.submitButton}>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontWeight: '700',
                }}>
                SEND
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const Player = ({game, player}) => {
  return (
    <View style={styles.row}>
      <Text style={styles.name}>
        {player.firstname} {player.lastname}
      </Text>
      <View style={styles.scores}>
        {player.scores.map((score, index) => (
          <Score
            key={uuidv4()}
            data={{gameId: game, player: player.id, round: index, score: score}}
          />
        ))}
      </View>
    </View>
  );
};

// const Winner = ({players}) => {
//   const [highestScore, updateHighestScore] =  useState(0);

//   function addScores(scores){

//   }
// }

const Game = props => {
  const [modalVisible, updateModalVisible] = useState(false);
  const [active, updateActive] = useState(false);
  const [complete, updateComplete] = useState(false);
  const updateScore = scoreData => {
    props.updateScore({gameId: props.data.item.id, ...scoreData});
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => props.toggleView({toggle: 'dashboard'})}
        style={styles.handle}
      />
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 5}}>
          <Timer
            num={props.data.index + 1}
            secs={props.data.item.total_game_seconds}
            active={active}
            handleComplete={value => updateComplete(value)}
          />
          <Text
            style={[
              styles.title,
              {marginBottom: 15, textTransform: 'capitalize'},
            ]}>
            {props.data.item.title}
          </Text>
          <TouchableOpacity onPress={() => updateModalVisible(true)}>
            <Text>REPORT ISSUE →</Text>
          </TouchableOpacity>
        </View>
        {!complete && (
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => updateActive(!active)}></TouchableOpacity>
        )}
      </View>
      {complete === true ? (
        <View style={{marginVertical: 30}}>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            Game is complete!
          </Text>
          <Text style={[styles.title, {textAlign: 'center'}]}>
            Return to the lounge
          </Text>
          {/* <Winner players={props.data.item.players} /> */}
        </View>
      ) : (
        <>
          <View style={{marginVertical: 15}}>
            <ButtonDark outline={true}>How to play</ButtonDark>
          </View>
          <View style={styles.scoresHeader}>
            <View style={{flex: 4}}>
              <Text style={{fontSize: 10}}>Player</Text>
            </View>
            <View
              style={{
                flex: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {props.data.item.players[0].scores.map((cell, index) => (
                <Text
                  key={index}
                  style={{fontSize: 10, width: 50, marginLeft: 5}}>
                  Round {index + 1}
                </Text>
              ))}
            </View>
          </View>
          {props.data.item.players.length &&
            props.data.item.players.map(player => (
              <Player
                key={uuidv4()}
                game={props.data.item.id}
                player={player}
                handleChange={value => updateScore(value)}
              />
            ))}
        </>
      )}
      <ReportModal
        modalVisible={modalVisible}
        handleClose={value => updateModalVisible(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderRadius: 8,
    margin: 5,
    flex: 1,
  },
  handle: {
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: '#EAEAEA',
    height: 5,
    width: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  },
  name: {
    flex: 4,
    fontSize: 16,
    color: '#333',
  },
  scoresHeader: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  scores: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 5,
  },
  scoreBox: {
    padding: 10,
    margin: 5,
    borderColor: '#ccc',
    borderWidth: 2,
    fontSize: 18,
    width: 50,
    height: 50,
    textAlign: 'center',
  },
  labelStyle: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cancelButton: {
    paddingVertical: 11,
    paddingHorizontal: 30,
    backgroundColor: '#ccc',
    flex: 1,
    textAlign: 'center',
    marginRight: 5,
  },
  submitButton: {
    paddingVertical: 11,
    paddingHorizontal: 30,
    color: 'white',
    backgroundColor: 'red',
    flex: 1,
    textAlign: 'center',
    marginLeft: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    minHeight: 50,
  },
  playButton: {
    height: 80,
    borderRadius: 5,
    backgroundColor: '#ccc',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapState = state => ({
  session: state.session,
});

const mapDispatch = dispatch => ({
  toggleView: data => dispatch.session.toggle(data),
});

export default connect(mapState, mapDispatch)(Game);
