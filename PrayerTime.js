import React, { useEffect, useState } from 'react';
import { View, Text, PermissionsAndroid, ActivityIndicator, StyleSheet } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const PrayerTime = () => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPrayerTimes = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              fetchPrayerTimes(latitude, longitude);
              fetchLocation(latitude, longitude);
            },
            (error) => {
              console.log('Error getting current position:', error);
              setIsLoading(false);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.log('Location permission denied');
          setIsLoading(false);
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
        setIsLoading(false);
      }
    };

    getPrayerTimes();
  }, []);

  const fetchPrayerTimes = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`,
      );

      if (response.ok) {
        const data = await response.json();
        const prayerTimes = data.data[0].timings;
        setPrayerTimes(prayerTimes);
      } else {
        console.log('Error fetching prayer times');
      }
    } catch (error) {
      console.log('Error fetching prayer times:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLocation = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://geocode.xyz/${latitude},${longitude}?json=1`,
      );

      if (response.ok) {
        const data = await response.json();
        const { city, country } = data;
        setLocation(`${city}, ${country}`);
      } else {
        console.log('Error fetching location');
      }
    } catch (error) {
      console.log('Error fetching location:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (prayerTimes === null || location === null) {
    return (
      <View style={styles.container}>
        <Text style={{color:'black'}}>Loading prayer times and location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.locationContainer}>
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.tableContainer}>
        <View style={styles.tableRow}>
          <Text style={styles.tableHeader}>Prayer</Text>
          <Text style={styles.tableHeader}>Time</Text>
        </View>
        {Object.entries(prayerTimes).map(([prayer, time]) => {
        if (prayer === 'Firstthird' || prayer === 'Lastthird' || prayer === 'Imsak') {
          return null; // Skip rendering these prayers
        }
        return (
          <View key={prayer} style={styles.tableRow}>
            <Text style={styles.tableCell}>{prayer}</Text>
            <Text style={styles.tableCell}>{time}</Text>
          </View>
        );
      })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContainer: {
    marginBottom: 20,
  },
  locationText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableContainer: {
    backgroundColor: '#ECECEC',
    borderRadius: 8,
    padding: 10,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  tableCell: {
    fontSize: 16,
    flex: 1,
  },
});

export default PrayerTime;
