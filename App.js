import React, { useState } from 'react';
import { View, StyleSheet, Button, Text, Vibration} from 'react-native';
import { Audio } from 'expo-av';

export default function App() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [soundLevel, setSoundLevel] = useState(null);

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HighQuality
      );
      setRecording(recording);

      recording.setOnRecordingStatusUpdate((status) => {
        if (status.isRecording) {
          // console.log(status)
          setSoundLevel(status.metering + 100);
           if ((status.metering + 100) > 30) {
            Vibration.vibrate((Math.floor((status.metering) + 100) / 10) * 80)
           };
        }
      });

      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    await recording.stopAndUnloadAsync()
    setRecording(undefined);
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.volumeText}>
        {soundLevel !== null ? `Sound Level: ${soundLevel}` : 'Waiting for sound level data...'}
      </Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
  volumeText: {
    marginBottom: 10,
    textAlign: 'center',
  },
});
