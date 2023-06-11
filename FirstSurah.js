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
    
    if (first && first.isLoaded()) {
      first.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle2 = () => {
    
    if (second && second.isLoaded()) {
      second.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle3 = () => {
    
    if (third && third.isLoaded()) {
      third.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle4 = () => {
    
    if (four && four.isLoaded()) {
      four.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle5 = () => {
    
    if (five && five.isLoaded()) {
      five.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle6 = () => {
    
    if (six && six.isLoaded()) {
      six.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };

  const handle7 = () => {
    
    if (seven && seven.isLoaded()) {
      seven.play(success => {
        if (success) {
          console.log('Sound played successfully');
        } else {
          console.log('Sound playback failed');
        }
      });
    }
  
    
  };
  

  const renderContent = () => {
    switch (currentPage) {
      case 1:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle1}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>In the name of Allah, the Most Gracious, the Most Merciful.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle2}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>الرَّحْمَٰنِ الرَّحِيمِ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>Praise be to Allah, the Lord of all the worlds.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle3}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>مَالِكِ يَوْمِ الدِّينِ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>Master of the Day of Judgment.</Text>
            </View>
          </>
        );
      case 2:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle4}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>You alone we worship, and You alone we ask for help.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle5}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>Guide us on the Straight Path.</Text>
            </View>

            <View style={{ marginTop: 40 }}>
              <TouchableOpacity onPress={handle6}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>the path of those who have received Your grace.</Text>
            </View>
          </>
        );
      case 3:
        return (
          <>
            <View style={{ marginTop: 20 }}>
              <TouchableOpacity onPress={handle7}>
                <Image
                  source={require('./assets/play-button.png')}
                  style={{ width: 30, height: 30 }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{ fontSize: 28 }}>غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ</Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <Text>not the path of those who have brought down wrath upon themselves,</Text>
              <Text>nor of those who have gone astray.</Text>
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
