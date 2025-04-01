import { Dimensions, FlatList, Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-reanimated-carousel';
import Product from '../components/Product';
import List from '../components/List';


// const { width, height } = Dimensions.get('window');




export default function HomeScreen() {
  const { width: screenWidth } = Dimensions.get('window');


  const images = [
    require('../assests/bg-1.jpg'),
    require('../assests/bg-2.jpg'),
    require('../assests/happy-beautiful-couple-posing-with-shopping-bags-violet.jpg')

    // Add more image URLs as needed
  ];

  return (

    <KeyboardAvoidingView
      style={{ backgroundColor: '#fff7ed' }} behavior="padding"  >
      <FlatList
        data={[1]}
        ListHeaderComponent={
          <>
            <View style={{ height: 220 }} className=' w-full '>
              <Carousel
                loop
                width={screenWidth}
                height={300}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={3000}
                renderItem={({ item }) => (
                  <View className=' m-0 p-0' style={styles.slide}>
                    <Image
                      source={item}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                )}
              />
            </View>
            <List />
            <Product />
          </>
        }
        renderItem={() => <></>}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      />

    </KeyboardAvoidingView>


  )
}




const styles = StyleSheet.create({

  slide: {
    marginTop: 10,
    display: 'flex',
    marginBottom: 0,
    paddingBottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // objectFit:'contain'

  },
  image: {
    width: '92%',
    height: 200,
    borderRadius: 8,
    objectFit: 'cover',
    // borderWidth:2
  },
});