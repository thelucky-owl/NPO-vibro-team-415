import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Vibration } from "react-native";
import { Audio, ResizeMode } from "expo-av";
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
            debug: true,
            // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
            source: Europapa,
          }}
        />
        <Button
        title={playState ? "Stop" : "Start"}
        onPress={() => playState ? setPlayState(false) : setPlayState(true)}
      />
      </View>
    );
  };


  return (
    <View style={styles.container}>
      <Video />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    padding: 10,
  },
});
