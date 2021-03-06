 import React, { useState, useEffect } from 'react';

import { Platform, Text, View, StyleSheet, Button, TouchableOpacity, Switch } from 'react-native';
import * as Location from 'expo-location';
// used for naviagation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { withSafeAreaInsets } from 'react-native-safe-area-context';




function HomeScreen({navigation}) {
  var latNlon = useCoords();
  // if for error
  if(latNlon.error)
  {
    return latNlon.error;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{latNlon.location}</Text>
      <Button 
        title="Show Altitude"
        onPress={() => navigation.navigate('Altitude')}
        />

      <Button 
        title="Show Weather"
        onPress={() => navigation.navigate('Weather')}
      />
      <Button 
        title="Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      {/* <TouchableOpacity
        onPress={() => alert(`${altitude}`)}
        style={{ backgroundColor: 'blue', borderRadius: 50, overflow: 'hidden', padding: 15 }}>
        <Text style={{ fontSize: 35, color: 'white', textAlign: 'center' }}>Show me my Altitude!</Text>
      </TouchableOpacity> */}
    </View>
    
  );
}

function AltitudeScreen() {
  var alt = useCoords();
  // if for errors
  if(alt.error)
  {
    return alt.error;
  }
  if(alt.loading == true)
  {
    return alt.loading;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{alt.altitude}</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Altitude" component={AltitudeScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


function useCoords()
{
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
    return { error: errorMsg}
  } else if (location) {
    // var CoordArray = [`Your location is 
    // Latitude: ${location.coords.latitude}, 
    // Longitude: ${location.coords.longitude}`, 
    // `Your altitude is: ${(location.coords.altitude * feet).toFixed(2)} feet.`]

    var CoordStuff = { }
    CoordStuff.location = `Your location is 
    Latitude: ${location.coords.latitude}, 
    Longitude: ${location.coords.longitude}`;

    CoordStuff.altitude = `Your altitude is: ${(location.coords.altitude * feet).toFixed(2)} feet.`;
    // text = JSON.stringify(location);
    return  CoordStuff;
  }
  return  {loading: "Loading Screen"};
  
}

function WeatherScreen() {
  const LightOrDark = SettingsScreen();


  return (
    <View style={styles.container}>
        <View>
          <Text style={styles.paragraph}>Weather goes here</Text>
        </View>
    </View>
  );
  
}

function SettingsScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  
  
  if(isEnabled == true)
  {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Light or Dark Mode</Text>
       
        <Switch 
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
          />
        </View>
    );
  }
  else{
    return (
      <View style={styles.container2}>
        <Text style={styles.paragraph2}>Light or Dark Mode</Text>
      
        <Switch 
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
          />
        </View>
    );
  }
}
  


 






const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "black",
  },
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "white",
  },
  paragraph: {
    fontSize: 25,
    textAlign: 'center',
    color: "white",
    margin: 20,
    
  },
  paragraph2: {
    fontSize: 25,
    textAlign: 'center',
    color: "black",
    margin: 20,
    
  },
  button: {
    fontSize: 35,
    backgroundColor: 'blue',
    borderRadius: 50, 
    overflow: 'hidden', 
    padding: 15,
    width: 100,

  }
});

