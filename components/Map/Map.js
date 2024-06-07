import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
  Polygon,
} from "react-native-maps";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  FlatList,
  Alert,
  Platform,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Button,
  Card,
  Text,
  IconButton,
  TextInput,
  Badge,
  List,
  Divider,
  Avatar,
} from "react-native-paper";
import {
  Feather,
  MaterialIcons,
  Ionicons,
  AntDesign,
  EvilIcons,
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Searchbar } from "react-native-paper";
import * as Location from "expo-location";

import "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { ThemedButton } from "react-native-really-awesome-button";
import { Icon, ListItem, SpeedDial } from "@rneui/base";
import { KeyboardAvoidingView } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { Video } from "expo-av";
import { s, vs, ms } from "react-native-size-matters";
import GooglePlaces from "./GooglePlaces";
import * as yup from "yup";
import { Formik } from "formik";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

//"http://172.20.10.2:4000/api/v1/CreatePost",
export default function Map() {
  //redux all post data for use in markers
  const allPosts = useSelector((state) => state.postReducer.posts);
  console.log("Post data from redux state:", allPosts);

  //redux crime data for color coding from safety analysis
  // SafetyAnalysis component
  const allCrime = useSelector((state) => state?.crimeReducer?.crimes);
  console.log("crime data for color coding from safety analysis:", allCrime);

  const getColor = (label) => {
    const number = parseInt(label.split(".")[0]); // Extract the number from the label
    if (number === 1) return "rgba(0, 0, 0, 0.6)"; // Black for blacklisted
    if (number === 2) return "rgba(255, 0, 0, 0.6)"; // Red
    if (number === 3) return "rgba(255, 165, 0, 0.6)"; // Orange
    return "rgba(0, 128, 0, 0.5)"; // Default color
  };

  //missing animation
  const [opacityAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    const fadeInOut = () => {
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5, // Fade out to a lower opacity
          duration: 1100, // Duration of fade out
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade in to full opacity
          duration: 1100, // Duration of fade in
          useNativeDriver: true,
        }),
      ]).start(() => fadeInOut()); // Repeat animation
    };

    fadeInOut(); // Start animation
  }, [opacityAnim]);

  //  { MISSING PERSON BOTTOM SHEET}

  const bottomSheetRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to close the bottom sheet modal
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
    setIsModalVisible(false);
  };
  // Function to open the bottom sheet modal
  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
    setIsModalVisible(true);
    console.log("PRESSED THE SHEET");
  };

  //navigation
  const navigation = useNavigation();
  const route = useRoute();

  //map

  const [mapRegion, setMapRegion] = useState({
    // latitude: 29.837896761320245,
    // longitude: 67.03277639731591,
    // latitudeDelta: 0.15,
    // longitudeDelta: 0.1,
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);
  const [searchedLocation, setSearchedLocation] = useState({
    latitude: 24.869999,
    longitude: 67.0999,
  });

  const [longPost, setLongPost] = useState(0);
  const [latPost, setLatPost] = useState(0);
  const [postTypes, setPostTypes] = useState([]);
  const [selected, setSelected] = useState("");

  const dispatch = useDispatch();

  //dialbutton
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchPostTypes();
    // fetchUserData();
  }, []);
  // const user = useSelector((state) => state.userReducer.user);

  //either implement this here or in profile, userData redux me jayega so we can fetch for dp
  // const fetchUserData = async () => {
  //   try {
  //     const userToken = await AsyncStorage.getItem("userToken");
  //     const config = {
  //       headers: {
  //         authorization: userToken,
  //       },
  //     };
  //     const response = await axios.get(
  //       "http://172.20.10.7:4000/api/v1/SingleUser",
  //       config
  //     );

  //     const userDataFromAPI = response.data.data;

  //     const processedSingleUserData = {
  //       id: userDataFromAPI.id,
  //       name: userDataFromAPI.Name,
  //       phoneNumber: userDataFromAPI.PhoneNumber,
  //       dob: userDataFromAPI.DOB,
  //       email: userDataFromAPI.Email,
  //       postedByData: userDataFromAPI.PostedByData.map((post) => ({
  //         id: post.id,
  //         title: post.Title,
  //         description: post.Description,
  //         status: post.Status,
  //         longitude: post.longitude,
  //         latitude: post.latitude,
  //       })),
  //       userLikedData: userDataFromAPI.UserLikedData.map((likedPost) => ({
  //         id: likedPost.id,
  //         title: likedPost.Title,
  //         description: likedPost.Description,
  //         status: likedPost.Status,
  //         longitude: likedPost.longitude,
  //         latitude: likedPost.latitude,
  //       })),
  //       userIdCommentData: userDataFromAPI.UserIdCommentData.map(
  //         (commentedPost) => ({
  //           id: commentedPost.id,
  //           title: commentedPost.Title,
  //           description: commentedPost.Description,
  //           status: commentedPost.Status,
  //           longitude: commentedPost.longitude,
  //           latitude: commentedPost.latitude,
  //         })
  //       ),
  //     };
  //     // dispatch(setUser(processedSingleUserData));
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  {
    /*api of create post*/
  }
  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Title", values.title);
      formData.append("Description", values.description);
      formData.append("Type", selected);
      formData.append("longitude", longPost);
      formData.append("latitude", latPost);
      let mediaFile =
        galleryImage || cameraImage || galleryVideo || cameraVideo; //cameraVideo issue coming as object

      console.log("THIS IS THE MEDIA FILE" + mediaFile);

      if (mediaFile) {
        const fileExtension = mediaFile.split(".").pop().toLowerCase();
        const mimeType =
          fileExtension === "jpg" || fileExtension === "jpeg"
            ? "image/jpeg"
            : fileExtension === "mov"
            ? "video/quicktime"
            : "";

        formData.append("Media", {
          uri: mediaFile,
          type: mimeType,
          name: `upload.${fileExtension}`,
        });
      }

      const userToken = await AsyncStorage.getItem("userToken");

      const config = {
        headers: {
          Authorization: userToken,
          "Content-Type": "multipart/form-data",
        },
      };

      const response = await axios.post(
        "http://172.20.10.7:4000/api/v1/CreatePost",
        formData,
        config
      );

      console.log(response);
      console.log("succeed");
      handleCloseModal();
      Alert.alert("Success", "Post was successful!", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  {
    /*api of getting post types*/
  }
  const fetchPostTypes = async () => {
    try {
      const response = await axios.get(
        "http://172.20.10.7:4000/api/v1/GetPostTypeListing"
      );

      const postTypesData = response.data.result.items.map((item) => ({
        id: item.id,
        name: item.Name,
      }));

      setPostTypes(postTypesData);
      // console.log("Data fetched successfully:", postTypesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // console.log(postTypes);

  const [selectedPostType, setSelectedPostType] = useState(null);
  const [showReports, setShowReports] = useState(false);

  const handlePress = (postType) => {
    setSelectedPostType(postType);
  };

  const handleShowReports = () => {
    setShowReports(!showReports);
    setSelectedPostType(null);
  };

  //dropdown list
  const data = postTypes.map((item, index) => ({
    key: item.id,
    value: item.name,
  }));
  // console.log("it is:" + selected);

  //gallery - imagepicker
  const [galleryVideo, setGalleryVideo] = useState(null);
  console.log("video path" + galleryVideo);
  const [galleryImage, setGalleryImage] = useState(null);
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled && result.assets[0].type == "video") {
      setGalleryVideo(result.assets[0].uri);
    } else if (!result.canceled && result.assets[0].type == "image") {
      setGalleryImage(result.assets[0].uri);
    }
  };

  //Modal of alert notifications
  const scale = useRef(new Animated.Value(0)).current;
  const [isVisible, SetIsVisible] = useState(false);
  const resizeBox = (to) => {
    to === 1 && SetIsVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && SetIsVisible(false));
  };
  //modal of menu
  const [isMenuVisible, SetIsMenuVisible] = useState(false);
  const resizeMenuBox = (to) => {
    to === 1 && SetIsMenuVisible(true);
    Animated.timing(scale, {
      toValue: to,
      useNativeDriver: true,
      duration: 200,
      easing: Easing.linear,
    }).start(() => to === 0 && SetIsMenuVisible(false));
  };
  const [mapType, setMapType] = useState("standard");
  const [mapProvider, setMapProvider] = useState(PROVIDER_DEFAULT);
  const [trafficVisible, setTrafficVisible] = useState(false);

  //bottomsheet modal
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const handleCloseModal = () => {
    bottomSheetModalRef.current?.close();
    setGalleryImage(null);
    setGalleryVideo(null);
    setIsOpen(false);
  };

  const snapPoints = ["90%"];
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
    setIsOpen(true);
  };

  //post validation
  const PostValidationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
  });

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      setMapRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.004,
        longitudeDelta: 0.0,
      });
    } catch (error) {
      console.error("Error getting location:", error);
    }
    // reverseGeocode();
  };

  useEffect(() => {}, [mapRegion]);

  //cameraImage from camera component, agar image hai then open modal
  const cameraImage = route?.params?.cameraImage;
  const cameraVideo = route?.params?.cameraVideo;

  if (cameraImage || cameraVideo) {
    bottomSheetModalRef.current?.present();
    console.log("cameraModel Video uri" + cameraVideo?.uri);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ height: hp("100%"), width: wp("100%") }}>
        <View
          style={{
            flex: 1,
            position: "relative",
            backgroundColor: "lightgray",
          }}
        >
          <View
            style={{
              position: "absolute",
              zIndex: 1,
              left: s(76),
              top: vs(52),
              width: s(200),

              elevation: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 2.42,
              elevation: 15,
            }}
          >
            {/* <SearchBar
            
              value={address}
              onChangeText={setAddress}
              backgroundColor="transparent"
              style={{}}
              platform="ios"
              placeholder="Search Location"
              showLoading={false}
              containerStyle={{
                backgroundColor: "transparent",
                width: wp("60%"),
              }}
              inputContainerStyle={{
                backgroundColor: "white",
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.32,
                shadowRadius: 2.42,
                elevation: 15,
              }}
              inputStyle={{
                color: "#353b48",
                fontSize: 15,
                paddingHorizontal: 24,
              }}
              showCancel={false}
              cancelButtonProps={{ color: "#2f3640" }}
            ></SearchBar> */}
            {/* <Searchbar
              value={address}
              onChangeText={setAddress}
              elevation={2}
              placeholder="Search Location"
              style={{
                width: wp("58%"),
                backgroundColor: "white",
              }}
              mode="bar"
              onIconPress={handleBell}
              loading={false}
            ></Searchbar> */}
            <GooglePlaces />
          </View>
          <MapView
            mapType={mapType}
            zoomEnabled={true}
            zoomControlEnabled={true}
            zoomTapEnabled={true}
            showsBuildings={true}
            showsPointsOfInterest={true}
            showsCompass={true}
            showsTraffic={trafficVisible}
            showsIndoors={true}
            style={{ flex: 1 }}
            userInterfaceStyle={"dark"}
            showsUserLocation={true}
            mapPadding={{ top: 20, right: 10, bottom: 130, left: 90 }}
            provider={mapProvider}
            initialRegion={{
              latitude: 24.837896761320245,
              longitude: 67.03277639731591,
              latitudeDelta: 0.15,
              longitudeDelta: 0.1,
            }}
            region={mapRegion}
          >
            {allCrime.map((crime) => (
              <Circle
                key={`${crime.latitude}-${crime.longitude}`}
                center={{
                  latitude: crime.latitude,
                  longitude: crime.longitude,
                }}
                radius={330}
                fillColor={getColor(crime.label)}
                strokeColor="transparent"
              />
            ))}
            {/* <Circle
              center={{
                latitude: 24.837896761320245,
                longitude: 67.03277639731591,
              }}
              radius={200}
              fillColor="rgba(255, 0, 0, 0.3)"
              strokeColor="transparent"
            /> */}
            {allPosts
              .filter((post) =>
                selectedPostType ? post.PostType === selectedPostType : true
              )
              .map((post) => (
                <Marker
                  key={post.id}
                  coordinate={{
                    latitude: post.latitude,
                    longitude: post.longitude,
                  }}
                  pinColor="red"
                >
                  {post.PostType === "Missing Person" && (
                    <>
                      <TouchableOpacity onPress={openBottomSheet}>
                        <View style={{ position: "relative" }}>
                          <Image
                            source={{
                              uri: `http://172.20.10.7:4000${post.image}`,
                            }}
                            style={{
                              width: 55,
                              height: 55,
                              borderWidth: 0.9,
                              borderColor: "red",
                              borderRadius: 10,
                              shadowColor: "#000",
                              shadowOpacity: 0.5,
                              shadowRadius: 5,
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              margin: 5,
                            }}
                          />
                          <Animated.View
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 11,
                              backgroundColor: "red",
                              paddingHorizontal: 5,
                              paddingVertical: 2,
                              borderTopLeftRadius: 5,
                              borderBottomRightRadius: 5,
                              zIndex: 1,
                              opacity: opacityAnim,
                            }}
                          >
                            <Text style={{ color: "white", fontSize: 9 }}>
                              Missing
                            </Text>
                          </Animated.View>
                        </View>
                      </TouchableOpacity>
                      <BottomSheetModal
                        visible={isModalVisible}
                        onDismiss={() => setIsModalVisible(false)}
                        onClose={closeBottomSheet}
                        containerStyle={{
                          backgroundColor: "rgba(64, 64, 64, 0.4)",
                          backdropFilter: "blur(5px)",
                        }}
                        backgroundStyle={{
                          borderTopLeftRadius: 25,
                          borderTopRightRadius: 25,
                        }}
                        enablePanDownToClose={true}
                        index={0}
                        snapPoints={[260]}
                        style={{
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.32,
                          shadowRadius: 2.42,
                        }}
                        ref={bottomSheetRef}
                      >
                        <View style={{ padding: 20, backgroundColor: "white" }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            {/* Circular image on the left */}
                            <View style={{ marginRight: 10 }}>
                              <Image
                                source={{
                                  uri: `http://172.20.10.7:4000${post.image}`,
                                }}
                                style={{
                                  width: 150,
                                  height: 150,
                                  borderRadius: 75, // half of width and height
                                  overflow: "hidden", // clip the image to be within the circle
                                }}
                              />
                            </View>
                            {/* Post details on the right */}
                            <View style={{ flex: 1 }}>
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  marginBottom: 20,
                                  marginTop: -20,
                                  fontSize: 15,
                                }}
                              >
                                {post.title}
                              </Text>
                              <Text style={{ marginBottom: 5, fontSize: 13 }}>
                                Days since Missing: {post.time}
                              </Text>
                              <Text style={{ marginBottom: 5, fontSize: 13 }}>
                                Last seen at this Location: {post.address}
                              </Text>
                              <Text style={{ marginBottom: 5, fontSize: 13 }}>
                                {post.description}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </BottomSheetModal>
                    </>
                  )}

                  {post.PostType !== "Missing Person" && (
                    <Callout
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 1.1)",
                        borderRadius: 10,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        filter: "blur(25px)",
                      }}
                      tooltip
                    >
                      <View
                        style={{
                          top: 5,
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        <Avatar.Image
                          source={{
                            uri: `http://172.20.10.7:4000${post.PostedByImage}`,
                          }}
                          size={17}
                        />
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            paddingLeft: 4,
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: 600,
                              fontSize: 9,
                              marginTop: 2,
                              color: "black",
                            }}
                          >
                            {post.PostedBy}
                          </Text>
                          <View
                            style={{
                              marginTop: 1,
                              flexDirection: "row",
                            }}
                          >
                            <Text
                              style={{
                                fontSize: 8,
                                fontWeight: 600,
                                color: "#979494",
                              }}
                            >
                              {post.time} •
                            </Text>
                            <EvilIcons
                              name="location"
                              size={8}
                              color="#979494"
                            />
                            <Text
                              style={{
                                fontSize: 8,
                                fontWeight: 600,
                                color: "#979494",
                              }}
                            >
                              {post.address} •
                            </Text>
                            <Text
                              style={{
                                fontSize: 8,
                                fontWeight: 600,
                                color: "#979494",
                                paddingLeft: 2,
                              }}
                            >
                              {post.PostType}
                            </Text>
                          </View>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          marginTop: 3,
                          marginHorizontal: 2,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 11,
                            color: "#0D0907",
                            marginVertical: 3,
                            fontWeight: 700,
                            textAlign: "justify",
                          }}
                        >
                          {post.title}
                        </Text>
                        <Image
                          source={{
                            uri: `http://172.20.10.7:4000${post.image}`,
                          }}
                          style={{
                            width: "100%",
                            height: 130,
                            marginBottom: 3,
                          }}
                        ></Image>
                      </View>
                    </Callout>
                  )}
                </Marker>
              ))}
          </MapView>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: "7%",
              left: "4%",
              backgroundColor: "white",
              borderRadius: 10,
              elevation: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 2.42,
            }}
            onPress={() => resizeMenuBox(1)}
          >
            <IconButton
              icon="menu"
              color="white"
              size={30}
              iconColor="#6619c7"
            />
          </TouchableOpacity>
          {/* Thi is our modal menu code */}
          <Modal transparent visible={isMenuVisible}>
            <SafeAreaView
              style={{ flex: 1 }}
              onTouchStart={() => resizeMenuBox(0)}
            >
              <Animated.View
                style={{
                  transform: [{ scale }],
                  borderRadius: 8,
                  borderColor: "#fff",
                  borderWidth: 1,
                  backgroundColor: "white",
                  position: "absolute",
                  top: vs(92),
                  left: s(14),
                  zIndex: 115,
                  width: s(150),
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 2.42,
                }}
                onTouchStart={(event) => {
                  event.stopPropagation();
                }}
              >
                <View>
                  {/* Hybrid Map Button */}
                  <TouchableOpacity onPress={() => setMapType("hybrid")}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#4CAF50",
                        }}
                      >
                        Hybrid Map
                      </Text>
                      <Entypo name="map" size={20} color="#4CAF50" />
                    </View>
                  </TouchableOpacity>

                  {/* Plain Map Button */}
                  <TouchableOpacity onPress={() => setMapType("standard")}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#2196F3",
                        }}
                      >
                        Plain Map
                      </Text>
                      <Entypo name="map" size={20} color="#2196F3" />
                    </View>
                  </TouchableOpacity>

                  {/* Apple Map button*/}
                  <TouchableOpacity
                    onPress={() => setMapProvider(PROVIDER_DEFAULT)}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#000000",
                        }}
                      >
                        Apple Map
                      </Text>
                      <AntDesign name="apple1" size={20} color="#000000" />
                    </View>
                  </TouchableOpacity>

                  {/* Google Map button */}
                  <TouchableOpacity onPress={() => setMapProvider("google")}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#DB4437",
                        }}
                      >
                        Google Map
                      </Text>
                      <AntDesign name="google" size={20} color="#DB4437" />
                    </View>
                  </TouchableOpacity>

                  {/* Show Traffic Button */}
                  <TouchableOpacity
                    onPress={() => setTrafficVisible(!trafficVisible)}
                  >
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#9C27B0",
                        }}
                      >
                        Show Traffic
                      </Text>
                      <FontAwesome5
                        name="traffic-light"
                        size={20}
                        color="#9C27B0"
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Show POstype markerButton */}
                  <TouchableOpacity onPress={handleShowReports}>
                    <View
                      style={{
                        padding: 10,
                        borderBottomWidth: 0.5,
                        borderColor: "#ccc",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "brown",
                        }}
                      >
                        Sort by Types
                      </Text>
                      <FontAwesome name="map-marker" size={21} color="brown" />
                    </View>
                  </TouchableOpacity>

                  {showReports &&
                    data.map((item) => (
                      <TouchableOpacity
                        key={item.key}
                        onPress={() => handlePress(item.value)}
                      >
                        <View
                          style={{
                            padding: 10,
                            borderBottomWidth: 0.5,
                            borderColor: "#ccc",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              color: "#979494",
                            }}
                          >
                            {item.value}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                </View>
              </Animated.View>
            </SafeAreaView>
          </Modal>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: "7%",
              right: "4%",
              backgroundColor: "white",
              borderRadius: 10,
              elevation: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 2.42,
            }}
            onPress={() => resizeBox(1)}
          >
            <Badge
              position="absolute"
              right={2}
              top={2}
              backgroundColor="#e84118"
            >
              {allPosts.length}
            </Badge>
            <IconButton
              icon="bell"
              color="white"
              size={30}
              iconColor="#6619c7"
            />
          </TouchableOpacity>

          {/* Thi is our modal alert code */}
          <Modal transparent visible={isVisible}>
            <SafeAreaView style={{ flex: 1 }} onTouchStart={() => resizeBox(0)}>
              <Animated.View
                style={{
                  transform: [{ scale }],
                  borderRadius: 8,
                  borderColor: "#fff",
                  borderWidth: 1,
                  backgroundColor: "white",
                  position: "absolute",
                  top: vs(92),
                  left: s(110),
                  zIndex: 115,
                  width: s(225),
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 2.42,
                }}
                onTouchStart={(event) => {
                  event.stopPropagation();
                }}
              >
                {allPosts.map((post, index) => (
                  <View key={index}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        padding: 10,
                      }}
                    >
                      <View style={{ width: "10%" }}>
                        <Avatar.Image
                          size={22}
                          source={{
                            uri: `http://172.20.10.7:4000${post.PostedByImage}`,
                          }}
                          style={{}}
                        />
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          width: "75%",
                          paddingLeft: 3,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontWeight: 500,
                            color: "#0D0907",
                          }}
                        >
                          {post.title}
                        </Text>
                        <View style={{ flexDirection: "row", gap: 5 }}>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 300,
                              color: "#0D0907",
                            }}
                          >
                            {post.time}
                          </Text>
                          <Text
                            style={{
                              fontSize: 10,
                              fontWeight: 400,
                              color: "blue",
                            }}
                          >
                            See More
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          paddingLeft: 10,
                          gap: 4,
                          width: "20%",
                        }}
                      >
                        <AntDesign
                          name="like2"
                          size={13}
                          color="#0D0907"
                          onPress={() => console.log("Like")}
                        />
                        <AntDesign name="dislike2" size={13} color="#0D0907" />
                      </View>
                    </View>
                    <Divider />
                  </View>
                ))}
              </Animated.View>
            </SafeAreaView>
          </Modal>

          <TouchableOpacity
            style={{
              position: "absolute",
              top: "75%",
              left: "6%",
              backgroundColor: "white",
              borderRadius: 10,
              padding: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.32,
              shadowRadius: 2.42,
            }}
            onPress={getCurrentLocation}
          >
            <MaterialIcons name="my-location" size={30} color="#6619c7" />
          </TouchableOpacity>
          <View
            style={{
              position: "absolute",
              top: vs(444),
              left: Platform.OS == "ios" ? s(259) : s(165),
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.7)",
              padding: 5,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#ccc",
            }}
          >
            <View style={{ display: "flex", flexDirection: "column" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    marginRight: 5,
                  }}
                />
                <Text style={{ fontSize: 10, color: "#333" }}>Blacklisted</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginRight: 10,
                }}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "rgba(255, 0, 0, 0.6)",
                    marginRight: 5,
                  }}
                />
                <Text style={{ fontSize: 10, color: "#333" }}>High Crime</Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: "rgba(255, 165, 0, 0.6)",
                    marginRight: 5,
                  }}
                />
                <Text style={{ fontSize: 10, color: "#333" }}>
                  Moderate Crime
                </Text>
              </View>
            </View>
          </View>

          <SpeedDial
            containerStyle={{
              top: vs(374),
              left: Platform.OS == "ios" ? s(195) : s(165),
            }}
            placement="top"
            color="#6619c7"
            isOpen={open}
            icon={{ name: "edit", color: "#fff" }}
            openIcon={{ name: "close", color: "#fff" }}
            onOpen={() => setOpen(!open)}
            onClose={() => setOpen(!open)}
          >
            <SpeedDial.Action
              titleStyle={{
                top: vs(374),
                left: Platform.OS == "ios" ? s(195) : s(165),
              }}
              containerStyle={{
                top: vs(374),
                left: Platform.OS == "ios" ? s(195) : s(165),
              }}
              icon={{ name: "camera-alt", color: "#fff" }}
              title="Camera"
              buttonStyle={{ backgroundColor: "#6619c7" }}
              onPress={() => {
                setGalleryImage(null);
                navigation.navigate("CameraModel");
              }}
            />

            <SpeedDial.Action
              titleStyle={{
                top: vs(374),
                left: Platform.OS == "ios" ? s(195) : s(165),
              }}
              containerStyle={{
                top: vs(374),
                left: Platform.OS == "ios" ? s(195) : s(165),
              }}
              icon={{ name: "add", color: "#fff" }}
              title="Add report"
              onPress={handlePresentModal}
              buttonStyle={{ backgroundColor: "#6619c7" }}
            />
          </SpeedDial>

          {/* <TouchableOpacity
                style={{
                  position: "absolute",
                  top: "75%",
                  right: "6%",
                  backgroundColor: "#6619c7",
                  borderRadius: 75,
                  padding: 10,
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.32,
                  shadowRadius: 2.42,
                }}
                onPress={handlePresentModal}
              >
                <MaterialIcons name="add" size={30} color="white" />
              </TouchableOpacity> */}
        </View>

        {/*bottom sheet modal start here*/}

        <Formik
          initialValues={{
            title: "",
            description: "",
          }}
          validateOnMount={true} //jab form render ho to validate karo
          onSubmit={handleSubmit}
          validationSchema={PostValidationSchema}
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
            <BottomSheetModal
              containerStyle={{
                backgroundColor: "rgba(64, 64, 64, 0.4)",
                backdropFilter: "blur(5px)",
              }}
              backgroundStyle={{
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}
              enablePanDownToClose={true}
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onDismiss={() => setIsOpen(false)}
              style={{
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.32,
                shadowRadius: 2.42,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 80,
                    borderBottomWidth: 1,
                    borderBottomColor: "rgba(0, 0, 0, 0.1)",
                    elevation: 5,
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    backgroundColor: "white",
                  }}
                >
                  <TouchableOpacity onPress={handleCloseModal}>
                    <IconButton
                      icon="close"
                      color="white"
                      size={26}
                      iconColor="#6619c7"
                    />
                  </TouchableOpacity>

                  <View
                    style={{ marginLeft: Platform.OS == "ios" ? s(20) : s(1) }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        color: "#979494",
                        marginTop: 15,
                      }}
                    >
                      Create Post
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#6619c7",
                      position: "absolute",
                      borderRadius: 6,
                      elevation: 10,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.32,
                      shadowRadius: 2.42,
                      width: 70,
                      height: 38,
                      right: s(18),
                      marginTop: 4,
                    }}
                    onPress={handleSubmit}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        marginTop: 9,
                        color: "white",
                        fontSize: 18,
                        fontWeight: "500",
                      }}
                    >
                      Post
                    </Text>
                  </TouchableOpacity>
                </View>
                <ScrollView
                  contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                >
                  <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({
                      ios: 100,
                      android: 100,
                    })}
                    behavior="position"
                  >
                    <View
                      style={{
                        position: "absolute",
                        zIndex: 1,
                        left: s(86),
                        top: vs(21),
                      }}
                    >
                      <Searchbar
                        value={address}
                        onChangeText={setAddress}
                        elevation={2}
                        placeholder="Search Location"
                        style={{
                          width: s(184),

                          backgroundColor: "white",
                        }}
                        mode="bar"
                        loading={false}
                      ></Searchbar>
                    </View>
                    <View
                      style={{
                        marginTop: 7,
                        padding: 10,
                        height: vs(216),
                        width: s(332),
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.3,
                        shadowRadius: 2.4,
                        marginLeft: 10,
                      }}
                    >
                      <MapView
                        // mapType="hybrid"
                        zoomEnabled={true}
                        zoomControlEnabled={true}
                        zoomTapEnabled={true}
                        showsBuildings={true}
                        showsPointsOfInterest={true}
                        showsCompass={true}
                        showsTraffic={true}
                        style={{ flex: 1, borderRadius: 10 }}
                        userInterfaceStyle={"dark"}
                        showsUserLocation={true}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                          latitude: 24.831737462967272,
                          longitude: 67.03819606432222,
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.01,
                        }}
                        region={mapRegion}
                      >
                        <Marker
                          isPreselected={true}
                          draggable
                          coordinate={mapRegion}
                          pinColor="color"
                          tappable={true}
                          onDragStart={(e) => {
                            console.log("Drag start", e.nativeEvent.coordinate);
                          }}
                          onDragEnd={(e) => {
                            console.log("Drag end", e.nativeEvent.coordinate);
                            setLongPost(e.nativeEvent.coordinate.longitude);
                            setLatPost(e.nativeEvent.coordinate.latitude);
                          }}
                        >
                          <Callout>
                            <Text>Place your Marker</Text>
                          </Callout>
                        </Marker>
                      </MapView>
                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: "79%",
                          left: "6%",
                          backgroundColor: "white",
                          borderRadius: 10,
                          padding: 10,
                          shadowOffset: {
                            width: 0,
                            height: 1,
                          },
                          shadowOpacity: 0.32,
                          shadowRadius: 2.42,
                        }}
                        onPress={getCurrentLocation}
                      >
                        <MaterialIcons
                          name="my-location"
                          size={20}
                          color="#6619c7"
                        />
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        padding: 10,
                        width: wp("92%"),
                        alignSelf: "center",
                        marginTop: 10,
                      }}
                    >
                      <SelectList
                        boxStyles={{ borderRadius: 8, borderColor: "#979494" }}
                        dropdownStyles={{ borderColor: "#979494" }}
                        disabledTextStyles={{ color: "#718093" }}
                        setSelected={(val) => setSelected(val)}
                        data={data}
                        arrowicon={
                          <Ionicons
                            name="chevron-down"
                            size={12}
                            color={"black"}
                          />
                        }
                        searchicon={
                          <Ionicons name="search" size={15} color={"#979494"} />
                        }
                        search={true}
                        searchPlaceholder="Search"
                        placeholder="Type of report"
                      />
                    </View>

                    <View
                      style={{
                        padding: 10,
                        alignItems: "center",
                      }}
                    >
                      <TextInput
                        //   onBlur={handleBlur("name")}

                        onBlur={handleBlur("title")}
                        value={values.title}
                        onChangeText={handleChange("title")}
                        activeUnderlineColor="#6619c7"
                        label="Title"
                        placeholder="Please enter the title"
                        textAlignVertical="top"
                        textAlign="left"
                        type="flat"
                        style={{
                          width: wp("88%"),

                          marginTop: 11,
                          backgroundColor: "#ecf0f1",
                          textAlignVertical: "top",
                          textAlign: "left",
                        }}
                      ></TextInput>
                      {errors.title && touched.title && (
                        <Text
                          style={{
                            paddingTop: 5,
                            color: "red",
                            fontSize: 12,
                            fontWeight: 500,
                            width: s(290),
                          }}
                        >
                          {errors.title}
                        </Text>
                      )}

                      <TextInput
                        onBlur={handleBlur("description")}
                        value={values.description}
                        onChangeText={handleChange("description")}
                        activeUnderlineColor="#6619c7"
                        label="Description"
                        placeholder="Please enter the description"
                        // multiline={true}
                        type="outlined"
                        style={{
                          width: wp("88%"),
                          height: hp("20%"),
                          marginTop: 14,
                          fontSize: 16,
                          backgroundColor: "#ecf0f1",
                        }}
                      />

                      {errors.description && touched.description && (
                        <Text
                          style={{
                            paddingTop: 5,
                            color: "red",
                            fontSize: 12,
                            fontWeight: 500,
                            width: s(290),
                          }}
                        >
                          {errors.description}
                        </Text>
                      )}
                      {galleryImage ||
                      cameraImage ||
                      galleryVideo ||
                      cameraVideo ? (
                        <View
                          style={{
                            padding: 10,
                            alignItems: "center",
                            borderRadius: 5,
                            flexDirection: "row",
                            gap: 5,
                            marginTop: 18,
                            shadowOffset: {
                              width: 0,
                              height: 1,
                            },
                            shadowOpacity: 0.32,
                            shadowRadius: 2.42,
                          }}
                        >
                          {cameraVideo || galleryVideo ? (
                            <Video
                              source={{ uri: cameraVideo?.uri || galleryVideo }}
                              style={{ width: s(300), height: vs(300) }}
                              useNativeControls
                              resizeMode="contain"
                              isLooping
                              controls={true}
                            />
                          ) : (
                            <Image
                              source={{ uri: galleryImage || cameraImage }}
                              style={{ width: s(300), height: vs(300) }}
                            />
                          )}
                        </View>
                      ) : null}
                      {/* <Video
                        source={{
                          uri: "https://www.youtube.com/watch?v=gDUzaANQ01A",
                        }} // Can be a URL or a local file.
                        // onBuffer={this.onBuffer}
                        // onError={this.videoError}
                        style={{
                          width: "100%",
                          height: 300,
                        }}
                        // controls={true}
                      /> */}
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          gap: 30,
                          marginTop: 20,
                        }}
                      >
                        <ThemedButton
                          name="bruce"
                          type="secondary"
                          width={70}
                          borderColor={"#8f1ee6"}
                          backgroundDarker={"#8f1ee6"}
                          textColor="#8f1ee6"
                          // progress={true}
                          // progressLoadingTime={10000}
                          onPress={() => {
                            setGalleryImage(null);
                            navigation.navigate("CameraModel");
                            handleCloseModal();
                          }}
                        >
                          <Ionicons
                            name="ios-camera"
                            size={35}
                            color={"#6619c7"}
                          />
                        </ThemedButton>
                        <ThemedButton
                          name="bruce"
                          onPress={pickImage}
                          type="secondary"
                          width={70}
                          borderColor={"#8f1ee6"}
                          backgroundDarker={"#8f1ee6"}
                          textColor="#8f1ee6"
                          // progress={true}
                          // progressLoadingTime={10000}
                          // onPressedOut={() => navigation.navigate("ReportDetail")}
                        >
                          <Ionicons
                            name="ios-images"
                            size={33}
                            color={"#6619c7"}
                          />
                        </ThemedButton>
                      </View>
                    </View>
                  </KeyboardAvoidingView>
                </ScrollView>
              </View>
            </BottomSheetModal>
          )}
        </Formik>
      </View>
    </View>
  );
}
