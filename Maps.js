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

const MosqueModal = ({ visible, onClose, name, distance}) => {

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>{name}</Text>
          {distance && <Text style={styles.modalText}>Distance: {(distance / 1000).toFixed(2)} km</Text>}
          
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
          return {
            id: mosque.id,
            name: mosque.name,
            distance,
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
              latitudeDelta: 0.009,
              longitudeDelta: 0.009,
            }}
          >
            {nearbyMosques.map((mosque,index) => (
              <CustomMarker
                key={index}
                coordinate={{
                  latitude: mosque.coordinate.latitude,
                  longitude: mosque.coordinate.longitude,
                }}
                image={require('./assets/nabawi-mosque.png')}
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
              prayerTimings={selectedMosque.prayerTimings}
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
  prayerTable: {
    marginTop: 10,
  },
  prayerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  prayerName: {
    fontWeight: 'bold',
  },
  prayerTime: {
    marginLeft: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  tabButton: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 10,
    backgroundColor: '#eaeaea',
  },
  activeTab: {
    backgroundColor: '#2196F3', // Example active tab color
  },
  tabButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  activeTabText: {
    color: '#fff', // Example active tab text color
  },
});

export default Maps;
