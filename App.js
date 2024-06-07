import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Signup from "./components/LoginSignUp/Signup";
import Login from "./components/LoginSignUp/Login";
import Map from "./components/Map/Map";
import Onboarding from "./components/OnBoarding/Onboarding";
import BottomBar from "./components/BottomBar/BottomBar";
import UserFeed from "./components/UserFeed/UserFeed";
import Profile from "./components/Profile/Profile";
import SOS from "./components/SOS/SOS";
import EditProfile from "./components/Profile/EditProfile";
import CameraModel from "./components/Map/CameraModel";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { store } from "./components/store/store";
import { Provider } from "react-redux";
import SafetyAnalysis from "./components/SafetyAnalysis/SafetyAnalysis";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              {/* <Stack.Screen name="Onboarding" component={Onboarding} />*/}
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Login" component={Login} /> 
              <Stack.Screen name="BottomBar" component={BottomBar} />
              <Stack.Screen name="userFeed" component={UserFeed} />
              <Stack.Screen name="Profile" component={Profile} />
              <Stack.Screen name="EditProfile" component={EditProfile} />
              <Stack.Screen name="Map" component={Map} />
              <Stack.Screen name="CameraModel" component={CameraModel} />
              <Stack.Screen name="SOS" component={SOS} />
              <Stack.Screen name="SafetyAnalysis" component={SafetyAnalysis} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

export default App;
