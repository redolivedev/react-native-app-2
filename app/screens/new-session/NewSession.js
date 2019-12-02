import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  TextInput,
  Picker,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Button} from '../../components/common';
import styles, {colors} from '../../styles/index.style';
import NumberSelect from '../../components/NumberSelect';
import TypeSelect from '../../components/TypeSelect';
import NewSessionHeader from './NewSessionHeader';

const DatePicker = ({}) => {
  <Modal>
    <Picker
      selectedValue={'java'}
      style={{height: 50, width: 100}}
      onValueChange={(itemValue, itemIndex) =>
        props.updateSession({date: itemValue})
      }>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  </Modal>;
};

const NewSession = props => {
  // const [loading, setLoading] = useState(false);
  // const [showDate, setShowDate] = useState(true);
  const [teamName, setTeamName] = useState(props.newSession.team_name);
  const sessionTypeContent = [
    {
      value: 0,
      label: 'Private',
      description: 'Only invited people',
    },
    {
      value: 1,
      label: 'Public',
      description: 'Anyone can join',
    },
  ];

  return (
    <>
      <NewSessionHeader progress={1} title="Team Information" />
      <ScrollView style={styles.scrollableContainer} bounces={false}>
        <View style={styles.section}>
          <Text style={styles.subtitle}>
            What do you want your team to be called?
          </Text>
          <Text style={styles.labelStyle}>Team Name</Text>
          <TextInput
            placeholder="Something easy to remember and PG"
            label="Team Name"
            value={props.newSession.team_name}
            onChangeText={value => setTeamName(value)}
            onBlur={() => props.updateSession({team_name: teamName})}
            style={styles.input}
          />
        </View>

        <View style={{height: 40}} />

        <Text style={styles.subtitle}>What day would you like to play?</Text>
        <Text style={styles.bodyCopy}>
          Select the day you'd like to play. You can select your prefered time
          in just a sec.
        </Text>

        <Text style={styles.labelStyle}>Date</Text>
        <TouchableOpacity
          style={[
            styles.input,
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: 13,
            },
          ]}>
          <Text style={{color: '#333'}}>DATE PLACEHOLDER</Text>
          <Text>▼</Text>
        </TouchableOpacity>

        <View style={{height: 60}} />

        <View>
          <Text style={[styles.subtitle, {marginBottom: 10}]}>
            Whould you like to keep your team open and let others join?
          </Text>
          <Text style={styles.bodyCopy}>
            Lorum ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>
          <TypeSelect
            content={sessionTypeContent}
            onTypeSelect={value => props.updateSession({is_public: value})}
            selected={props.newSession.is_public}
          />
        </View>

        <View style={{height: 40}} />

        {props.newSession.is_public === 0 && (
          <View>
            <Text style={[styles.subtitle, {marginBottom: 5}]}>
              How many people are in your group?
            </Text>
            <Text style={styles.bodyCopy}>
              Teams can have a minimum of 2 and a maximum of 8 people.
            </Text>
            <NumberSelect
              onChange={value => props.updateSession({capacity: value})}
              selected={props.newSession.capacity}
            />
          </View>
        )}

        <View style={{height: 30}} />

        {props.newSession.team_name !== '' && props.newSession.date && (
          <Button arrow={true} onPress={() => Actions.push('gamepreferences')}>
            Game Preferences
          </Button>
        )}
        <View style={{height: 100}} />
      </ScrollView>
    </>
  );
};

const mapState = state => ({
  newSession: state.newSession,
});

const mapDispatch = dispatch => ({
  updateSession: data => dispatch.newSession.add(data),
});

export default connect(mapState, mapDispatch)(NewSession);
