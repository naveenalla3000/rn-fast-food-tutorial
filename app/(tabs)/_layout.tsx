import { Redirect, Slot } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const TabsLayout = () => {
  const isAuthenticated = false;
  if (!isAuthenticated) return <Redirect href="/(auth)/sign-In" />;
  return <Slot />;
};

export default TabsLayout;

const styles = StyleSheet.create({});
