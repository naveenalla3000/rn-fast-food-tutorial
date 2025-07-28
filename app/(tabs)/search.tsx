import CardButton from "@/components/CartButton";
import MenuCard from "@/components/MenuCard";
import { getCategories, getMenu } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { MenuItem } from "@/type";
import cn from "clsx";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const search = () => {
  const { query, category } = useLocalSearchParams<{
    query?: string;
    category?: string;
  }>();
  const { data, refetch, loading } = useAppwrite({
    fn: getMenu,
    params: {
      category: "",
      query: "",
      limit: 10,
    },
  });
  const { data: categories, loading: loadingCategories } = useAppwrite({
    fn: getCategories,
  });

  useEffect(() => {
    refetch({
      category: category || "",
      query: query || "",
      limit: 6,
    });
  }, [category, query]);
  return (
    <SafeAreaView>
      <FlatList
        data={data}
        renderItem={({ item, index }) => {
          const isFirstRightColumnItem = index & 1;
          return (
            <View
              className={cn(
                "flex-1 max-w-[48%]",
                isFirstRightColumnItem ? "mt-10" : "mt-0"
              )}
            >
              <MenuCard item={item as MenuItem} />
            </View>
          );
        }}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        columnWrapperClassName="gap-7"
        contentContainerClassName="gap-7 px-5 pb-32"
        ListHeaderComponent={() => (
          <View className="my-5 gap-5">
            <View className="flex-between flex-row w-full">
              <View className="flex-start">
                <Text className="small-bold uppercase text-primary">
                  Search
                </Text>
                <View className="flex-start fex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-semibold text-dark-100">
                    Find your favorite food
                  </Text>
                </View>
              </View>
              <CardButton />
            </View>
            <Text>Search Input</Text>
            <Text>Filter</Text>
          </View>
        )}
        ListEmptyComponent={() => {
          if (!loading) {
            return (
              <Text className="text-center text-dark-100">
                No results found
              </Text>
            );
          }
        }}
        // ListFooterComponent={() => {
        //   return <Button title="Seed" onPress={() => seed()}></Button>;
        // }}
      />
    </SafeAreaView>
  );
};

export default search;

const styles = StyleSheet.create({});
