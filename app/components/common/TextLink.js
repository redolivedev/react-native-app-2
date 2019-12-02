import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';

const TextLink = ({onPress, children}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export {TextLink};
