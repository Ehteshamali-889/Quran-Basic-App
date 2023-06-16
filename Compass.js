import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid } from 'react-native';
import { Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const Compass = () => {
  const [rotation, setRotation] = useState(0);
  const [qiblaAngle, setQiblaAngle] = useState(0);

  useEffect(() => {
    const getQiblaAngle = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Location permission granted
            Geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude } = position.coords;
                const qiblaDirection = getQiblaDirection(latitude, longitude);
                const angle = calculateAngle(rotation, qiblaDirection);
                setQiblaAngle(angle);
              },
              (error) => {
                console.log('Error getting current position:', error);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          } else {
            console.log('Location permission denied');
          }
        } else {
          // For iOS, you can use the requestAuthorization method if needed
          // ...
        }
      } catch (error) {
        console.log('Error requesting location permission:', error);
      }
    };

    getQiblaAngle();
  }, []);

  const calculateAngle = (currentRotation, qiblaDirection) => {
    let angle = currentRotation - qiblaDirection;
    if (angle < 0) {
      angle += 360;
    }
    return angle;
  };

  const getQiblaDirection = (latitude, longitude) => {
    const MakkahLatitude = 21.4225;
    const MakkahLongitude = 39.8262;

    const longitudeDifference = MakkahLongitude - longitude;
    const y = Math.sin(longitudeDifference * (Math.PI / 180));
    const x =
      Math.cos(latitude * (Math.PI / 180)) * Math.tan(MakkahLatitude * (Math.PI / 180)) -
      Math.sin(latitude * (Math.PI / 180)) * Math.cos(longitudeDifference * (Math.PI / 180));

    let qiblaDirection = Math.atan2(y, x) * (180 / Math.PI);
    if (qiblaDirection < 0) {
      qiblaDirection += 360;
    }

    return qiblaDirection;
  };

  const handleRotationChange = (event) => {
    const { rotation } = event.nativeEvent;
    setRotation(rotation >= 0 ? rotation : 360 + rotation);
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
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  compassContainer: {
    width: '80%',
    height: '80%',
    position: 'relative',
  },
  compassImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  needle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 10,
    height: '40%',
    backgroundColor: 'red',
    transformOrigin: 'bottom center',
  },
  markerImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginTop: -10, // Half the height of the marker icon
  },
  angleText: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Compass;
