import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';
import Orientation from 'react-native-orientation-locker';

const LiveStream = () => {
  const [isLandscape, setIsLandscape] = useState(false);

  const toggleOrientation = () => {
    if (isLandscape) {
      Orientation.lockToPortrait(); // Lock the orientation to portrait mode
    } else {
      Orientation.lockToLandscape(); // Lock the orientation to landscape mode
    }
    setIsLandscape(!isLandscape);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isLandscape ? 'Switch to Portrait' : 'Switch to Landscape'}
        onPress={toggleOrientation}
      />
      <WebView
        source={{ uri: 'https://www.youtube.com/embed/qK-zm6rcYmA' }} // Replace with your actual YouTube live stream URL
        style={styles.video}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
});

export default LiveStream;
