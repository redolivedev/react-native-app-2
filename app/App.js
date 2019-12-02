import React from 'react';
import {Router, Scene, Stack} from 'react-native-router-flux';

import TabIcon from './components/TabIcon';

import Root from './screens/root';
import Registration from './screens/register';
import Login from './screens/login';
import ForgotPassword from './screens/forgot-password';
import ResetPassword from './screens/reset-password';
import Pin from './screens/pin';
import Welcome from './screens/welcome';
import NewSession from './screens/new-session/NewSession';
import PastSessions from './screens/past-sessions/';
import GamePreferences from './screens/new-session/GamePreferences';
import ReservationConfirm from './screens/new-session/ReservationConfirm';
import SessionBooked from './screens/new-session/SessionBooked';
import ChooseTime from './screens/new-session/ChooseTime';
import Settings from './screens/settings';
import Session from './screens/session';

console.disableYellowBox = true;

const App = () => {
  return (
    <Router>
      <Stack key="root">
        <Scene key="root" component={Root} title="Root" hideNavBar initial />
        <Scene
          key="register"
          component={Registration}
          title="Register"
          hideNavBar
        />
        <Scene key="login" component={Login} title="Login" hideNavBar />
        <Scene
          key="forgot"
          component={ForgotPassword}
          title="Forgot Password"
          hideNavBar
        />
        <Scene
          key="resetPassword"
          component={ResetPassword}
          title="Reset Password"
          hideNavBar
        />
        <Scene key="pin" component={Pin} title="Pin" hideNavBar />
        <Stack
          key="dashboard"
          tabs={true}
          tabBarStyle={{backgroundColor: '#333333'}}
          hideNavBar
          activeTintColor="white"
          inactiveTintColor="gray">
          <Stack key="home" icon={TabIcon} iconName="home">
            <Scene
              key="welcome"
              component={Welcome}
              title="Welcome"
              initial
              hideNavBar
            />
            <Scene
              key="pastSessions"
              component={PastSessions}
              title="Past Sessions"
              hideNavBar
            />
            <Scene
              key="currentSession"
              component={Session}
              title="Current Session"
              hideNavBar
            />
          </Stack>
          <Scene
            key="settings"
            component={Settings}
            title="Settings"
            hideNavBar
            icon={TabIcon}
            iconName="user-circle"
          />
        </Stack>
        <Scene
          key="newsession"
          component={NewSession}
          title="Book a Session"
          navigationBarStyle={{backgroundColor: 'red', color: 'white'}}
          titleStyle={{color: 'white'}}
        />
        <Scene
          key="gamepreferences"
          component={GamePreferences}
          title="Game Preferances"
        />
        <Scene key="chooseTime" component={ChooseTime} title="Choose Time" />
        <Scene
          key="reservationconfirm"
          component={ReservationConfirm}
          title="Confirm"
          hideNavBar
        />
        <Scene
          key="booked"
          component={SessionBooked}
          title="Booked"
          hideNavBar
        />
      </Stack>
    </Router>
  );
};

export default App;
