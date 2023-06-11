import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text,StyleSheet } from 'react-native';
import Sound from 'react-native-sound';

const FirstSurah = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);
  const [four, setFour] = useState(null);
  const [five, setFive] = useState(null);
  const [six, setSix] = useState(null);
  const [seven, setSeven] = useState(null);

  const [currentAudio, setCurrentAudio] = useState(null);


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
    const First = require('./assets/1.mp3');
    const Second = require('./assets/2.mp3');
    const Third = require('./assets/3.mp3');
    const Fourth = require('./assets/4.mp3');
    const Fifth = require('./assets/5.mp3');
    const Sixth = require('./assets/6.mp3');
    const Seventh = require('./assets/7.mp3');

    const firstSound = new Sound(First, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });

    const secondSound = new Sound(Second, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });
    const thirdSound = new Sound(Third, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });
    const fourthSound = new Sound(Fourth, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });
    const fifthSound = new Sound(Fifth, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });
    const sixthSound = new Sound(Sixth, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });
    const seventhSound = new Sound(Seventh, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    });

    setFirst(firstSound);
    setSecond(secondSound);
    setThird(thirdSound);
    setFour(fourthSound);
    setFive(fifthSound);
    setSix(sixthSound);
    setSeven(seventhSound);
  };

  const handle1 = () => {
    if (currentAudio === first) {
      first.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(first);
      if (first && first.isLoaded()) {
        first.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  

  const handle2 = () => {
    if (currentAudio === second) {
      second.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(second);
      if (second && second.isLoaded()) {
        second.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  

  const handle3 = () => {
    if (currentAudio === third) {
      third.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(third);
      if (third && third.isLoaded()) {
        third.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  

  const handle4 = () => {
    if (currentAudio === four) {
      four.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(four);
      if (four && four.isLoaded()) {
        four.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  

  const handle5 = () => {
    if (currentAudio === five) {
      five.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(five);
      if (five && five.isLoaded()) {
        five.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  

  const handle6 = () => {
    if (currentAudio === six) {
      // If the current audio is already playing, pause it
      six.pause();
      setCurrentAudio(null);
    } else {
      // If the current audio is paused or not set, play it
      setCurrentAudio(six);
      if (six && six.isLoaded()) {
        six.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };

  const handle7 = () => {
    if (currentAudio === seven) {
      seven.pause();
      setCurrentAudio(null);
    } else {
      setCurrentAudio(seven);
      if (seven && seven.isLoaded()) {
        seven.play(success => {
          if (success) {
            console.log('Sound played successfully');
          } else {
            console.log('Sound playback failed');
          }
          setCurrentAudio(null);
        });
      }
    }
  };
  
  

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle1}>
                {currentAudio === first ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
                
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>In the name of Allah, the Most Gracious, the Most Merciful.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle2}>
              {currentAudio === second ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>الرَّحْمَٰنِ الرَّحِيمِ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>Praise be to Allah, the Lord of all the worlds.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle3}>
              {currentAudio === third ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>مَالِكِ يَوْمِ الدِّينِ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>Master of the Day of Judgment.</Text>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle4}>
              {currentAudio === four ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>You alone we worship, and You alone we ask for help.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle5}>
              {currentAudio === five ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>Guide us on the Straight Path.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle6}>
              {currentAudio === six ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>the path of those who have received Your grace.</Text>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle7}>
              {currentAudio === seven ? (
                  <Image
                    source={require('./assets/pause-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  ) : (
                    <Image
                    source={require('./assets/play-button.png')}
                    style={{ width: 30, height: 30 }}
                  />
                  )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28,color:'black' }}>غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text style={{color:'black'}}>not the path of those who have brought down wrath upon themselves,</Text>
              <Text style={{color:'black'}}>nor of those who have gone astray.</Text>
            </View>
          </>
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    loadAudioFiles();
  }, []);

  return (
    <View>
      {renderContent()}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
      {currentPage > 1 && (
          <TouchableOpacity onPress={handlePreviousPage} style={styles.nextButton}>
            <Text style={styles.buttonText}>{'Back'}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.currentPageText}>{currentPage}</Text>
        {currentPage < 3 && (
          <TouchableOpacity onPress={handleNextPage} style={styles.nextButton}>
            <Text style={styles.buttonText}>{'Next'}</Text>
          </TouchableOpacity>

        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  nextButton: {
    backgroundColor: '#5FACCE',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  currentPageText: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#5FACCE',
    borderRadius: 20,
    color: 'white',
    marginHorizontal: 10,
    overflow: 'hidden',
  },
});

export default FirstSurah;
