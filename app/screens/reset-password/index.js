import React, {Component} from 'react';
import {Text, View, StyleSheet, FlatList, Item} from 'react-native';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import {Input, TextLink, Loading, Button} from '../../components/common';
import http from '../../services/http';
import styles from '../../styles/index.style';

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      errors: [],
      loading: false,
    };
  }

  async getResetToken() {}

  async resetRequest() {
    this.setState({errors: [], loading: true});
    const {email, password, password_confirmation} = this.state;

    const response = await http.post('password/create', {
      email: email,
      password: password,
      password_confirmation: password_confirmation,
    });

    console.log(response);
    if (response.data.success) {
      Actions.login();
    } else {
      this.setState({errors: response.data.data.errors, loading: false});
    }
  }

  render() {
    const {
      email,
      password,
      password_confirmation,
      errors,
      loading,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.form}>
          <View style={styles.section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={email}
              onChangeText={email => this.setState({email})}
            />
          </View>

          <View style={styles.section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={password}
              onChangeText={password => this.setState({password})}
            />
          </View>

          <View style={styles.section}>
            <Input
              placeholder="user@email.com"
              label="Email"
              value={password_confirmation}
              onChangeText={password_confirmation =>
                this.setState({password_confirmation})
              }
            />
          </View>

          <FlatList
            data={errors}
            renderItem={({item}) => <Item title={item} />}
          />

          {!loading ? (
            <Button onPress={this.ResetPassword}>Login</Button>
          ) : (
            <Loading size={'large'} />
          )}

          <TextLink onPress={() => Actions.login()}>Login</TextLink>
        </View>
      </View>
    );
  }
}

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  add: user => dispatch.user.add(user),
});

export default connect(
  mapState,
  mapDispatch,
)(ResetPassword);
