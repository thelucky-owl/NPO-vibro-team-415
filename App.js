import React, { useState, useEffect } from 'react';
import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';

// Separator component for platform-specific styling
const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const App = () => {
  // Array of input time ranges
  const inputTimes = [
    //Intro
    ['00:00:05:300', '00:00:05:380'],
    // "Let's come together"
    ['00:00:06:610', '00:00:06:730'],
    ['00:00:07:255', '00:00:07:350'],
    ['00:00:07:400', '00:00:07:575'],
    ['00:00:07:600', '00:00:08:000'],

    // "It's now or never"
    ['00:00:11:060', '00:00:11:250'],
    ['00:00:11:360', '00:00:11:550'],
    ['00:00:11:670', '00:00:11:820'],
    ['00:00:11:890', '00:00:12:040'],
    ['00:00:12:100', '00:00:12:500'],

    // "I love you all"
    ['00:00:13:805', '00:00:13:880'],
    ['00:00:13:950', '00:00:14:000'],
    ['00:00:14:255', '00:00:14:330'],
    ['00:00:14:410', '00:00:14:610'],

    // Boom
    ['00:00:17:320', '00:00:17:390'],

    // Beats
    ['00:00:23:300', '00:00:23:440'],
    ['00:00:23:490', '00:00:23:630'],
    ['00:00:23:850', '00:00:23:990'],
    ['00:00:24:230', '00:00:24:370'],
    ['00:00:24:600', '00:00:24:740'],
    ['00:00:24:990', '00:00:25:130'],
    ['00:00:25:350', '00:00:25:490'],
    ['00:00:25:730', '00:00:25:870'],
    ['00:00:26:100', '00:00:26:240'],
    ['00:00:26:490', '00:00:26:630'],
    ['00:00:26:850', '00:00:26:990'],
    ['00:00:27:230', '00:00:27:370'],
    ['00:00:27:600', '00:00:27:740'],

    // More Beats
    ['00:00:29:690', '00:00:29:730'],
    ['00:00:30:060', '00:00:30:100'],
    ['00:00:30:440', '00:00:30:480'],
    ['00:00:30:800', '00:00:30:840'],
    ['00:00:31:190', '00:00:31:230'],
    ['00:00:31:560', '00:00:31:600'],
    ['00:00:31:940', '00:00:31:980'],
    ['00:00:32:130', '00:00:32:170'],
    ['00:00:32:315', '00:00:32:355'],
    ['00:00:32:690', '00:00:32:730'],
    ['00:00:33:060', '00:00:33:100'],
    ['00:00:33:440', '00:00:33:480'],
    ['00:00:33:800', '00:00:33:840'],
    ['00:00:34:190', '00:00:34:230'],
    ['00:00:34:560', '00:00:34:600'],
    ['00:00:34:940', '00:00:34:980'],
    ['00:00:35:130', '00:00:35:170'],
    ['00:00:35:315', '00:00:35:355'],
    ['00:00:35:690', '00:00:35:730'],
    ['00:00:36:060', '00:00:36:100'],
    ['00:00:36:440', '00:00:36:480'],
    ['00:00:36:800', '00:00:36:840'],
    ['00:00:37:190', '00:00:37:230'],
    ['00:00:37:560', '00:00:37:600'],
    ['00:00:37:940', '00:00:37:980'],
    ['00:00:38:130', '00:00:38:170'],
    ['00:00:38:315', '00:00:38:355'],
    ['00:00:38:690', '00:00:38:730'],
    ['00:00:39:060', '00:00:39:100'],
    ['00:00:39:440', '00:00:39:480'],
    ['00:00:39:800', '00:00:39:840'],
    ['00:00:40:190', '00:00:40:230'],
    ['00:00:40:560', '00:00:40:600'],
    ['00:00:40:940', '00:00:40:980'],
    ['00:00:41:130', '00:00:41:170'],
    ['00:00:41:315', '00:00:41:355'],
    ['00:00:41:690', '00:00:41:730'],
    ['00:00:42:060', '00:00:42:100'],
    ['00:00:42:440', '00:00:42:480'],
    ['00:00:42:800', '00:00:42:840'],
    ['00:00:43:190', '00:00:43:230'],
    ['00:00:43:560', '00:00:43:600'],
    ['00:00:43:940', '00:00:43:980'],
    ['00:00:44:130', '00:00:44:170'],
    ['00:00:44:315', '00:00:44:355'],
    ['00:00:44:690', '00:00:44:730'],
    ['00:00:45:060', '00:00:45:100'],
    ['00:00:45:440', '00:00:45:480'],
    ['00:00:45:800', '00:00:45:840'],
    ['00:00:46:190', '00:00:46:230'],
    ['00:00:46:560', '00:00:46:600'],
    ['00:00:46:940', '00:00:46:980'],
    ['00:00:47:130', '00:00:47:170'],
    ['00:00:47:315', '00:00:47:355'],
    // New section
    ['00:00:48:800', '00:00:48:840'],
    //30ms instead of 40
    ['00:00:49:940', '00:00:48:970'],
    ['00:00:50:130', '00:00:50:160'],
    ['00:00:50:315', '00:00:50:345'],

    ['00:00:50:890', '00:00:50:920'],
    ['00:00:51:065', '00:00:51:065'],

    //really short
    ['00:00:51:625', '00:00:51:645'],
    ['00:00:51:825', '00:00:51:845'],

    //30ms
    ['00:00:52:190', '00:00:52:220'],
    ['00:00:52:570', '00:00:52:600'],
  ];

  // State variables
  const [isVibrating, setIsVibrating] = useState(false); // State to track vibration status
  const [timer, setTimer] = useState('00:00:00:000'); // State for current timer display
  const [startTime, setStartTime] = useState(0); // State to track start time

  // Effect hook to update timer
  useEffect(() => {
    let intervalId;
    if (isVibrating) {
      intervalId = setInterval(() => {
        const elapsedTime = new Date().getTime() - startTime;
        setTimer(formatTime(elapsedTime));
      }, 10);
    } else {
      setTimer('00:00:00:000');
    }

    return () => clearInterval(intervalId);
  }, [isVibrating, startTime]);

  // Function to start vibration loop
  const startVibrationLoop = () => {
    setIsVibrating(true);
    setStartTime(new Date().getTime());
  };

  // Function to stop vibration loop
  const stopVibrationLoop = () => {
    setIsVibrating(false);
    Vibration.cancel();
  };

  // Effect hook to handle vibration
  useEffect(() => {
    if (isVibrating) {
      const currentTime = parseTime(timer);
      inputTimes.forEach((timeRange) => {
        const startTime = parseTime(timeRange[0]);
        const endTime = parseTime(timeRange[1]);
        if (currentTime >= startTime && currentTime <= endTime) {
          Vibration.vibrate();
        }
      });
    }
  }, [isVibrating, timer]);

  // Function to parse time string into milliseconds
  const parseTime = (timeString) => {
    const [hours, minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  };

  // Function to format milliseconds into time string
  const formatTime = (time) => {
    const pad = (num) => num.toString().padStart(2, '0');
    const hours = Math.floor(time / 3600000);
    time %= 3600000;
    const minutes = Math.floor(time / 60000);
    time %= 60000;
    const seconds = Math.floor(time / 1000);
    const milliseconds = time % 1000;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${milliseconds.toString().padStart(3, '0')}`;
  };

  // Render function
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.header, styles.paragraph]}>NPO Vibro</Text>
      <View>
        <Button color="#FF6D00" title="Start Vibration Pattern" onPress={startVibrationLoop} disabled={isVibrating} />
        <Button color="#FF6D00" title="Stop Vibration" onPress={stopVibrationLoop} disabled={!isVibrating} />
      </View>
      <Separator />
      <Text style={styles.paragraph}>Current Time: {timer}</Text>
      <Text style={styles.paragraph}>Input Times:</Text>
      <ScrollView style={styles.scrollView}>
        {inputTimes.map((timeRange, index) => (
          <Text key={index} style={styles.paragraph}>
            {`Start: ${timeRange[0]}, End: ${timeRange[1]}`}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 44,
    padding: 8,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  paragraph: {
    margin: 12,
    textAlign: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  scrollView: {
    maxHeight: 300, // Set the max height as needed
  },
});

export default App;