import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [fontsLoadedSuccess, FontsLoadedError] = useFonts({
    "QuickSand-bold": require("../assets/fonts/Quicksand-Bold.ttf"),
    "QuickSand-medium": require("../assets/fonts/Quicksand-Medium.ttf"),
    "QuickSand-regular": require("../assets/fonts/Quicksand-Regular.ttf"),
    "QuickSand-semibold": require("../assets/fonts/Quicksand-SemiBold.ttf"),
    "QuickSand-light": require("../assets/fonts/Quicksand-Light.ttf"),
  });
  useEffect(() => {
    if (FontsLoadedError) throw FontsLoadedError;
    if (fontsLoadedSuccess) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoadedSuccess, FontsLoadedError]);
  return (
    <>
      <StatusBar hidden={true} />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </>
  );
}
