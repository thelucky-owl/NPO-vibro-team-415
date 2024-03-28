import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Vibration, TouchableWithoutFeedback, Dimensions, Button, Platform, SafeAreaView, ScrollView} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import Europapa from "./samples/europapaMusicVideo.mp4";

export default function App() {
  // Array of input time ranges
  const inputTimes = [
    ['00:00:05:310', '00:00:05:390'],
    ['00:00:17:320', '00:00:17:390'],
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
  const [playState, setPlayState] = useState(false);
  const [isVibrating, setIsVibrating] = useState(false); // State to track vibration status
  const [timer, setTimer] = useState('00:00:00:000'); // State for current timer display
  const [startTime, setStartTime] = useState(0); // State to track start time

  // Effect hook to update timer
  useEffect(() => {
    let intervalId;
    if (isVibrating) {
      startVibrationLoop()
      intervalId = setInterval(() => {
        const elapsedTime = new Date().getTime() - startTime;
        setTimer(formatTime(elapsedTime));
      }, 10);
    } else {
      stopVibrationLoop()
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

  const Video = () => {
    return (
      <View style={styles.container}>
        <VideoPlayer
          videoProps={{
            shouldPlay: playState,
            resizeMode: ResizeMode.COVER,
            useNativeControls: false,
            debug: true,
            source: Europapa,
          }}
        />

      </View>
    );
  };

  // Render function
  return (
    <View style={styles.container}>
      
      <Video style={styles.videoScreen}/>
      <TouchableWithoutFeedback onPress={() => playState ? (setPlayState(false), setIsVibrating(false)) : (setPlayState(true), setIsVibrating(true))}>
      <View style={styles.buttonContainer} >
        <Text style = {styles.buttonText}>
          {playState ? "Stop" : "Start"}
        </Text>
        </View>
        </TouchableWithoutFeedback>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 4,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  videoScreen:{
    width: "100%",
    height: "100%"
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor:"#FF6D00",
    width: "20%",
  },
  buttonText: {
    alignContent: "center",
    color: "white"
  },
  
});
