import { images } from "@/constants";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardButton = () => {
  const totalItems = 10;
  return (
    <TouchableOpacity className="cart-btn" onPress={() => {}}>
      <Image source={images.bag} resizeMode="contain" className="size-5" />
      {totalItems > 0 && (
        <View className="cart-badge">
          <Text className="text-white small-bold">{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CardButton;

const styles = StyleSheet.create({});
