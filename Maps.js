import React, { useEffect, useState } from 'react';
import { StyleSheet, View, PermissionsAndroid, Image, Modal, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const CustomMarker = ({ coordinate, image, name, distance, onPress }) => {
  return (
    <Marker coordinate={coordinate} onPress={onPress}>
      <Image source={image} style={styles.markerIcon} />
    </Marker>
  );
};

const MosqueModal = ({ visible, onClose, name, distance, jummahTiming, zuhrTiming }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{name}</Text>
          {distance && <Text style={styles.modalText}>Distance: {(distance / 1000).toFixed(2)} km</Text>}
          <Text style={styles.modalText}>Jummah Timing: {jummahTiming}</Text>
          <Text style={styles.modalText}>Zuhr Timing: {zuhrTiming}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const Maps = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyMosques, setNearbyMosques] = useState([]);
  const [selectedMosque, setSelectedMosque] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location.',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        getNearbyMosques(latitude, longitude);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const getJummahTiming = async (latitude, longitude) => {
    const url = `http://api.aladhan.com/v1/timingsByCoordinates?latitude=${latitude}&longitude=${longitude}&method=2&date=${new Date().toISOString().split('T')[0]}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const timings = data.data.timings;
  
      if (timings && timings.Jummah) {
        return {
          jummahTiming: timings.Jummah,
          zuhrTiming: timings.Dhuhr,
        };
      } else {
        return {
          jummahTiming: 'Not available',
          zuhrTiming: timings && timings.Dhuhr ? timings.Dhuhr : 'Not available',
        };
      }
    } catch (error) {
      console.log('Error fetching Jummah and Zuhr timings:', error);
      return {
        jummahTiming: 'Not available',
        zuhrTiming: 'Not available',
      };
    }
  };
  
  
  

  const getNearbyMosques = async (latitude, longitude) => {
    const apiKey = 'AIzaSyBkZD_cnR-XhqYKYV3ng4j0l29IAPjoQmQ'; // Replace with your Google Places API key
    const radius = 5000;
    const type = 'mosque';
  
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`
      );
      const data = await response.json();
  
      const mosques = await Promise.all(
        data.results.map(async (mosque) => {
          const { lat, lng } = mosque.geometry.location;
          const distance = calculateDistance(latitude, longitude, lat, lng);
          const timings = await getJummahTiming(lat, lng);
  
          return {
            id: mosque.id,
            name: mosque.name,
            distance,
            jummahTiming: timings.jummahTiming,
            zuhrTiming: timings.zuhrTiming,
            coordinate: {
              latitude: lat,
              longitude: lng,
            },
          };
        })
      );
  
      setNearbyMosques(mosques);
    } catch (error) {
      console.log('Error fetching nearby mosques:', error);
    }
  };
  

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c * 1000; // Distance in meters
    return distance;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const handleMarkerPress = (mosque) => {
    setSelectedMosque(mosque);
  };

  const handleCloseModal = () => {
    setSelectedMosque(null);
  };

  return (
    <>
      {currentLocation && (
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.009, // Adjust this value for desired zoom level
              longitudeDelta: 0.009, // Adjust this value for desired zoom level
            }}
          >
            {nearbyMosques.map((mosque) => (
              <CustomMarker
                key={mosque.id}
                coordinate={{
                  latitude: mosque.coordinate.latitude,
                  longitude: mosque.coordinate.longitude,
                }}
                image={require('./assets/nabawi-mosque.png')} // Replace with the path to your custom mosque icon image
                name={mosque.name}
                distance={mosque.distance}
                onPress={() => handleMarkerPress(mosque)}
              />
            ))}
          </MapView>
          {selectedMosque && (
            <MosqueModal
              visible={selectedMosque !== null}
              onClose={handleCloseModal}
              name={selectedMosque.name}
              distance={selectedMosque.distance}
              jummahTiming={selectedMosque.jummahTiming}
              zuhrTiming={selectedMosque.zuhrTiming}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerIcon: {
    width: 30,
    height: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Maps;
