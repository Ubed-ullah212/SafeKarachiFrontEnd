import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { useNavigation } from "@react-navigation/native";
const OnboardingItems = ({ item }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width,
      }}
    >
      <Image
        source={item.image}
        style={{
          flex: 1,
          justifyContent: "center",
          width,
          resizeMode: "contain",
        }}
      />
      <View style={{ flex: 0.3 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            marginBottom: 10,
            color: "#6619c7",
            textAlign: "center",
          }}
        >
          {item.title}
        </Text>
        <Text
          style={{
            fontWeight: "300",
            marginBottom: 10,
            color: "#62656b",
            paddingHorizontal: 66,
            fontSize: 16,
            textAlign: "center",
          }}
        >
          {item.desc}
        </Text>
        <View style={{ alignItems: "center", padding: 10 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            {item.button}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnboardingItems;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    justifyContent: "center",
  },
});
