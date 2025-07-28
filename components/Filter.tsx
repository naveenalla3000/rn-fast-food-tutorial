import { Category } from "@/type";
import cn from "clsx";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
} from "react-native";

const Filter = ({ categories }: { categories: Category[] }) => {
  const searchParams = useLocalSearchParams<{
    query?: string;
    category?: string;
  }>();
  const [active, setActive] = useState(searchParams.category || "");
  const handlePress = (id: string) => {
    setActive(id);
    if (id === "all") {
      router.setParams({
        category: undefined,
      });
    } else {
      router.setParams({
        category: id,
      });
    }
  };
  const filterData: (Category | { $id: string; name: string })[] = categories
    ? [{ $id: "all", name: "All" }, ...categories]
    : [{ $id: "all", name: "All" }];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={filterData}
      contentContainerClassName="gap-x-2 pb-3"
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            key={item.$id}
            onPress={() => handlePress(item.$id)}
            style={
              Platform.OS === "android"
                ? { elevation: 5, shadowColor: "#878787" }
                : {}
            }
            className={cn(
              "filter",
              active === item.$id ? "bg-amber-500" : "bg-white"
            )}
          >
            <Text
              className={cn(
                "body-medium",
                active === item.$id ? "text-white" : "text-gray-200"
              )}
            >
              {" "}
              {item.name}
            </Text>
          </TouchableOpacity>
        );
      }}
      keyExtractor={(item) => item.$id || item.name}
    ></FlatList>
  );
};

export default Filter;

const styles = StyleSheet.create({});
