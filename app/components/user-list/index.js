import React from 'react';
import {connect} from 'react-redux';
import {Button, FlatList, Text, View} from 'react-native';

const UserList = props => (
  <View>
    <Button
      title="Add User"
      onPress={() =>
        props.add({
          id: props.users.length
            ? props.users[props.users.length - 1].id + 1
            : 1,
          name:
            'User ' +
            (props.users.length
              ? props.users[props.users.length - 1].id + 1
              : 1),
        })
      }
    />
    <Text>Users:</Text>
    <FlatList
      data={props.users}
      renderItem={({item}) => (
        <View>
          <Text>Id: {item.id}</Text>
          <Text>Name: {item.name}</Text>
          <Button
            title="Remove User (immediate)"
            onPress={() => props.remove(item.id)}
          />
          <Button
            title="Remove User (1 sec delay)"
            onPress={() => props.asyncRemove(item.id)}
          />
        </View>
      )}
      keyExtractor={item => item.id.toString()}
    />
  </View>
);

const mapState = state => {
  return {
    users: state.user,
  };
};

const mapDispatch = dispatch => ({
  add: user => dispatch.user.add(user),
  remove: id => dispatch.user.remove(id),
  asyncRemove: id => dispatch.user.asyncRemove(id),
});

export default connect(
  mapState,
  mapDispatch,
)(UserList);
