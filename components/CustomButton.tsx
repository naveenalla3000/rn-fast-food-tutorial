import { CustomButtonProps } from "@/type";
import cn from "clsx";
import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const CustomButton = ({
  title = "Click Me",
  textStyle,
  leftIcon,
  isLoading,
  onPress,
  style,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity disabled={isLoading} className={cn("custom-btn", style)} onPress={onPress}>
      {leftIcon}
      {isLoading ? (
        <ActivityIndicator size={"small"} color={"#FFF"} />
      ) : (
        <Text className={cn("text-white-100 paragraph-semibold", textStyle)}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
