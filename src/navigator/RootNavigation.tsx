import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tabScreen from '../components/Tab'
import Splash from '../common/Splash';

export default function RootNavigation() {
    const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
    initialRouteName='Splash'
    >
    <Stack.Screen name="Tab" options={{headerShown:false}}  component={tabScreen} />

    <Stack.Screen name="Splash"  options={{headerShown:false}}   component={Splash} />
  </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})