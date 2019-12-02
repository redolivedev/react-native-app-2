import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';

function getTime(start) {
  const startDate = new Date(start);
  const now = new Date();
  const difference = startDate - now;
  return Math.floor(difference / 1000);
}

function pad(num) {
  return ('0' + num).slice(-2);
}

function hhmmss(secs) {
  var minutes = Math.floor(secs / 60);
  secs = secs % 60;
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}

const SessionAlert = ({startTime}) => {
  const [time, setTime] = useState(getTime(startTime));

  useEffect(() => {
    let interval = null;
    if (time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [time]);

  if (time < 1) {
    return null;
  }

  return (
    <View style={{alignItems: 'center', backgroundColor: '#333', padding: 15}}>
      <Text style={{color: '#ccc'}}>
        Your session starts in {hhmmss(time)}. Make sure to check in
      </Text>
    </View>
  );
};

export default SessionAlert;
