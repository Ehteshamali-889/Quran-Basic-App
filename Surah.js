import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import Sound from 'react-native-sound';
import First from './assets/1.mp3';
import Second from './assets/2.mp3';
import FirstSurah from './FirstSurah';
const Surah = () => {
  const first = new Sound(First, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Error loading sound: ', error);
    }
  });

  const second = new Sound(Second, Sound.MAIN_BUNDLE, error => {
    if (error) {
      console.log('Error loading sound: ', error);
    }
  });
  
  const handleImageClick = () => {
    first.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Sound playback failed');
      }
    });
    
  };

  const handleImageClickSecond = () => {
    second.play(success => {
      if (success) {
        console.log('Sound played successfully');
      } else {
        console.log('Sound playback failed');
      }
    });
    
  };
  return (
    <View style={{marginLeft:10,marginRight:10,marginTop:20}}>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:'#5FACCE'}}>
        <Text style={{fontSize:24,color:'white',marginTop:10}}>Al-Fatiah</Text>
        <View style={{borderBottomWidth:1,borderBottomColor:'white',marginBottom:10,marginTop:10}}>
          <Text style={{color:'white',marginBottom:10,fontSize:16}}>The Opening</Text>
        </View>
        
        <Text style={{color:'white',marginBottom:10}}>MECCAN 7 VERSES</Text>
        <Text style={{color:'white',marginBottom:20,fontSize:36}}>بسم الله الرحمن الرحيم</Text>
      </View>

      {/* <View style={{marginTop:20}}>
        <TouchableOpacity onPress={handleImageClick}>
          <Image source = {require('./assets/play-button.png')} style={{width:30,height:30}} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize:28}}>الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ</Text>
      </View>

      <View style={{marginTop:20}}>
        <Text>In the name of Allah, the Most Gracious, the Most Merciful.</Text>
      </View>


      <View style={{marginTop:20}}>
        <TouchableOpacity onPress={handleImageClickSecond}>
          <Image source = {require('./assets/play-button.png')} style={{width:30,height:30}} />
        </TouchableOpacity>
      </View>

      <View>
        <Text style={{fontSize:28}}>الرَّحْمَٰنِ الرَّحِيمِ</Text>
      </View>

      <View style={{marginTop:20}}>
        <Text>Praise be to Allah, the Lord of all the worlds.</Text>
      </View> */}
      <FirstSurah />
    </View>
  )
}

export default Surah