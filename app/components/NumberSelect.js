import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles/index.style';

const NumberSelect = ({onChange, selected}) => {
  const nums = [2, 3, 4, 5, 6, 7, 8];

  return (
    <View style={styles.container}>
      {nums.map(num => (
        <TouchableOpacity key={`number-${num}`} onPress={() => onChange(num)}>
          <View
            style={[
              styles.border,
              {borderColor: selected === num ? colors.green : colors.lightGray},
            ]}>
            <Text
              style={{
                alignSelf: 'center',
                margin: 3,
                fontSize: 16,
                color: selected === num ? '#000' : colors.lightGray,
              }}>
              {num}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  border: {
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    alignSelf: 'center',
    marginHorizontal: 3,
    marginVertical: 7,
  },
});

export default NumberSelect;
