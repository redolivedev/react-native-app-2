import React from 'react';
import {Image} from 'react-native';

export default function Logo() {
  return (
    <Image
      source={{url: 'http://mojo-dojo-api.test/images/logo.png'}}
      style={{
        width: 200,
        height: 200,
        alignSelf: 'center',
        resizeMode: 'contain',
        marginVertical: 50,
      }}
    />
  );
}
