import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import { SignIn as UserSignIn } from "@/lib/appwrite";
import * as Sentry from "@sentry/react-native";
import { Link, router } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, View } from "react-native";

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const handleSignIn = async () => {
    if (!form.email || !form.password) {
      return Alert.alert("Error", "Please fill in all fields");
    }
    const { email, password } = form;
    setIsSubmitting(true);
    try {
      await UserSignIn({ email, password });
      router.replace("/(tabs)");
    } catch (error: any) {
      console.error("Sign In Error:", error);
      Alert.alert(
        "Error",
        error?.message || "Failed to sign in. Please try again."
      );
      Sentry.captureEvent(error);
    } finally {
      setIsSubmitting(false);
    }
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
