import React from 'react';
import {View, Text} from 'react-native';

export default function TabIcon({title, focused}) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 10,
      }}>
      {/* <Text style={{color: 'white', fontSize: 12}}>{title}</Text> */}
    </View>
  );
}
