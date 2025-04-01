import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { KeyboardAvoidingScrollView } from 'react-native-keyboard-avoiding-scroll-view'

export default function LoginScreen() {
  return (
    <KeyboardAvoidingScrollView>
    <View>
      <Text>LoginScreen</Text>
    </View>
    </KeyboardAvoidingScrollView>

  )
}

const styles = StyleSheet.create({})