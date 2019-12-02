import React, {useState, useEffect} from 'react';
import {
  View,
  Switch,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {Actions, Scene} from 'react-native-router-flux';
import {Input, AlertComp, Button, Loading} from '../../components/common';
import http from '../../services/http';
import AsyncStorage from '@react-native-community/async-storage';
import styles from '../../styles/index.style';
import {WebView} from 'react-native-webview';

const Settings = props => {
  const [userData, updateUserData] = useState({
    first_name: props.user.first_name,
    last_name: props.user.last_name,
    email: props.user.email,
    phone: props.user.phone,
  });

  const [switchValue] = useState(true);
  const [signedValue] = useState(false);

  const [isModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  // this.state.isVisible = false;

  toggleModal = () => {
    setIsVisible(!isVisible);
  };

  toggleSwitch = value => {
    //onValueChange of the switch this function will be called
    switchValue = useState(false);
    console.log(switchValue);
    //state changes according to switch
    //which will result in re-render the text
  };

  const [passwordData, updatePasswordData] = useState({
    password: '',
    new_password: '',
    new_password_confirmation: '',
  });
  const [loading, updateLoading] = useState(false);

  const logOut = async () => {
    const response = await http.post('logout', {});
    console.log(response);
    if (response.data.success) {
      try {
        await AsyncStorage.removeItem('token');
      } catch (error) {
        console.log('error');
      }
      Actions.login();
    } else {
      <AlertComp
        title="Error"
        message={response.data.data.errors.join(', ')}
      />;
    }
  };

  const updateUser = async () => {
    const response = await http.patch(
      'users/' + props.user.id + '/update',
      userData,
    );

    if (response.data.success) {
      if (!signedValue) {
        // const unique_id = (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        // userData.unique_id = unique_id;
        // userData.credential = 'credential';

        //Signing Waiver on save changes
        const waiverResponse = await http.get(
          'players?first_name=' +
            props.user.first_name +
            '&last_name=' +
            props.user.last_name +
            '&phone=' +
            props.user.phone,
        );
        console.log(waiverResponse);

        if (waiverResponse.data.success) {
          toggleModal();

          signedValue = true;
          waiverURL = waiverResponse.data.data.objWaiver.smartwaiver_url;
        } else {
          AlertComp('Error', response.data.data.errors.join(', '));
        }
      } else {
        signedValue = false;
      }

      props.udpate({
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email,
        phone: response.data.data.phone,
      });
    } else {
      AlertComp('Error', response.data.data.errors.join(', '));
    }
  };

  const updatePassword = async () => {
    console.log(passwordData);
    const response = await http.patch(
      'users/' + props.user.id + '/update_password',
      passwordData,
    );

    if (response.data.success) {
      AlertComp('Password Updated!', null);
    } else {
      AlertComp('Error', response.data.data.errors.join(', '));
    }
  };

  return (
    <ScrollView style={styles.scrollableContainer} bounces={false}>
      {/* <ScrollView style={styles.scrollableContainer} bounces={false}>
        {signedValue?<Text></Text>:this.renderContent()}
      </ScrollView>     */}
      <Modal visible={isVisible}>
        <View>
          <Button onPress={() => toggleModal()}>Close</Button>
        </View>

        <WebView
          source={{
            uri:
              'https://waiver.smartwaiver.com/auto?auto_waiverid=5dda1ac49668d&auto_tag=5dda25bd71e16',
          }}
          style={{marginTop: 20, height: 500}}
          javaScriptEnabled={true}
        />
      </Modal>
      <View style={{height: 100}} />
      <Text style={[styles.title, {color: 'white'}]}>Settings</Text>
      <View style={[styles.itemRow, {marginTop: 20}]}>
        <View>
          <Text style={{color: 'white', fontSize: 16}}>
            Allow Push Notifications
          </Text>
        </View>
        <View>
          {/* <Text>Toggle</Text> */}
          <Switch onValueChange={this.toggleSwitch} value={switchValue} />
        </View>
      </View>
      <View
        style={[
          styles.itemRow,
          {borderBottomColor: '#ccc', borderBottomWidth: 1, marginBottom: 40},
        ]}>
        <View>
          <Text style={{color: 'white', fontSize: 16}}>Waiver</Text>
        </View>
        <View>
          <Text
            style={
              signedValue
                ? [settingsStyles.signedTextStyle]
                : [settingsStyles.unSignedTextStyle]
            }>
            {signedValue ? 'Signed' : 'Unsigned'}
          </Text>
        </View>
      </View>
      <View style={[styles.form, settingsStyles.marginBottom]}>
        <Text style={[styles.subtitle, {color: 'white'}]}>Profile Detail</Text>

        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={[styles.section, {flex: 1, marginRight: 5}]}>
            <Input
              placeholder="First Name"
              label="First Name"
              value={userData.first_name}
              onChangeText={first_name =>
                updateUserData({...userData, first_name})
              }
            />
          </View>

          <View style={[styles.section, {flex: 1, marginLeft: 5}]}>
            <Input
              placeholder="Last Name"
              label="Last Name"
              value={userData.last_name}
              onChangeText={last_name =>
                updateUserData({...userData, last_name})
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Input
            placeholder="user@email.com"
            label="Email"
            value={userData.email}
            onChangeText={email => updateUserData({...userData, email})}
          />
        </View>

        <View style={styles.section}>
          <Input
            placeholder="Phone Number"
            label="Phone"
            value={userData.phone}
            onChangeText={phone => updateUserData({...userData, phone})}
          />
        </View>

        {!loading ? (
          <Button onPress={() => updateUser()}>Save Changes</Button>
        ) : (
          <Loading size={'large'} />
        )}
      </View>
      <View style={[styles.form, settingsStyles.marginBottom]}>
        <Text style={[styles.subtitle, {color: 'white'}]}>Change Password</Text>

        <View style={styles.section}>
          <Input
            secureTextEntry
            placeholder=""
            label="Current Password"
            value={passwordData.password}
            onChangeText={password =>
              updatePasswordData({...passwordData, password})
            }
          />
        </View>

        <View style={styles.section}>
          <Input
            secureTextEntry
            placeholder=""
            label="Password"
            value={passwordData.new_password}
            onChangeText={new_password =>
              updatePasswordData({...passwordData, new_password})
            }
          />
        </View>

        <View style={styles.section}>
          <Input
            secureTextEntry
            placeholder=""
            label="Confirm Password"
            value={passwordData.new_password_confirmation}
            onChangeText={new_password_confirmation =>
              updatePasswordData({...passwordData, new_password_confirmation})
            }
          />
        </View>

        {!loading ? (
          <Button onPress={() => updatePassword()}>Change Password</Button>
        ) : (
          <Loading size={'large'} />
        )}
      </View>

      <Button onPress={() => logOut()}>Logout</Button>
      <View style={{height: 100}} />
    </ScrollView>
  );
};

const settingsStyles = StyleSheet.create({
  marginBottom: {
    marginBottom: 50,
  },
  signedTextStyle: {
    color: '#0CFF00',
    fontSize: 18,
  },
  unSignedTextStyle: {
    color: '#FF0000',
    fontSize: 18,
  },
});

const mapState = state => ({
  user: state.user,
});

const mapDispatch = dispatch => ({
  update: userProps => dispatch.user.update(userProps),
});

export default connect(mapState, mapDispatch)(Settings);
