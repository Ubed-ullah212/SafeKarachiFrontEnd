import {
  View,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const Background = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#8f6ef9" }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Background;
