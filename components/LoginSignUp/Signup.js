import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Background from "../Background";
import { Button, TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useHeaderHeight } from "@react-navigation/elements";

const Signup = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState();
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 18);
  
    if (selectedDate < minDate) {
      setShowPicker(Platform.OS === "ios");
      setDate(currentDate);
    } else {
      alert('You must be at least 18 years old.');
    }
  };
  

  const showDatepicker = () => {
    setShowPicker(true);
  };
  const handleSubmit = async (values) => {
    const minAge = 18;
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - minAge);
  
    // Check if age less thaan 18
    if (date < minDate) {
      
      try {
        const response = await axios.post("http://172.20.10.7:4000/api/v1/CreateUser", {
          Name: values.name,
          PhoneNumber: values.phoneNumber,
          DOB: date,
          Email: values.email,
          password: values.password,
        });
        
        console.log(response);
        navigation.navigate("Login");
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      
      alert('You must be at least 18 years old to sign up.');
    }
  };
  

  const SignupValidationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Your Full Name"),
    email: yup
      .string()
      .email("Please Enter a valid Email")
      .required("Email is required"),
    phoneNumber: yup
      .string()
      .required("Phone Number is required")
      .matches(/^\+923\d{9}$/, "Must be a valid Phone Number"),
    password: yup
      .string()
      .min(8, ({ min }) => `Password must be atleast ${min} characters`)
      .required("Password is required")
      .matches(
        /^(?=.*[A-Z])(?=.*\d).{8,}$/,
        "Must Contain atleast 8 Characters, One Uppercase letter and a digit"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        password: "",
        confirmPassword: "",
      }}
      validateOnMount={true} //jab form render ho to validate karo
      onSubmit={handleSubmit}
      validationSchema={SignupValidationSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        touched,
        errors,
        isValid,
      }) => (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1}}
          keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                alignItems: "center",
                width: wp("100%"),
                height:hp("100%"),
                backgroundColor:"#8f6ef9"
              }}
            >
              <Text
                style={{
                  fontSize: 50,
                  color: "white",
                  fontWeight: "bold",
                  paddingTop: 90,
                  width: wp("78%"),
                  textAlign: "center",
                }}
              >
                Register
              </Text>

              <View
                style={{
                  backgroundColor: "white",
                  height: hp("100%"),
                  width: wp("100%"),
                  borderTopLeftRadius: 100,
                  paddingTop: 15,
                  alignItems: "center",
                  marginTop: 15,
                }}
              >
                <TextInput
                  onBlur={handleBlur("name")}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  activeUnderlineColor="#6619c7"
                  label="Name"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 45,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon="account" color={"#8f6ef9"} />}
                ></TextInput>

                {errors.name && touched.name && (
                  <Text
                    style={{
                      paddingTop: 2,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                      alignItems: "center",
                    }}
                  >
                    {errors.name}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  activeUnderlineColor="#6619c7"
                  label="Email"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 15,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon="email" color={"#8f6ef9"} />}
                ></TextInput>
                {errors.email && touched.email && (
                  <Text
                    style={{
                      paddingTop: 2,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                    }}
                  >
                    {errors.email}
                  </Text>
                )}

                <TextInput
                  activeUnderlineColor="#6619c7"
                  label="Date of Birth"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 15,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon={"calendar"} color={"#8f6ef9"} />}
                  value={date.toDateString()}
                  onFocus={showDatepicker}
                />
                {showPicker && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}

                <TextInput
                  onChangeText={handleChange("phoneNumber")}
                  onBlur={handleBlur("phoneNumber")}
                  value={
                    values.phoneNumber.startsWith("+92")
                      ? values.phoneNumber
                      : "+92" + values.phoneNumber
                  }
                  activeUnderlineColor="#6619c7"
                  keyboardType="phone-pad"
                  label="Phone Number"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 15,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon={"phone"} color={"#8f6ef9"} />}
                ></TextInput>
                {errors.phoneNumber && touched.phoneNumber && (
                  <Text
                    style={{
                      paddingTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                    }}
                  >
                    {errors.phoneNumber}
                  </Text>
                )}

                <TextInput
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  activeUnderlineColor="#6619c7"
                  secureTextEntry={!showPassword}
                  label="Password"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 15,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      color={"#8f6ef9"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                ></TextInput>
                {errors.password && touched.password && (
                  <Text
                    style={{
                      paddingTop: 2,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
                <TextInput
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  activeUnderlineColor="#6619c7"
                  secureTextEntry={!showPassword}
                  label="Confirm Password"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 15,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={
                    <TextInput.Icon
                      icon={showPassword ? "eye-off" : "eye"}
                      color={"#8f6ef9"}
                      onPress={() => setShowPassword(!showPassword)}
                    />
                  }
                ></TextInput>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text
                    style={{
                      paddingTop: 2,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                    }}
                  >
                    {errors.confirmPassword}
                  </Text>
                )}

                <View
                  style={{
                    alignItems: "flex-end",
                    width: wp("82%"),
                    paddingRight: 16,
                    marginBottom: 33,
                    marginTop: 5,
                  }}
                ></View>
                <TouchableOpacity style={{ elevation: 10 }}>
                  <Button
                    onPress={handleSubmit}
                    buttonColor={isValid ? "#CACFD2" : "#6619c7"}
                    textColor="white"
                    style={{
                      width: wp("76%"),
                      borderRadius: 10,
                      height: hp("5%"),
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        textAlign: "center",
                        marginTop:15
                      }}
                    >
                      Sign up
                    </Text>
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
                  <Text style={{ color: "#979494" }}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    rounded
                    disabled={isValid}
                    onPress={() => navigation.navigate("Login")}
                  >
                    <Text style={{ color: "#6619c7" }}> Sign in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default Signup;

const styles = StyleSheet.create({});
