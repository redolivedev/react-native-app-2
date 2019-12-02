import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
const uuidv4 = require('uuid/v4');

const NumberOfGamesSelect = props => {
  const options = [
    {
      id: 1,
      label: '3 games',
      value: 3,
      price: '$39/PERSON',
      description: 'Estimated 1.5 - 2 hours',
    },
    {
      id: 2,
      label: '4 games',
      value: 4,
      price: '$49/PERSON',
      description: 'Estimated 2 - 3 hours',
    },
    {
      id: 3,
      label: '5 Games',
      value: 5,
      price: '$59/PERSON',
      description: 'Estimated 3 - 4 hours',
    },
  ];
  const [selected, updateSelected] = useState(props.package);

  const handleOnPress = value => {
    updateSelected(value);
    props.onTypeSelect(value);
  };

  return (
    <View style={styles.container}>
      {options.map(option => (
        <SelectButton
          key={uuidv4()}
          content={option}
          selected={selected}
          onPress={value => handleOnPress(value)}
        />
      ))}
    </View>
  );
};

const SelectButton = ({onPress, content, selected}) => {
  const {id, label, description, price, value} = content;
  return (
    <TouchableOpacity onPress={() => onPress(id)} style={{marginVertical: 8}}>
      <View style={styles.button}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: selected === id ? '#ccc' : 'transparent',
              },
            ]}
          />
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text>{price}</Text>
      </View>
      <Text style={{color: '#ccc'}}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  button: {
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderRadius: 7,
    borderWidth: 2,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 3,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  dot: {
    width: 15,
    height: 15,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 8,
  },
});

export default NumberOfGamesSelect;
