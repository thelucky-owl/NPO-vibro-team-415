import React, { useState } from 'react';
import { View, Button, TouchableWithoutFeedback, Vibration } from 'react-native';

const VibrationApp = () => {
  const [isPressing, setIsPressing] = useState(false);

  const handlePressIn = () => {
    setIsPressing(true);
    Vibration.vibrate();
  };

  const handlePressOut = () => {
    setIsPressing(false);
    Vibration.cancel();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableWithoutFeedback
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <View
          style={{
            width: 200,
            height: 100,
            backgroundColor: isPressing ? 'green' : 'red',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
          }}
        >
          <Button title="Hold Me" onPress={() => {}} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default VibrationApp;
