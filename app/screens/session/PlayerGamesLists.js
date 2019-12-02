import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from '../../styles/index.style';
import GameIcon from '../../components/GameIcon';

const Player = ({content}) => {
  return (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        marginVertical: 4,
        borderRadius: 5,
      }}>
      <Text style={{fontSize: 16}}>
        {content.firstname} {content.lastname}
      </Text>
    </View>
  );
};

const Game = ({content, handlePress}) => {
  return (
    <TouchableOpacity
      onPress={() => handlePress()}
      style={{
        padding: 20,
        backgroundColor: 'white',
        marginVertical: 4,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <GameIcon iconName="question" />
      <Text style={{fontSize: 16, marginLeft: 7}}>{content.title}</Text>
    </TouchableOpacity>
  );
};

const PlayerGamesLists = props => {
  const {players, games} = props;
  const [view, updateView] = useState('players');
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          marginBottom: 3,
        }}>
        <TouchableOpacity
          onPress={() => updateView('players')}
          style={{
            marginRight: 20,
            paddingBottom: 3,
            borderBottomWidth: 5,
            borderBottomColor: view === 'players' ? '#666' : 'transparent',
          }}>
          <Text
            style={[
              styles.labelStyle,
              {color: view === 'players' ? '#666' : '#ccc'},
            ]}>
            Players
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updateView('games')}
          style={{
            marginRight: 20,
            paddingBottom: 3,
            borderBottomWidth: 5,
            borderBottomColor: view === 'games' ? '#666' : 'transparent',
          }}>
          <Text
            style={[
              styles.labelStyle,
              {color: view === 'games' ? '#666' : '#ccc'},
            ]}>
            Games
          </Text>
        </TouchableOpacity>
      </View>
      {view === 'players' ? (
        <FlatList
          data={players}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Player content={item} />}
          style={{width: '100%'}}
        />
      ) : (
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Game
              content={item}
              handlePress={() =>
                props.toggleView({toggle: 'game', activeSlide: index})
              }
            />
          )}
          style={{width: '100%'}}
        />
      )}
    </>
  );
};

const mapDispatch = dispatch => ({
  toggleView: data => dispatch.session.toggle(data),
});

export default connect(
  null,
  mapDispatch,
)(PlayerGamesLists);
