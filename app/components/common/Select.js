import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Select = ({label, items, selectedValue, onValueChange}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <RNPickerSelect
        style={styles}
        onValueChange={onValueChange}
        items={items}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: 10,
  },
  labelStyle: {
    color: 'white',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  inputIOS: {
    color: '#000',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
    lineHeight: 23,
  },
  inputAndroid: {
    color: '#000',
    backgroundColor: 'white',
    padding: 10,
    fontSize: 18,
    lineHeight: 23,
  },
});

export {Select};
