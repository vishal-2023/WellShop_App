import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import tabScreen from '../components/Tab'
import Splash from '../common/Splash';
import Login from '../common/Login';
import Signup from '../common/Signup';
import ViewProductScreen from '../screens/ViewProductScreen';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export type RootStackParams = {
  Splash:undefined,
  Tab:undefined,
  Login:undefined,
  Signup:undefined,
  Product:{
    id:string
  }
}

export default function RootNavigation() {

  const Stack = createNativeStackNavigator<RootStackParams>();

  const navigation = useNavigation()
  return (
    <Stack.Navigator
    initialRouteName='Splash'
    >
    <Stack.Screen name="Tab" options={{headerShown:false}}  component={tabScreen} />
    
    <Stack.Screen name="Splash"  options={{headerShown:false}}   component={Splash} />
    <Stack.Screen name="Login"  options={{headerShown:false}}   component={Login} />
    <Stack.Screen name="Signup"  options={{headerShown:false}}   component={Signup} />
    <Stack.Screen name='Product' options={{
      headerShown:true,
      header: () => (
        <View style={{ width: '100%', height: 56, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, borderBottomWidth: 1, borderBottomColor: '#ccc',backgroundColor:'#fff7ed' }}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="chevron-back-outline" size={24} color="black" />
              </TouchableOpacity>
              
              {/* <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Product</Text> */}
              
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginRight: 15 }}>
                  <Icon name="search" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="cart-outline" size={24} color="black" />
                </TouchableOpacity>
              </View>
            </View>
      )
    }}  component={ViewProductScreen} />
  </Stack.Navigator>
  )
}

const styles = StyleSheet.create({})