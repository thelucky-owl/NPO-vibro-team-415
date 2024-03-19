import React, { useState } from "react";
import { View, StyleSheet, Button, Text, Vibration } from "react-native";
import { Audio, ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";

import Europapa from "./samples/europapaMusicVideo.mp4";

export default function App() {
  // State variables for managing recording, permission response, and sound level
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [soundLevel, setSoundLevel] = useState(null);

  const Video = () => {
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

  // Function to start recording audio
  async function startRecording() {
    try {
      // Request permission if not already granted
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
      // Set audio mode for recording
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create a new recording instance
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HighQuality
      );
      setRecording(recording);

      // Update sound level when recording status changes
      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          setSoundLevel(status.metering + 100); // Adjust sound level for display
          // Vibrate if sound level exceeds a threshold
          if (status.metering + 100 > 30) {
            Vibration.vibrate((Math.floor(status.metering + 100) / 10) * 80);
          }
        }
      });
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  // Function to stop recording audio
  async function stopRecording() {
    // Stop and unload the recording
    await recording.stopAndUnloadAsync();
    setRecording(undefined);
    // Set audio mode to disallow recording
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
  }
  return (
    <View style={styles.container}>
      <Video />
      <Text style={styles.volumeText}>
        {soundLevel !== null
          ? `Sound Level: ${soundLevel}`
          : "Waiting for sound level data..."}
      </Text>
      <Button
        title={recording ? "Stop Recording" : "Start Recording"}
        onPress={recording ? stopRecording : startRecording}
      />
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
  volumeText: {
    marginBottom: 10,
    textAlign: "center",
  },
});
