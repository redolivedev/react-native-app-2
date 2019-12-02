import React, {useState} from 'react';
import {connect} from 'react-redux';
import {TextInput, StyleSheet} from 'react-native';

const Score = props => {
  const [score, updateScore] = useState(props.data.score);
  return (
    <TextInput
      style={styles.scoreBox}
      value={score.toString()}
      keyboardType={'numeric'}
      numeric={true}
      onBlur={value =>
        props.updateScore({
          gameId: props.data.gameId,
          player: props.data.player,
          round: props.data.round,
          score: score,
        })
      }
      onChangeText={value => updateScore(value)}
      maxLength={3}
    />
  );
};

const styles = StyleSheet.create({
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
});

const mapDispatch = dispatch => ({
  updateScore: data => dispatch.session.updateScore(data),
});

export default connect(null, mapDispatch)(Score);
