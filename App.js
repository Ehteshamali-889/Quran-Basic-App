import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Surah from './Surah';
import Maps from './Maps';
import Location from './Location';
import PrayerTime from './PrayerTime';
import Compass from './Compass';
import EventCalendar from './EventCalendar';
import LiveStream from './LiveStream';
import AdScreen from './AdScreen';

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}} />
        <Stack.Screen name="Surah" component={Surah} options={{headerShown: false}} />
        <Stack.Screen name="Maps" component={Maps} options={{headerShown: false}} />
        <Stack.Screen name="Location" component={Location} options={{headerShown: false}} />
        <Stack.Screen name="PrayerTime" component={PrayerTime} options={{headerShown: false}} />
        <Stack.Screen name="Compass" component={Compass} options={{headerShown: false}} />
        <Stack.Screen name="EventCalendar" component={EventCalendar} options={{headerShown: false}} />
        <Stack.Screen name="LiveStream" component={LiveStream} options={{headerShown: false}} />
        <Stack.Screen name="AdScreen" component={AdScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App