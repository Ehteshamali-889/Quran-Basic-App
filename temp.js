import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const FirstSurah = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleNextPage = () => {
    if (currentPage < 3) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const loadAudioFiles = async () => {
    try {
      const First = require('./assets/1.mp3');
      const Second = require('./assets/2.mp3');

      const firstSound = new Sound(First, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Error loading sound: ', error);
        } else {
          setLoading(false);
        }
      });

      const secondSound = new Sound(Second, Sound.MAIN_BUNDLE, error => {
        if (error) {
          console.log('Error loading sound: ', error);
        }
      });

      setFirst(firstSound);
      setSecond(secondSound);
    } catch (error) {
      console.log('Error loading audio files: ', error);
    }
  };

  const handleImageClick = (sound) => {
    if (sound && sound.isLoaded()) {
      sound.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  };

  useEffect(() => {
    loadAudioFiles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading audio files...</Text>
      </View>
    );
  }

  return (
    <View>
      {/* Content and rendering logic */}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Rest of your styles
});

export default FirstSurah;
