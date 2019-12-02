import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Button, SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {GreenText} from '../../styled-components/green-text';
import UserList from '../../components/user-list';

class Test extends Component {
  incrementCount = () => {
    const {increment} = this.props;
    increment();
  };

  render() {
    const {count} = this.props;

    return (
      <Fragment>
        <StatusBar barStyle="light-content" />
        <SafeAreaView>
          <ScrollView>
            <GreenText>COUNT = {count}</GreenText>
            <Button onPress={this.incrementCount} title="Increment" />
            {<UserList />}
          </ScrollView>
        </SafeAreaView>
      </Fragment>
    );
  }
}

const mapState = state => ({
  count: state.count,
});

const mapDispatch = dispatch => ({
  increment: () => dispatch.count.increment(),
});

export default connect(
  mapState,
  mapDispatch,
)(Test);
