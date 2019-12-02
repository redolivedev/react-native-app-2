import React from 'react';
import {View, TextInput, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/index.style';

const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  multiline,
  numberOfLines,
  reverse = false,
}) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCorrect={false}
        multiline={multiline}
        numberOfLines={numberOfLines}
        style={[
          styles.inputStyle,
          {
            backgroundColor: reverse ? 'transparent' : 'white',
            borderColor: reverse ? 'white' : colors.lightGray,
            color: reverse ? 'white' : colors.gray,
          },
        ]}
        autoCapitalize="none"
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
  inputStyle: {
    padding: 12,
    fontSize: 18,
    lineHeight: 23,
    borderRadius: 8,
    borderWidth: 2,
  },
});

export {Input};
