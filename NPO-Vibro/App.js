import React from "react";
import { View } from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import PiedpiperVid from "./assets/piedpiper.mp4";
import MarkPolVid from "./assets/markpol.mp4";
import Europapa from "./assets/Europapa.mp4"

const App = () => {
  return (
    <View>
      <VideoPlayer
        videoProps={{
          shouldPlay: true,
          resizeMode: ResizeMode.CONTAIN,
          debug: true,
          // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
          source: Europapa,
        }}
      />
    </View>
  );
};

export default App;