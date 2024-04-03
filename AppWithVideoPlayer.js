import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, TouchableWithoutFeedback } from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import Europapa from "./samples/europapaCroppedAndTrimmed.mp4";

const AppWithVideoPlayer = ({ inputTimes }) => {
  // State variables
  const [playState, setPlayState] = useState(false);

  // Function to parse time string into milliseconds
  const parseTime = (timeString) => {
    const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
    return minutes * 60000 + seconds * 1000 + milliseconds;
  };

  // Preprocess inputTimes array to convert time strings to milliseconds
  const processedInputTimes = inputTimes.map(([startTime, endTime]) => [
    parseTime(startTime),
    parseTime(endTime)
  ]);

  const Video = () => {
    const handlePlaybackStatusUpdate = (e) => {
      processedInputTimes.forEach(([startTime, endTime]) => {
        if (e.positionMillis >= startTime && e.positionMillis <= endTime) {
          Vibration.vibrate();
        }
      });
      console.log(e.positionMillis);
    };
  
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
          playbackCallback={handlePlaybackStatusUpdate} // Pass the function directly
        />
      </View>
    );
  };

  // Render function
  return (
    <View style={styles.container}>

      <Video style={styles.videoScreen} />
      <TouchableWithoutFeedback onPress={() => playState ? setPlayState(false) : setPlayState(true)}>
        <View style={styles.buttonContainer} >
          <Text style={styles.buttonText}>
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
  videoScreen: {
    width: "100%",
    height: "100%"
  },

  buttonContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6D00",
    width: "20%",
  },
  buttonText: {
    alignContent: "center",
    color: "white"
  },

});

export default AppWithVideoPlayer;