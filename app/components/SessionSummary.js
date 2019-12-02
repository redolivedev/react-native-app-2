import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Button} from '../components/common';
import styles from '../styles/index.style';
import moment from 'moment';
import {Actions} from 'react-native-router-flux';

const SessionSummary = ({session, user}) => {
  const [modalVisible, updateModalVisible] = useState(false);
  const [phone, updatePhone] = useState('');

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          marginBottom: 5,
        }}>
        <Text style={[styles.subtitle, {marginBottom: 0, color: 'white'}]}>
          Reserved Session
        </Text>
        <Text style={[styles.bodyCopy, {color: 'white'}]}>
          {moment(session.startTime).format('M/DD/YY')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => Actions.push('currentSession')}
        style={{
          padding: 25,
          borderRadius: 9,
          backgroundColor: 'white',
        }}>
        <Text style={{fontSize: 24, marginBottom: 25}}>
          {session.package_id + 2} game package
        </Text>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48%', marginBottom: 20}}>
            <Text style={styles.labelStyleGray}>Start Time</Text>
            <Text style={{fontSize: 16}}>
              {moment(session.startTime_local).format('h:mma')}
            </Text>
          </View>
          <View style={{width: '48%', marginBottom: 20}}>
            <Text style={styles.labelStyleGray}>Players</Text>
            <Text style={{fontSize: 16}}>
              {session.is_public ? 'Public' : session.capacity}
            </Text>
          </View>
          <View style={{width: '48%', marginBottom: 10}}>
            <Text style={styles.labelStyleGray}>Team Name</Text>
            <Text style={{fontSize: 16}}>{session.team_name}</Text>
          </View>
          <View style={{width: '48%', marginBottom: 10}}>
            <Text style={styles.labelStyleGray}>Team Lead</Text>
            <Text style={{fontSize: 16}}>
              {user.first_name} {user.last_name}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{marginBottom: 25}}>
        <Button onPress={() => updateModalVisible(true)}>Invite Friends</Button>
      </View>
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View style={{margin: 50}}>
            <Text style={styles.labelStyle}>Enter Phone Number</Text>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                placeholder="phone"
                value={phone}
                onChangeText={value => updatePhone(value)}
                style={modalStyles.input}
              />
              <TouchableOpacity
                onPress={() => updateModalVisible(false)}
                style={modalStyles.button}>
                <Text style={{color: 'white', fontWeight: '700'}}>SEND</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const modalStyles = StyleSheet.create({
  button: {
    paddingVertical: 11,
    paddingHorizontal: 30,
    color: 'white',
    backgroundColor: 'red',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
});

export default SessionSummary;
