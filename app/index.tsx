import CardButton from "@/components/CartButton";
import { images, offers } from "@/constants";
import cn from "clsx";
import React, { Fragment } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={offers}
        renderItem={({ item, index }) => {
          const isOdd = index & 1;
          return (
            <View>
              <Pressable
                className={cn(
                  "offer-card",
                  isOdd ? "flex-row" : "flex-row-reverse"
                )}
                style={{ backgroundColor: item.color }}
                android_ripple={{ color: "#ffff22" }}
              >
                {({ pressed }) => (
                  <Fragment>
                    <View className="h-full w-1/2">
                      <ImageBackground
                        source={item.image}
                        className={"size-full"}
                        resizeMode="cover"
                      />
                    </View>
                    <View
                      className={cn(
                        "offer-card__info",
                        isOdd ? "pr-10" : "pl-10"
                      )}
                    >
                      <Text className="h1-bold text-white leading-tight">
                        {item.title}
                      </Text>
                      <Image
                        source={images.arrowRight}
                        resizeMode="contain"
                        tintColor={"#ffffff"}
                        className="size-10"
                      />
                    </View>
                  </Fragment>
                )}
              </Pressable>
            </View>
          );
        }}
        contentContainerClassName="pb-28 px-5"
        ListHeaderComponent={() => {
          return (
            <View className="flex-between flex-row w-full my-5">
              <View className="flex-start">
                <Text className="small-bold text-primary uppercase">
                  Deliver To
                </Text>
                <TouchableOpacity className="flex-center flex-row gap-x-1 mt-0.5">
                  <Text className="paragraph-bold text-dark-100">USK</Text>
                  <Image
                    source={images.arrowDown}
                    resizeMode="contain"
                    className="size-3"
                  />
                </TouchableOpacity>
              </View>
              <CardButton />
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}
