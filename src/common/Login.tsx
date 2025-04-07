import { View, Text, TextInput, TouchableOpacity, Platform, Keyboard, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from '../navigator/RootNavigation'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAvoidingView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParams, 'Login'>
const baseUrl = 'https://e-cart-backend-anf6.onrender.com'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading,setLoading] = useState(false);
  const navigation = useNavigation<LoginScreenNavigationProp>()

  async function handleLogin() {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    if (!email || !password) {
      ToastAndroid.showWithGravity(
        'Please Fill all required information',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
      return
    }

    if (!emailRegex.test(email)) {
      ToastAndroid.showWithGravity(
        'Incorrect Email format',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
      return
    }
    setLoading(true)


    try {
      const result = await fetch(`${baseUrl}/api/v1/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, password
        })
      })

      if (!result?.ok) {
        const err = await result.json();
        throw new Error(err?.message ?? "Failed to login")
      }

      const data = await result?.json();
      // console.log("dddettaill",data);
      await AsyncStorage.setItem('token',data?.token)

      ToastAndroid.showWithGravity(
        data?.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )

      navigation.navigate('Tab')
      setEmail('')
      setPassword('')

    } catch (err) {
      ToastAndroid.showWithGravity(
        `${err}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    } finally {
      setLoading(false)

    }

    // setTimeout(() => {
    //   navigation.navigate('Tab')
    // }, 2000)
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
              {loading ? <ActivityIndicator color="white" /> : 'Login'}
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

