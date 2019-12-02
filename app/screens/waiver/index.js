import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import {Input, TextLink, Button, Loading} from '../../components/common';
import http from '../../services/http';

class Waiver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: [],
      loading: false,
    };
  }

  render() {
    const {errors, loading} = this.state;

    return (
      <View style={styles.container}>
        <Text>Waiver</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666',
  },
  errorTextStyle: {
    alignSelf: 'center',
    fontSize: 18,
    color: 'red',
  },
  form: {
    width: '100%',
    padding: 30,
  },
  section: {
    marginBottom: 5,
  },
});

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  add: user => dispatch.user.add(user),
});

export default connect(
  mapState,
  mapDispatch,
)(Waiver);
