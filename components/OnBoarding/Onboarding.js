import { View, FlatList, Animated, TouchableOpacity } from "react-native";
import { useState, useRef } from "react";
import slides from "../../slides";
import OnboardingItems from "./OnboardingItems";
import Pagination from "./Pagination";

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollable = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          flex: 3,
        }}
      >
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItems item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollable } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slideRef}
        />
      </View>
      <Pagination data={slides} scrollable={scrollable}></Pagination>
    </View>
  );
};

export default Onboarding;
