import { View, Text, TextInput, TouchableOpacity, Platform, Keyboard } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../navigator/RootNavigation'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView } from 'react-native'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Login'>

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation<LoginScreenNavigationProp>()

  function handleLogin() {
    setTimeout(() => {
      navigation.navigate('Tab')
    }, 2000)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View className="flex-1 min-h-screen justify-center items-center bg-gray-100 p-4">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

          <TextInput
            className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <TextInput
            className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={() => Keyboard.dismiss()}
          />

          <TouchableOpacity 
            className='w-full m-3 rounded-md' 
            onPress={handleLogin}
          >
            <Text className='text-center p-2 rounded-md text-white font-semibold text-xl bg-blue-500'>
              Login
            </Text>
          </TouchableOpacity>

          <View className="mt-4">
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="text-center">Don't have account, please Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}

export default Login

