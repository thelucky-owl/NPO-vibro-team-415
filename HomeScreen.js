import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation, inputTimes }) => {
  return (
    <View style={styles.container}>
      <Button
        title="With Video Player"
        onPress={() => navigation.navigate('WithVideoPlayer', { inputTimes })}
      />
      <Button
        title="Without Video Player"
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
