import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { Ionicons } from "react-native-vector-icons";
import { s, vs, ms, mvs } from "react-native-size-matters";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as yup from "yup";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/user";
import { Image } from "@rneui/base";

const EditProfile = ({ route }) => {
  //userData edited submit to redux
  const dispatch = useDispatch();

  //userData from
  const { userData } = route.params;
  console.log("redux image", userData.image);
  //navigation
  const navigation = useNavigation();

  // ImagePicker for gallery and Cover Image
  const [galleryImage, setGalleryImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

   

    if (!result.canceled) {
      setGalleryImage(result.assets[0].uri);
    }
  };

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

  //console.log(result);

    if (!result.canceled) {
      setCoverImage(result.assets[0].uri);
    }
  };
 
  //submit edit data
  const handleSubmit = async (values) => {
    const userToken = await AsyncStorage.getItem("userToken");

    const formData = new FormData();
    formData.append("Name", values.name);
    formData.append("PhoneNumber", values.phoneNumber);

    formData.append("Email", values.email);
    formData.append("password", values.password);

    if (galleryImage) {
      const fileExtension = galleryImage.split(".").pop().toLowerCase();
      const mimeType = fileExtension === "jpg" ? "image/jpeg" : "image/jpeg";

      formData.append("Media", {
        uri: galleryImage,
        type: mimeType,
        name: `upload.${fileExtension}`,
      });

      const config = {
        headers: {
          authorization: userToken,
          "Content-Type": "multipart/form-data",
        },
      };

      await axios
        .put("http://172.20.10.7:4000/api/v1/EditUser", formData, config)
        .then((res) => {
          console.log(res.data);
          dispatch(setUser(res.data.data));
          Alert.alert("Success", "Changes were successful!", [
            { text: "OK", onPress: () => console.log("OK Pressed") },
          ]);
        })
        .catch((err) => console.log("Error", err.message));
    }
  };

  //validfation
  const [showPassword, setShowPassword] = useState();

  const EditProfileValidationSchema = yup.object().shape({
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
  });

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",

        elevation: 5,
      }}
    >
      <View
        style={{
          marginHorizontal: 12,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back"
            size={34}
            color="#6619c7"
            style={{ left: 0 }}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#6619c7",
            fontSize: 30,
            fontWeight: "bold",
            paddingLeft: s(63),
          }}
        >
          Edit Profile
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 5,
        }}
      >
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.select({
            ios: 50,
            android: 50,
          })}
          behavior="position"
        >
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <View>
              <Image
                // source={{ uri: coverImage }}
                source={require('../assets/123.jpg')} 
                resizeMode="cover"
                style={{
                  width: wp("100%"),
                  height: hp("22%"),
                }}
              />
              <TouchableOpacity>
                <Avatar.Accessory
                  size={32}
                  name="photo-camera"
                  iconStyle={{ color: "white" }}
                  onPress={() => {
                    pickCoverImage();
                  }}
                />
              </TouchableOpacity>
            </View>
            <Avatar
              size={148}
              rounded
              source={{
                uri:
                  galleryImage || `http://172.20.10.7:4000${userData.image}`,
              }}
              containerStyle={{
                backgroundColor: "purple",
                borderWidth: 1.5,
                borderColor: "#6619c7",
                marginTop: -86,
              }}
            >
              <TouchableOpacity>
                <Avatar.Accessory
                  size={32}
                  name="photo-camera"
                  iconStyle={{ color: "white" }}
                  onPress={() => {
                    pickImage();
                  }}
                />
              </TouchableOpacity>
            </Avatar>
          </View>

          <Formik
            initialValues={{
              name: userData.name,
              email: userData.email,
              phoneNumber: userData.phoneNumber,

              password: "",
            }}
            validateOnMount={true} //jab form render ho to validate karo
            onSubmit={handleSubmit}
            validationSchema={EditProfileValidationSchema}
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
              <View style={{ alignItems: "center", marginBottom: 10 }}>
                <TextInput
                  onBlur={handleBlur("name")}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  activeUnderlineColor="#6619c7"
                  label="Name"
                  type="outlined"
                  style={{
                    width: wp("78%"),
                    marginTop: 35,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon="account" color={"#8f6ef9"} />}
                ></TextInput>

                {errors.name && touched.name && (
                  <Text
                    style={{
                      paddingTop: 5,
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
                    marginTop: 25,
                    backgroundColor: "#ecf0f1",
                  }}
                  right={<TextInput.Icon icon="email" color={"#8f6ef9"} />}
                ></TextInput>
                {errors.email && touched.email && (
                  <Text
                    style={{
                      paddingTop: 5,
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
                    marginTop: 25,
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
                    marginTop: 25,
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
                      paddingTop: 5,
                      color: "red",
                      fontSize: 12,
                      fontWeight: 500,
                      width: wp("78%"),
                    }}
                  >
                    {errors.password}
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
                    // mode="contained"
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
                        padding: 4,
                      }}
                    >
                      Save Changes
                    </Text>
                  </Button>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({});
