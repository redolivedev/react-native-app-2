import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import moment from 'moment';

const Timer = ({secs, num, active, handleComplete}) => {
  const [seconds, setSeconds] = useState(secs);
  const [percent, setPercent] = useState(100);

  useEffect(() => {
    let interval = null;
    if (active && seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        setPercent((seconds / secs) * 100);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    if (seconds < 1) {
      handleComplete(true);
    }
    return () => clearInterval(interval);
  }, [active, seconds, percent, secs, handleComplete]);

  function pad(num) {
    return ('0' + num).slice(-2);
  }
  function hhmmss(secs) {
    let minutes = Math.floor(secs / 60);
    secs = secs % 60;
    let hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }

  return (
    <View
      style={{flexDirection: 'row', alignItems: 'center', marginBottom: 12}}>
      <ProgressCircle
        percent={percent}
        radius={15}
        borderWidth={5}
        color="#ccc"
        shadowColor="#999"
        bgColor="white">
        <Text style={{fontSize: 12}}>{num}</Text>
      </ProgressCircle>
      <Text style={{color: '#ccc', marginLeft: 10}}>{hhmmss(seconds)}</Text>
    </View>
  );
};

export default Timer;
