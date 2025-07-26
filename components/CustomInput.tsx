import { CustomInputProps } from "@/type";
import cn from 'clsx';
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const CustomInput = ({
  placeholder = "Enter text",
  value,
  onChangeText,
  label,
  secureTextEntry = false,
  keyboardType = "default",
}: CustomInputProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View className="w-full">
      <Text className="label">{label}</Text>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        placeholderTextColor={"888"}
        className={cn("input", isFocused ? "border-primary":"border-gray-300")}
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({});
