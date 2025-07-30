import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const MenuCard = ({
  item: {
    name,
    image_url,
    price,
    $id,
  },
}: {
  item: MenuItem;
}) => {
  const imageUrl = image_url;
  const { addItem } = useCartStore();

  return (
    <TouchableOpacity
      className="menu-card"
      style={
        Platform.OS === "android"
          ? { elevation: 10, shadowColor: "#878787" }
          : {}
      }
    >
      <Image
        source={{ uri: imageUrl }}
        className="size-32 absolute -top-10"
        resizeMode="contain"
      />
      <Text
        className="text-center base-bold  text-dark-100 mb-2"
        numberOfLines={1}
      >
        {name}
      </Text>
      <Text className="body-regular text-gray-200 mb-4">From ${price}</Text>
      <TouchableOpacity
        onPress={() =>
          addItem({
            id: $id,
            name,
            image_url,
            price,
            customization: [],
          })
        }
        className="flex-row items-center justify-center gap-x-1"
      >
        <Text className="paragraph-bold text-primary">Add to cart + </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default MenuCard;

const styles = StyleSheet.create({});
