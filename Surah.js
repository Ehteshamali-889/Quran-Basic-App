import { View, Text,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import FirstSurah from './FirstSurah';
const Surah = () => {
  
  return (
    <View style={{marginLeft:10,marginRight:10,marginTop:20}}>
      <View style={{display:'flex',justifyContent:'center',alignItems:'center',borderRadius:10,backgroundColor:'#5FACCE'}}>
        <Text style={{fontSize:24,color:'white',marginTop:10}}>Al-Fatiah</Text>
        <View style={{borderBottomWidth:1,borderBottomColor:'white',marginBottom:10,marginTop:10}}>
          <Text style={{color:'white',marginBottom:10,fontSize:16}}>The Opening</Text>
        </View>
        
        <Text style={{color:'white',marginBottom:10}}>MECCAN 7 VERSES</Text>
        <Text style={{color:'white',marginBottom:20,fontSize:30}}>بسم الله الرحمن الرحيم</Text>
      </View>

      <FirstSurah />
    </View>
  )
}

export default Surah