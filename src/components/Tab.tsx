import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrderScreen from '../screens/OrderScreen';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigator/RootNavigation';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../reduxToolkit/store';


const Tab = createBottomTabNavigator();

type TabScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Tab'>

export default function Tabs() {
  const navigation = useNavigation<TabScreenNavigationProp>()
  const cartData: any = useSelector((state: RootState) => state?.cart?.AllCartItem)

  let itemCount = cartData?.cart?.items?.length??0
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          header: () => (
            <View className=' w-full bg-[#fff7ed] '>
              <View className="p-1 flex flex-row justify-between bg-[#fff7ed] items-center">
                <View className="flex flex-row justify-center items-center">
                  <View className="w-16 h-16">
                    <Image
                      className="w-full h-full object-cover"
                      source={require('../assests/profile.png')} // Corrected 'assests' to 'assets'
                      alt="profile image"
                    />
                  </View>
                  <View>
                    <Text className="text-sm">Hello</Text>
                    <Text className="text-sm font-semibold">Let's Shop!</Text>
                  </View>
                </View>
                <View className="flex flex-row pr-4 gap-3">
                  <Icon size={25} name="heart-outline" />
                  <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <View style={{ position: 'relative' }}>
                      <Icon name="cart-outline" size={24} color="black" />

                      {/* Cart Badge */}
                      {itemCount > 0 && (
                        <View
                          style={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            backgroundColor: '#ba8304',
                            borderRadius: 10,
                            width: 16,
                            height: 16,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
                            {itemCount}
                          </Text>
                        </View>
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View className=' w-11/12 mx-auto  '>
                <View className="border-[#dedbd7] bg-[#f2f1f0] rounded-xl flex flex-row items-center px-3 gap-3">
                  <Icon size={20} color="grey" name="search-outline" />
                  <TextInput className="w-9/12" placeholder="Search for keyword or product" />
                  <View className="w-0.5 h-8 bg-[#dedbd7] mx-2" />
                  <Icon size={20} className="pr-2" color="grey" name="filter-outline" />
                </View>
              </View>
            </View>

          ),
          tabBarIcon: ({ color, size }) => (
            <Icon name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="My Order"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="list-outline" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Help"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="help-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({})