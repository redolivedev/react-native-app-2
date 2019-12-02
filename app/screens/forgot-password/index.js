import React, {useState} from 'react';
import {View} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {
  Input,
  TextLink,
  Loading,
  Button,
  AlertComp,
} from '../../components/common';
import http from '../../services/http';
import styles from '../../styles/index.style';

const ForgotPassword = props => {
  const [email, updateEmail] = useState('');
  const [loading, updateLoading] = useState(false);

  const forgotPassword = async () => {
    const response = await http.post('password/create', {
      email: email,
    });

    if (response.data.success) {
      Actions.resetPassword();
    } else {
      <AlertComp
        title="Submit Error"
        message={response.data.data.errors.join(', ')}
      />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Input
            placeholder="user@email.com"
            label="Email"
            value={email}
            onChangeText={email => updateEmail(email)}
          />
        </View>

        {!loading ? (
          <Button onPress={() => forgotPassword()}>Submit</Button>
        ) : (
          <Loading size={'large'} />
        )}

        <TextLink onPress={() => Actions.login()}>Login</TextLink>
      </View>
    </View>
  );
};

const mapDispatch = dispatch => ({
  updateUser: token => dispatch.user.update(token),
});

export default connect(
  null,
  mapDispatch,
)(ForgotPassword);
