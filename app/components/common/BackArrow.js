import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Actions} from 'react-native-router-flux';

const BackArrow = () => {
  return (
    <TouchableOpacity onPress={() => Actions.pop()} style={{padding: 10}}>
      <Text>Back</Text>
    </TouchableOpacity>
  );
};

// const styles = StyleSheet.create({});

export {BackArrow};
