import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import http from '../../services/http';
import {TextLink, Loading, AlertComp} from '../../components/common';
import styles from '../../styles/index.style';

const Pin = props => {
  const [pin, updatePin] = useState('');
  const [loading, updateLoading] = useState(false);

  const submitPin = async pin => {
    const response = await http.post(
      `users/${props.user.id}/complete_phone_verification`,
      {
        pin: pin,
      },
    );
    console.log(response);
    if (response.data.success) {
      Actions.home(); //@todo needs to go to waiver screen
    } else {
      AlertComp('Error', response.data.data.errors.join(', '));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.labelStyle, {color: 'white'}]}>Enter Pin</Text>
      <SmoothPinCodeInput
        cellStyle={cellStyles.cell}
        cellStyleFocused={cellStyles.cellFocused}
        restrictToNumbers={true}
        value={pin}
        onTextChange={pin => updatePin(pin)}
        onFulfill={pin => submitPin(pin)}
        // onBackspace={}
      />
      <TextLink>Resend Pin?</TextLink>

      {loading && <Loading size={'large'} />}
    </View>
  );
};

const cellStyles = StyleSheet.create({
  cell: {
    backgroundColor: 'white',
  },
  cellFocused: {
    backgroundColor: '#d3d3d3',
  },
});

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  auth: user => dispatch.user.auth(user),
});

export default connect(
  mapState,
  mapDispatch,
)(Pin);
