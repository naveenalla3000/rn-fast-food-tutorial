import { router } from "expo-router";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  return (
    <View>
      <Text>Sign Up</Text>
      <Button onPress={() => router.push("/(auth)/sign-In")} title="Sign In" />
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
