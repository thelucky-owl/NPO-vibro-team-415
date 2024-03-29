import React, { useState, useEffect } from 'react';
import { Button, Platform, Text, Vibration, View, SafeAreaView, StyleSheet, ScrollView, Image } from 'react-native';
import {io, Socket} from "socket.io-client"

// Separator component for platform-specific styling
const Separator = () => {
  return <View style={Platform.OS === 'android' ? styles.separator : null} />;
};

const App = () => {
  // Array of input time ranges
  const inputTimes = [
    //Intro

    ['00:05:300', '00:05:380'],
    // "Let's come together"
    ['00:06:610', '00:06:730'],
    ['00:07:255', '00:07:350'],
    ['00:07:400', '00:07:575'],
    ['00:07:600', '00:08:000'],

    // "It's now or never"
    ['00:11:060', '00:11:250'],
    ['00:11:360', '00:11:550'],
    ['00:11:670', '00:11:820'],
    ['00:11:890', '00:12:040'],
    ['00:12:100', '00:12:500'],

    // "I love you all"
    ['00:13:805', '00:13:880'],
    ['00:13:950', '00:14:000'],
    ['00:14:255', '00:14:330'],
    ['00:14:410', '00:14:610'],

    // Boom
    ['00:17:320', '00:17:390'],
    
    // Beats
    ['00:23:300', '00:23:440'],
    ['00:23:490', '00:23:630'],
    ['00:23:850', '00:23:990'],
    ['00:24:230', '00:24:370'],
    ['00:24:600', '00:24:740'],
    ['00:24:990', '00:25:130'],
    ['00:25:350', '00:25:490'],
    ['00:25:730', '00:25:870'],
    ['00:26:100', '00:26:240'],
    ['00:26:490', '00:26:630'],
    ['00:26:850', '00:26:990'],
    ['00:27:230', '00:27:370'],
    ['00:27:600', '00:27:740'],

    // More Beats
    ['00:29:670', '00:29:710'],
    ['00:30:045', '00:30:085'],
    ['00:30:420', '00:30:460'],
    ['00:30:795', '00:30:835'],
    ['00:31:170', '00:31:210'],
    ['00:31:545', '00:31:585'],

    //fast
    ['00:31:920', '00:31:960'],
    ['00:32:105', '00:32:145'],
    ['00:32:295', '00:32:335'],

    //normal
    ['00:32:670', '00:32:710'],
    ['00:33:045', '00:33:085'],
    ['00:33:420', '00:33:460'],
    ['00:33:795', '00:33:835'],
    ['00:34:170', '00:34:210'],
    ['00:34:545', '00:34:585'],

    //fast
    ['00:34:920', '00:34:960'],
    ['00:35:105', '00:35:145'],
    ['00:35:295', '00:35:335'],

    //normal
    ['00:35:670', '00:35:710'],
    ['00:36:045', '00:36:085'],
    ['00:36:420', '00:36:460'],
    ['00:36:795', '00:36:835'],
    ['00:37:170', '00:37:210'],
    ['00:37:545', '00:37:585'],

    //fast
    ['00:37:920', '00:37:960'],
    ['00:38:105', '00:38:145'],
    ['00:38:295', '00:38:335'],

    //normal
    ['00:38:670', '00:38:710'],
    ['00:39:045', '00:39:085'],
    ['00:39:420', '00:39:460'],
    ['00:39:795', '00:39:835'],
    ['00:40:170', '00:40:210'],
    ['00:40:545', '00:40:585'],

    //fast
    ['00:40:920', '00:40:960'],
    ['00:41:105', '00:41:145'],
    ['00:41:295', '00:41:335'],

    //normal
    ['00:41:670', '00:41:710'],
    ['00:42:045', '00:42:085'],
    ['00:42:420', '00:42:460'],
    ['00:42:795', '00:42:835'],
    ['00:43:170', '00:43:210'],
    ['00:43:545', '00:43:585'],

    //fast
    ['00:43:920', '00:43:960'],
    ['00:44:105', '00:44:145'],
    ['00:44:295', '00:44:335'],

    //normal
    ['00:44:670', '00:44:710'],
    ['00:45:045', '00:45:085'],
    ['00:45:420', '00:45:460'],
    ['00:45:795', '00:45:835'],
    ['00:46:170', '00:46:210'],
    ['00:46:545', '00:46:585'],

    //fast
    ['00:46:920', '00:46:960'],
    ['00:47:105', '00:47:145'],
    ['00:47:295', '00:47:335'],

    // New section
    ['00:48:800', '00:48:840'],

    ['00:49:920', '00:48:970'],
    ['00:50:105', '00:50:145'],
    ['00:50:305', '00:50:305'],
    ['00:50:670', '00:50:710'],
    ['00:50:855', '00:50:895'],
    ['00:51:045', '00:51:085'],

    //30ms
    ['00:51:605', '00:51:635'],
    ['00:51:795', '00:51:825'],

    //40ms
    ['00:52:170', '00:52:210'],
    ['00:52:550', '00:52:590'],

    //Start refrein
    ['00:53:300', '00:53:340'],
    ['00:53:670', '00:53:710'],
    ['00:54:045', '00:54:085'],
    ['00:54:420', '00:54:460'],
    ['00:54:795', '00:54:835'],
    ['00:55:165', '00:55:205'],
    ['00:55:545', '00:55:585'],
    ['00:55:920', '00:55:960'],
    ['00:56:290', '00:56:330'],
    ['00:56:665', '00:56:705'],
    ['00:57:040', '00:57:080'],
    ['00:57:415', '00:57:455'],
    ['00:57:790', '00:57:830'],
    ['00:58:165', '00:58:205'],
    ['00:58:545', '00:58:585'],
    ['00:58:920', '00:58:960'],
    ['00:59:290', '00:59:330'],
    ['00:59:665', '00:59:705'],
    ['01:00:420', '01:00:460'],

    // Continue
  ];

  // State variables
  const [isVibrating, setIsVibrating] = useState(false); // State to track vibration status
  const [timer, setTimer] = useState('00:00:000'); // State for current timer display
  const [startTime, setStartTime] = useState(0); // State to track start time
  const [devButton,setDevButton] = useState(0)
  const socket = io("https://npovibro.webpubsub.azure.com", {
    path: "/clients/socketio/hubs/Hub",
});
socket.on("play",()=>{
  toggleVibrationLoop()
}

)

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
function dev(){
  console.log(devButton)
  if(devButton >14){
    return
  }else{
    setDevButton(devButton+1)
  }
}
  // Render function
  return (
    
    <SafeAreaView style={styles.container}>
      <Image source={require('./assets/icon.png')}
      style={styles.image}
      resizeMode='cover'
      />
      <Image source={require('./assets/europapa-gif.gif')}
      style={styles.image}
      resizeMode='cover'
      />
      <Text style={[styles.header, styles.paragraph]} onPress={dev}>NPO Vibro</Text>
      <View>
        {devButton>14 ? <Button title='send to server' onPress={()=>socket.emit("hey","hey")}></Button>:null}
      </View>
      <Separator />
      <Text style={styles.paragraph}>Current Time: {timer}</Text>
      {/* <Text style={styles.paragraph}>Input Times:</Text> */}
      {/* <ScrollView style={styles.scrollView}>
        {inputTimes.map((timeRange, index) => (
          <Text key={index} style={styles.paragraph}>
            {`Start: ${timeRange[0]}, End: ${timeRange[1]}`}
          </Text>
        ))}
      </ScrollView> */}
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
  image:{
    height:100,
    width:100,
    alignSelf:'center'
  }
});

export default App;