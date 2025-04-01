import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { RootStackParams } from '../navigator/RootNavigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import asyncStorage from '@react-native-async-storage/async-storage';


type SplashScreenNavigationProp = NativeStackNavigationProp<RootStackParams,'Splash'>



export default function Splash() {
  const fadeAnim = new Animated.Value(0); 
  const scaleAnim = new Animated.Value(0.5); 

  const navigation = useNavigation<SplashScreenNavigationProp>()

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, 
        duration: 2000, 
        useNativeDriver: true, 
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 2000, 
        useNativeDriver: true, 
      }),
    ]).start();
  }, []);

  async function redirectScreen() {
    const getToken = await asyncStorage.getItem('token');
    if(getToken){
      navigation.navigate('Tab');
    }else{
      navigation.navigate('Login')
    }
  }

  useEffect(() => {
    setTimeout(() => {
      redirectScreen()
    },2000)
  },[])

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assests/shop.png')}
        style={[
          styles.image,
          {
            opacity: fadeAnim, 
            transform: [{ scale: scaleAnim }], 
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: 300, // Adjust image width as needed
    height: 300, // Adjust image height as needed
  },
});
