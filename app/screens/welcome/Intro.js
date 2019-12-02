import React from 'react';
import {View, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {Button} from '../../components/common';
import styles from '../../styles/index.style';

const Intro = ({name}) => {
  const welcomeContent = [
    {
      title: 'Book a New Session',
      content: 'Select how many games you play and your game preferences.',
    },
    {
      title: 'Build Your Team',
      content: 'Nulla quis lorem ut libero malesuada feugiat arcu eramper iet.',
    },
    {
      title: 'Another Title',
      content: 'Nulla quis lorem ut libero malesuada feugiat arcu eramper iet.',
    },
  ];
  return (
    <View style={styles.container}>
      <Text style={[styles.title, {color: 'white'}]}>Welcome, {name}!</Text>
      {welcomeContent.map((item, index) => (
        <View key={index}>
          <View style={styles.listHeader}>
            <View style={styles.listNum}>
              <Text>{index + 1}</Text>
            </View>
            <Text style={styles.listTitle}>{item.title}</Text>
          </View>
          <Text style={styles.listText}>{item.content}</Text>
        </View>
      ))}
      <Button onPress={() => Actions.push('newsession')}>
        Book A New Session
      </Button>
    </View>
  );
};

export default Intro;
