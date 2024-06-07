import { StyleSheet, Animated, useWindowDimensions, View } from "react-native";
import React from "react";

const Pagination = ({ data, scrollable }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ flexDirection: "row", height: 64 }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

        const dotWidth = scrollable.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollable.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={{
              height: 10,
              borderRadius: 5,
              backgroundColor: "#493d8a",
              marginHorizontal: 8,
              width: dotWidth,
              opacity,
            }}
            key={i.toString()}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({});
