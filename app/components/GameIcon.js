import React from 'react';
import {View} from 'react-native';

export default function GameIcon({iconName}) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 15,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#333',
        marginRight: 5,
      }}></View>
  );
}
