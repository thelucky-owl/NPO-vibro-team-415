import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Vibration, TouchableWithoutFeedback, Dimensions } from "react-native";
import { ResizeMode } from "expo-av";
import VideoPlayer from "expo-video-player";
import * as ScreenOrientation from 'expo-screen-orientation';
import Europapa from "./samples/europapaCroppedAndTrimmed.mp4";

const AppWithVideoPlayer = ({ route }) => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);

    const { inputTimes } = route.params;

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

    const handlePlaybackStatusUpdate = (e) => {
        processedInputTimes.forEach(([startTime, endTime]) => {
            if (e.positionMillis >= startTime && e.positionMillis <= endTime) {
                Vibration.vibrate();
            }
        });
    };

    // Render function
    return (
        <View style={styles.container}>
            <VideoPlayer
                videoProps={{
                    shouldPlay: playState,
                    resizeMode: ResizeMode.CONTAIN,
                    useNativeControls: false,
                    debug: true,
                    source: Europapa,
                    orientation: "landscape", // Force landscape orientation
                }}
                playbackCallback={handlePlaybackStatusUpdate}
                style={styles.videoScreen}
            />
            <TouchableWithoutFeedback onPress={() => setPlayState(!playState)}>
                <View style={styles.buttonContainer}>
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
        flex: 1,
        backgroundColor: "#ecf0f1",
        justifyContent:"center"
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 400,
        backgroundColor: "#FF6D00",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
    },
    videoScreen: {
        width: "500",
    },
});

export default AppWithVideoPlayer;
