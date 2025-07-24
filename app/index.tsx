import { Text, View } from "react-native";
import "./global.css";
 
export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl text-center font-bold text-blue-500">
        Naveen Alla {"\n"} React Native Expo Template
      </Text>
    </View>
  );
}