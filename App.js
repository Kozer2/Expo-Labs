import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const feet = 3.28084;

   // TODO:
   // Write a function that uses Location.watchPositionAsync() to allow the user to set a loction using either longitiude
   // and latitude or a city street name, to be refreshed every 5mins.
  useEffect(() => {
    (async () => {
      if (Platform.OS === 'android' && !Constants.isDevice) {
        setErrorMsg(
          'Oops, this will not work on Snack in an Android emulator. Try it on your device!'
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    // text = JSON.stringify(location);
     text = `Your location is latitude: ${location.coords.latitude}, longitude: ${location.coords.longitude} `
     var altitude = `Your altitude is: ${(location.coords.altitude * feet).toFixed(2)} feet.`
    
      
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity
        onPress={() => alert(`${altitude}`)}
        style={{ backgroundColor: 'blue', borderRadius: 50, overflow: 'hidden', padding: 15 }}>
        <Text style={{ fontSize: 35, color: 'white', textAlign: 'center' }}>Show me my Altitude!</Text>
      </TouchableOpacity>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "black",

  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
    color: "white",
    margin: 20,
    
  },
  button: {
    fontSize: 35,

  }
});

