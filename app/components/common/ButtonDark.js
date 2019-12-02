import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const ButtonDark = ({onPress, children, outline = false}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={onPress}
        style={outline ? styles.outlineButton : styles.button}>
        <Text style={styles.text}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  button: {
    padding: 13,
    flex: 1,
    borderWidth: 3,
    borderColor: '#333',
    backgroundColor: '#333',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  outlineButton: {
    padding: 13,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
});

export {ButtonDark};
