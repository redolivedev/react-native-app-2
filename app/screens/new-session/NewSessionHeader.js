import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {colors} from '../../styles/index.style';

const NewSessionHeader = ({progress, title}) => {
  return (
    <View style={newSessionHeaderStyles.header}>
      <Text style={newSessionHeaderStyles.headerTitle}>{title}</Text>
      <View style={newSessionHeaderStyles.dots}>
        {[1, 2, 3].map(num => (
          <View
            key={num}
            style={[
              newSessionHeaderStyles.dot,
              {
                backgroundColor:
                  num === progress ? colors.burgandy : 'transparent',
              },
            ]}
          />
        ))}
      </View>
      <View style={newSessionHeaderStyles.line} />
    </View>
  );
};

const newSessionHeaderStyles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    textAlign: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginTop: 25,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 5,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderColor: colors.burgandy,
    borderWidth: 2,
    margin: 3,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginTop: 20,
  },
});

export default NewSessionHeader;
