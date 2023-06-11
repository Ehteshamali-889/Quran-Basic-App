import { View, Text, Image,StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
const Quran = () => {
    const navigation = useNavigation();
    const handlePress = () => {
        // Handle the click event here
        navigation.navigate('Surah')
      };
      
  return (
    <View style={{marginLeft:20}}>
        <View style={{marginTop:20}}>
            <Text style={{fontSize:18,color:'black'}}>Assalamualaikum</Text>
            <Text style={{fontSize:36,fontWeight:'bold',color:'#5FACCE'}}>Ehtesham Ali</Text>
        </View>
        <View style={{marginTop:20,borderRadius:10,backgroundColor:'#5FACCE',marginRight:20,padding:20}}>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                <View>
                    <View style={{display:'flex',flexDirection:'row',marginTop:40}}>
                        <Image source = {require('./assets/open-book-1.png')} />
                        <Text style={{fontSize:16,marginLeft:10,color:'white',fontWeight:400}}>Last Read</Text>
                    </View>
                    <View style={{marginTop:20}}>
                    <Text style={{fontSize:28,fontWeight:'bold',color:'white'}}>Al Fatiah</Text>
                    <Text style={{fontSize:16,color:'white',fontWeight:300,marginTop:10}}>Ayah No. 1</Text>
                    </View>
                </View>
            
                <View style={{marginLeft:0}}>
                    <Image source = {require('./assets/man.png')} style={{resizeMode: 'contain',width:200,height:180}} />
                </View>
            </View>
            
        </View>

        <View style={{marginTop:40,marginRight:10}}>
            <View style={{marginRight:10}}>
                <TouchableOpacity onPress={handlePress}>
                    <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{display:'flex',flexDirection:'row'}}>
                            <View>
                                <Image source = {require('./assets/number-1.png')} style={{width:48,height:48}}  />
                            </View>
                            
                            <View style={{marginLeft:20}}>
                                <Text style={{fontSize:28,fontWeight:'bold',color:'#5FACCE'}}>Al-Fatihah</Text>
                                <View style={{display:'flex',flexDirection:'row'}}>
                                    <Text style={{fontWeight:300,color:'black'}}>MECCAN</Text>
                                    <Text style={{marginLeft:20,fontWeight:300,color:'black'}}>7 Verses</Text>
                                </View>
                            </View>
                            
                        </View>
                        <View>
                            <Text style={styles.title}>الفاتحة</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
               
                
            </View>
            {/* <View>
                <Image source = {require('./assets/sun.png')} />
                <Text style={{}}>1</Text>
            </View>
            
            <Text>Al Fatiah</Text>
            <Text>MECCAN - 7 Verses</Text> */}
        </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
    card: {
      flex: 1,
      backgroundColor: '#e1e1e1',
      padding: 16,
      marginHorizontal: 8,
      borderRadius: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black',
      color:'#5FACCE'
    },
    subtitle: {
      fontSize: 14,
      color: '#000',
      marginBottom: 4,
    },
    arabicNumber: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default Quran