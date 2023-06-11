import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const SplashScreenComponent = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./splash.jpg')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default SplashScreenComponent;
