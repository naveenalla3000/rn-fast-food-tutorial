import { router } from 'expo-router'
import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

const SignIn = () => {
  return (
    <View>
      <Text>Sign In</Text>
      <Button onPress={() => router.push('/(auth)/sign-up')} title="Sign Up" />
    </View>
  )
}

export default SignIn

const styles = StyleSheet.create({})