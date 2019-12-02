import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../styles/index.style';

const TypeSelect = props => {
  const [selected, updateSelected] = useState(props.selected);
  const uuidv4 = require('uuid/v4');
  const handleEvent = label => {
    updateSelected(label);
    props.onTypeSelect(label);
  };

  return (
    <View style={styles.container}>
      {props.content.map(option => (
        <SelectButton
          key={uuidv4()}
          content={option}
          selected={selected}
          handleOnPress={label => handleEvent(label)}
        />
      ))}
    </View>
  );
};

const SelectButton = ({handleOnPress, content, selected}) => {
  const {value, label, description} = content;
  return (
    <TouchableOpacity
      style={styles.column}
      onPress={() => handleOnPress(content.value)}>
      <View
        style={[
          styles.button,
          {
            borderColor:
              selected === content.value ? colors.green : colors.lightGray,
          },
        ]}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor:
                selected === content.value ? colors.green : 'transparent',
              borderColor:
                selected === content.value ? colors.green : colors.lightGray,
            },
          ]}></View>
        <Text
          style={[
            styles.label,
            {color: selected === content.value ? '#000' : colors.lightGray},
          ]}>
          {label}
        </Text>
      </View>
      {description && (
        <Text style={{color: colors.lightGray}}>{description}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: '100%',
  },
  column: {
    width: '48%',
    marginVertical: 8,
  },
  button: {
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderRadius: 7,
    borderWidth: 2,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 3,
  },
  label: {
    fontSize: 16,
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    borderWidth: 2,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TypeSelect;
