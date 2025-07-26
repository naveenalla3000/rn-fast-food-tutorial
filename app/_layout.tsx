import * as Sentry from '@sentry/react-native';
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import "./global.css";

Sentry.init({
  dsn: 'https://7c132f28aeb024cb48e8e85188661a7e@o4507276526747648.ingest.us.sentry.io/4509733593808896',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
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
});