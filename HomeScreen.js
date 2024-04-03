import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';

const HomeScreen = ({ navigation, inputTimes }) => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

    return (
        <View style={styles.container}>
            <Text>
                Welkom bij de demo van NPO Vibro, ontwikkeld door Team 415. We bieden twee verschillende demo's aan: één met een videospeler en één zonder. De demo met de videospeler maakt het mogelijk om met één druk op de knop zowel de video als het 'vibro track' te starten. Echter, deze ervaring is niet optimaal omdat veel trillingen ontbreken. De andere demo bevat geen video, maar biedt een meer gedetailleerd vibratiepatroon. Als je dit patroon wilt synchroniseren met de muziekvideo van Europapa, moet je de app en de video tegelijkertijd starten.            </Text>
            <Text>
            </Text>
            <Text>
                Het vibratiepatroon eindigt rond 1:25, dus het klopt dat de trillingen midden in het nummer stoppen            </Text>
            <Text>

            </Text>
            <Button
                color="#FF6D00"
                title="Demo met videospeler"
                onPress={() => navigation.navigate('WithVideoPlayer', { inputTimes })}
            />
            <Text>

            </Text>
            <Button
                color="#FF6D00"
                title="Demo zonder videospeler"
                onPress={() => navigation.navigate('WithoutVideoPlayer', { inputTimes })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
