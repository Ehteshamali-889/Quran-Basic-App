// App.js

import React, { useEffect, useState } from 'react';
import Quran from './Quran';
import SplashScreenComponent from './SplashScreenComponent';

const Main = () => {
  const [splashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Simulating a delay to display the splash screen
    setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // Set the duration you want for your splash screen
  }, []);

  return splashVisible ? <SplashScreenComponent /> : <Quran />;
};

export default Main;
