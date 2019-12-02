import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../styles/index.style';

const Button = ({
  onPress,
  children,
  outline = false,
  arrow = false,
  reverse = false,
}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.button,
          {
            justifyContent: arrow ? 'space-between' : 'center',
            backgroundColor: reverse ? 'white' : colors.red,
            borderColor: reverse ? 'white' : colors.red,
          },
        ]}>
        {arrow && <Text />}
        <Text style={[styles.text, {color: reverse ? colors.red : 'white'}]}>
          {children}
        </Text>
        {arrow && (
          <Text style={{color: reverse ? colors.red : 'white'}}>→</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  button: {
    padding: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 3,
    borderRadius: 9,
    marginTop: 10,
    marginBottom: 5,
  },
  outlineButton: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 5,
  },
});

export {Button};
