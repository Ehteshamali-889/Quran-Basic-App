import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const QiblaCompass = () => {
  const [rotation, setRotation] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      findQiblaDirection();
    }
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'Qibla Compass needs access to your location.',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        findQiblaDirection();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const findQiblaDirection = () => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        const qiblaDirection = getQiblaDirection(latitude, longitude);
        setRotation(qiblaDirection);
        setQiblaAngle(qiblaDirection);
      },
      error => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getQiblaDirection = (latitude, longitude) => {
    const kaabaLatitude = 21.4225;
    const kaabaLongitude = 39.8262;

    const phiK = (kaabaLatitude * Math.PI) / 180.0;
    const lambdaK = (kaabaLongitude * Math.PI) / 180.0;
    const phi = (latitude * Math.PI) / 180.0;
    const lambda = (longitude * Math.PI) / 180.0;

    const y = Math.sin(lambdaK - lambda);
    const x = Math.cos(phi) * Math.tan(phiK) - Math.sin(phi) * Math.cos(lambdaK - lambda);

    const qiblaDirection = Math.atan2(y, x) * (180.0 / Math.PI);
    return qiblaDirection >= 0 ? qiblaDirection : qiblaDirection + 360;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>Qibla Direction</Text>
      <View style={styles.compassContainer}>
        <Image source={require('./assets/compass.png')} resizeMode="contain" style={styles.compassImage} />
        <View style={[styles.needle, { transform: [{ rotate: `${rotation}deg` }] }]}>
          <Image source={require('./assets/kaaba.png')} style={styles.markerImage} />
        </View>
      </View>
      <Text style={styles.angleText}>Qibla Angle: {qiblaAngle.toFixed(2)}°</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  compassContainer: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compassImage: {
    width: '100%',
    height: '100%',
  },
  needle: {
    position: 'absolute',
    width: 20,
    height: 250,
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: -125,
  },
  markerImage: {
    width: 40,
    height: 40,
  },
  angleText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default QiblaCompass;
