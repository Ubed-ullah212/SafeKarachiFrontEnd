import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState,useEffect } from "react";
import Background from "../Background";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import BottomBar from "../BottomBar/BottomBar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Login = () => {
  const navigation = useNavigation();
 
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState();
  const [isValid, setIsValid] = useState();
  const [error, setError] = useState(null);
  //http://192.168.1.104:4000/api/v1/LoginUser
  // Check if user is already logged in when component mounts
  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    if (userToken) {
      
      navigation.navigate("BottomBar"); 
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://172.20.10.7:4000/api/v1/LoginUser",
        { Email: email, password: password }
      );

      if (response.status === 200) {
        const { token, user } = response.data;
      // Dispatch user data to Redux store
        await AsyncStorage.setItem("userToken", token); 
        navigation.navigate("BottomBar"); // Navigate to main screen
      } else {
        Alert.alert("Error", "Invalid Email/Password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Background>
      <View style={{ alignItems: "center", width: wp("100%") }}>
        <Text
          style={{
            fontSize: 62,
            color: "white",
            fontWeight: "bold",
            paddingTop: 10,
          }}
        >
          Login
        </Text>
        <View
          style={{
            backgroundColor: "white",
            height: hp("90%"),
            width: wp("100%"),
            borderTopLeftRadius: 100,
            paddingTop: 60,
            alignItems: "center",
            marginTop: 15,
          }}
        >
          <Text style={{ color: "#8f6ef9", fontSize: 40 }}>Welcome Back </Text>
          <Text style={{ color: "#979494", fontSize: 16 }}>
            Login to your account
          </Text>
          <TextInput
            onChangeText={(x) => setEmail(x)}
            activeUnderlineColor="#6619c7"
            label="Email"
            type="outlined"
            style={{
              width: wp("78%"),
              marginTop: 45,
              backgroundColor: "#ecf0f1",
            }}
            right={<TextInput.Icon icon="email" color={"#8f6ef9"} />}
          ></TextInput>
          <TextInput
            onChangeText={(x) => setPassword(x)}
            activeUnderlineColor="#6619c7"
            secureTextEntry={!showPassword}
            label="Password"
            type="outlined"
            style={{
              width: wp("78%"),
              marginTop: 30,
              backgroundColor: "#ecf0f1",
            }}
            right={
              <TextInput.Icon
                icon={showPassword ? "eye-off" : "eye"}
                onPress={() => setShowPassword(!showPassword)}
                color={"#8f6ef9"}
              />
            }
          ></TextInput>
          <View
            style={{
              alignItems: "flex-end",
              width: wp("82%"),
              paddingRight: 16,
              marginBottom: 25,
              marginTop: 5,
            }}
          >
            <TouchableOpacity>
              <Text style={{ color: "#6619c7", fontSize: 14 }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ elevation: 5,marginTop:50 }}>
            <Button
              onPress={handleSubmit}
              buttonColor={isValid ? "#CACFD2" : "#6619c7"}
              textColor="white"
              mode="contained"
              style={{ width: 290 }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Login</Text>
            </Button>
          </TouchableOpacity>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            <Text style={{ color: "#979494" }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={{ color: "#6619c7" }}> Sign up</Text>
            </TouchableOpacity>
          </View>
          {/* <Text
            style={{
              fontSize: 20,
              fontWeight: 300,
              color: "#979494",
              marginTop: 25,
            }}
          >
            OR
          </Text>
          <View style={{ flexDirection: "row", gap: 29, marginVertical: 30 }}>
            <TouchableOpacity>
              <Button
                icon="google"
                mode="elevated"
                compact={true}
                style={{ width: 200 }}
                buttonColor="#DB4437"
                textColor="white"
              >
                <Text>Login with Google</Text>
              </Button>
            </TouchableOpacity>
            
          </View> */}
        </View>
      </View>
    </Background>
  );
};

export default Login;

const styles = StyleSheet.create({});
