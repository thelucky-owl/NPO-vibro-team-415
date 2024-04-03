import React, { useState, useEffect } from 'react';
import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

// Separator component for platform-specific styling
const Separator = () => {
    return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const AppWithoutVideoPlayer = ({ route }) => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    const inputTimes = route.params.inputTimes
    // State variables
    const [isVibrating, setIsVibrating] = useState(false); // State to track vibration status
    const [timer, setTimer] = useState('00:00:000'); // State for current timer display
    const [startTime, setStartTime] = useState(0); // State to track start time

    // Function to toggle vibration loop
    const toggleVibrationLoop = () => {
        setIsVibrating(!isVibrating);
        if (!isVibrating) {
            setStartTime(new Date().getTime());
        } else {
            Vibration.cancel();
        }
    };

    // Effect hook to update timer
    useEffect(() => {
        let intervalId;
        if (isVibrating) {
            intervalId = setInterval(() => {
                const elapsedTime = new Date().getTime() - startTime;
                setTimer(formatTime(elapsedTime));
            }, 10);
        } else {
            setTimer('00:00:000');
        }

        return () => clearInterval(intervalId);
    }, [isVibrating, startTime]);

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
            // Stop vibration if timer exceeds the specified limit
            if (timer >= '03:21:570') {
                setIsVibrating(false);
                Vibration.cancel();
            }
        }
    }, [isVibrating, timer, inputTimes]);


    // Function to parse time string into milliseconds
    const parseTime = (timeString) => {
        const [minutes, seconds, milliseconds] = timeString.split(':').map(Number);
        return minutes * 60000 + seconds * 1000 + milliseconds;
    };

    // Function to format milliseconds into time string
    const formatTime = (time) => {
        const pad = (num) => num.toString().padStart(2, '0');
        const minutes = Math.floor(time / 60000);
        time %= 60000;
        const seconds = Math.floor(time / 1000);
        const milliseconds = time % 1000;
        return `${pad(minutes)}:${pad(seconds)}:${milliseconds.toString().padStart(3, '0')}`;
    };

    // Render function
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Button color="#FF6D00" title={isVibrating ? "Stop Vibratie Patroon" : "Start Vibratie Patroon"} onPress={toggleVibrationLoop} />
            </View>
            <Separator />
            <Text style={styles.paragraph}>Huidige tijd: {timer}</Text>
            <Text style={styles.paragraph}>Vibratie tijden:</Text>
            <ScrollView style={styles.scrollView}>
                {inputTimes.map((timeRange, index) => (
                    <Text key={index} style={styles.paragraph}>
                        {`Start: ${timeRange[0]}, Einde: ${timeRange[1]}`}
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

export default AppWithoutVideoPlayer;