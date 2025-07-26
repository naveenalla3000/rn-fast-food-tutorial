import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const handleSignIn = () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    setIsSubmitting(true);
    // Simulate a sign-in process
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert("Success", "You have signed in successfully!");
      router.replace("/(tabs)");
      // Navigate to the home screen or perform other actions
    }, 2000);
  };
  return (
    <View className="bg-white gap-10 rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        label="Email"
        keyboardType="email-address"
      />
      <CustomInput
        placeholder="Enter your password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        label="Password"
        secureTextEntry={true}
      />
      <CustomButton
        title="Sign In"
        onPress={handleSignIn}
        isLoading={isSubmitting}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Don't have an account?{" "}
          <Link href={"/(auth)/sign-up"} className="text-primary base-bold">
            Sign Up
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({});
