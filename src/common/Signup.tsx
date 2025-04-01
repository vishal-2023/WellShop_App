import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RootStackParams } from '../navigator/RootNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

type SinupProps=NativeStackNavigationProp<RootStackParams,'Signup'>

const Signup = () => {
    const navigation = useNavigation<SinupProps>()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    function handleSignup(){
        setTimeout(() => {
            navigation.navigate('Login')
        },1000)
    }
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
    <Text className="text-2xl font-bold mb-6">Signup</Text>

    <TextInput
      className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      keyboardType="email-address"
    />

    <TextInput
      className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
      placeholder="Password"
      value={password}
      onChangeText={setPassword}
      secureTextEntry

    />
    <TouchableOpacity className='w-full m-3 rounded-md text-center' onPress={handleSignup}>
      <Text className='text-center p-2 rounded-md text-white font-semibold text-xl bg-blue-500'>Signup</Text>
    </TouchableOpacity>
    <View className="mt-4">
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text > Already have accout , please Login </Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Signup