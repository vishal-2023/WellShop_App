import { View, Text, TextInput, TouchableOpacity, ToastAndroid, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { RootStackParams } from '../navigator/RootNavigation'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'


type SignupProps = NativeStackNavigationProp<RootStackParams, 'Signup'>

const baseUrl = 'https://e-cart-backend-anf6.onrender.com'

const Signup = () => {
  const navigation = useNavigation<SignupProps>()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

    if (!email || !password || !confirmPassword || !name) {
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

    if (password !== confirmPassword) {
      ToastAndroid.showWithGravity(
        'Passwords do not match',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
      return
    }

    setLoading(true)

    try {
      const response = await fetch(`${baseUrl}/api/v1/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          confirmPassword,
          name,
          role: 'admin',
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData?.message || 'Something went wrong');
      }
      const data = await response.json()

      ToastAndroid.showWithGravity(
        data?.message,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )

      navigation.navigate('Login')
      setEmail('')
      setConfirmPassword('')
      setPassword('')
      setName('')

    } catch (error) {
      ToastAndroid.showWithGravity(
        `${error}`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl font-bold mb-6">Signup</Text>

      <TextInput
        className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />

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

      <TextInput
        className="w-full p-3 mb-4 bg-white rounded-md border border-gray-300"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity className="w-full m-3 rounded-md text-center" onPress={handleSignup}>
        <Text className="text-center p-2 rounded-md text-white font-semibold text-xl bg-blue-500">
          {loading ? <ActivityIndicator color="white" /> : 'Signup'}
        </Text>
      </TouchableOpacity>

      <View className="mt-4">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Already have an account? Please Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Signup
