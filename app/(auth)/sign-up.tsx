import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { createUser } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSignUp = async () => {
    if (!form.name || !form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    const { email, password, name } = form;
    setIsSubmitting(true);
    try {
      await createUser({
        email,
        password,
        name,
      });
      router.replace("/(auth)/sign-In");
    } catch (error: any) {
      console.error("Sign Up Error:", error.message);
      Alert.alert("Error", error.message || "An error occurred during sign up");
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <View className="bg-white gap-10 rounded-lg p-5 mt-5">
      <CustomInput
        placeholder="Enter your Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        label="Name"
      />
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
        title="Sign Up"
        onPress={handleSignUp}
        isLoading={isSubmitting}
      />
      <View className="flex justify-center mt-5 flex-row gap-2">
        <Text className="base-regular text-gray-100">
          Already have an account?{" "}
          <Link href={"/(auth)/sign-In"} className="text-primary base-bold">
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
