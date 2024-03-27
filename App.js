import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, TouchableWithoutFeedback} from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import Europapa from "./samples/europapaMusicVideo.mp4";

export default function App() {
  // State variables for managing recording, permission response, and sound level
  const [playState, setPlayState] = useState(false);


  const Video = () => {
    return (
      <View style={styles.container}>
        <VideoPlayer
          videoProps={{
            shouldPlay: playState,
            resizeMode: ResizeMode.CONTAIN,
            useNativeControls: true,
            debug: true,
            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: Europapa,
          }}
        />

      </View>
    );
  };


  return (
    <View style={styles.container}>
      
      <Video style={styles.videoScreen}/>
      <TouchableWithoutFeedback onPress={() => playState ? setPlayState(false) : setPlayState(true)}>
      <View style={styles.buttonContainer} >
        <Text style = {styles.buttonText}>
          {playState ? "Stop" : "Start"}
        </Text>
        </View>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
  videoScreen:{
    width: "100%",
    height: "80%"
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
