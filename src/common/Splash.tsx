import React, { useEffect } from 'react';
import { Animated, StyleSheet, View } from 'react-native';

export default function Splash() {
  // Create animated values for opacity and scale
  const fadeAnim = new Animated.Value(0); // Initial opacity of 0 (invisible)
  const scaleAnim = new Animated.Value(0.5); 

  useEffect(() => {

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // Target opacity
        duration: 2000, // Duration of 2 seconds
        useNativeDriver: true, // Use native driver for performance
      }),
      Animated.timing(scaleAnim, {
        toValue: 1, // Target scale (normal size)
        duration: 2000, 
        useNativeDriver: true, // Use native driver for performance
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assests/shop.jpg')}
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
