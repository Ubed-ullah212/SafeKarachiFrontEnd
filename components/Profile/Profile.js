import {
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Avatar } from "@rneui/themed";
import { MaterialIcons } from "@expo/vector-icons";
import { Image } from "@rneui/base";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { s, vs } from "react-native-size-matters";
import moment from "moment";
import { useDispatch } from "react-redux";
import { setUser } from "../store/actions/user";
import LikesRoutes from "./LikesRoutes";
import PostRoutes from "./PostRoutes";

const Profile = () => {
  const renderScene = SceneMap({
    first: () => <PostRoutes userData={userData} />,
    second: () => <LikesRoutes userData={userData} />,
  });
  {
    /*api of fetch user data*/
  }
  const navigation = useNavigation();
  const [userData, setUserData] = useState([]);

  const dispatch = useDispatch();

  const fetchUserData = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.get(
        "http://172.20.10.7:4000/api/v1/SingleUser",
        config
      );

      const userDataFromAPI = response.data.data;

      const processedSingleUserData = {
        id: userDataFromAPI?.id,
        name: userDataFromAPI?.Name,
        phoneNumber: userDataFromAPI?.PhoneNumber,
        dob: userDataFromAPI?.DOB,
        email: userDataFromAPI?.Email,
        image: userDataFromAPI?.Image,

        postedByData: (userDataFromAPI?.PostedByData || []).map((post) => ({
          id: post?.id,
          title: post?.Title,
          description: post?.Description,
          status: post?.Status,
          longitude: post?.longitude,
          latitude: post?.latitude,
          imageUri: post?.Image,
          time: post?.createdAt ? moment(post.createdAt).fromNow() : undefined,
          PostType: post?.TypeData ? post.TypeData.Name : undefined,
        })),
        userLikedData: (userDataFromAPI?.UserLikedData || []).map(
          (likedPost) => ({
            id: likedPost?.id,
            title: likedPost?.PostLikedData?.Title,
            description: likedPost?.PostLikedData?.Description,
            status: likedPost?.PostLikedData?.Status,
            longitude: likedPost?.PostLikedData?.longitude,
            latitude: likedPost?.PostLikedData?.latitude,
            imageUri: likedPost?.PostLikedData?.Image,
            time: likedPost?.PostLikedData?.createdAt
              ? moment(likedPost.PostLikedData.createdAt).fromNow()
              : undefined,
            postedByData: likedPost?.PostLikedData?.PostedByData
              ? {
                  id: likedPost.PostLikedData.PostedByData.id,
                  name: likedPost.PostLikedData.PostedByData.Name,
                  image: likedPost.PostLikedData.PostedByData.Image,
                }
              : undefined,
          })
        ),
        userIdCommentData: (userDataFromAPI?.UserIdCommentData || []).map(
          (commentedPost) => ({
            id: commentedPost?.id,
            title: commentedPost?.PostCommentData?.Title,
            description: commentedPost?.PostCommentData?.Description,
            status: commentedPost?.PostCommentData?.Status,
            longitude: commentedPost?.PostCommentData?.longitude,
            latitude: commentedPost?.PostCommentData?.latitude,
          })
        ),
      };

      setUserData(processedSingleUserData);
      dispatch(setUser(processedSingleUserData));
      console.log(userData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
      return;
    }, [])
  );

  //navigation

  //routes
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {
      key: "first",
      title: "Posts",
    },
    {
      key: "second",
      title: "Likes",
    },
  ]);

  const renderTab = (prop) => (
    <TabBar
      {...prop}
      indicatorStyle={{ backgroundColor: "#6619c7" }}
      style={{
        backgroundColor: "white",
        height: vs(40),
      }}
      renderLabel={({ focused, route }) => (
        <Text
          style={[
            {
              color: focused ? "black" : "#979494",
              fontSize: 18,
            },
          ]}
        >
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <View style={{ width: wp("100%"), height: hp("100%") }}>
      <View
        style={{
          flex: 1.4,
          alignItems: "center",
          backgroundColor: "#6619c7",
        }}
      >
        <Image
          // source={{ uri: `http://172.20.10.7:4000${userData.cover}` }}
          source={require('../assets/123.jpg')} 
          resizeMode="cover"
          style={{
            width: wp("100%"),
            height: hp("22%"),
          }}
        />
      </View>
      <TouchableOpacity >
        <Avatar.Accessory  onPress={() => navigation.navigate("EditProfile", { userData })}
          name="photo-camera"
          size={32}
          iconStyle={{ color: "white" }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 5,
          backgroundColor: "#fff",
          alignItems: "center",
        }}
      >
        <Avatar
          size={148}
          rounded
          source={{ uri: `http://172.20.10.7:4000${userData.image}` }}
          containerStyle={{
            backgroundColor: "purple",
            borderWidth: 1,
            borderColor: "grey",
            marginTop: -86,
          }}
        >
          <TouchableOpacity>
            <Avatar.Accessory  onPress={() => navigation.navigate("EditProfile", { userData })}
              name="photo-camera"
              size={32}
              iconStyle={{ color: "white" }}
            />
          </TouchableOpacity>
        </Avatar>
        <Text
          style={{
            marginVertical: 8,
            fontSize: 26,
            fontWeight: 800,
            color: "#242760",
          }}
        >
          {userData.name}
        </Text>
        <Text
          style={{
            marginVertical: 6,
            fontSize: 15,
            fontWeight: 400,
            color: "#242760",
          }}
        >
          Safety Journalist | Szabist | System's Limited
        </Text>

        <View
          style={{
            paddingVertical: 10,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              marginHorizontal: vs(20),
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 700, color: "#242760" }}>
              {userData.postedByData ? userData.postedByData.length : 0}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#242760" }}>
              Posts
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 700, color: "#242760" }}>
              {userData.userLikedData ? userData.userLikedData.length : 0}
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#242760" }}>
              Likes
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              flexDirection: "column",
              marginHorizontal: 20,
            }}
          >
            <Text style={{ fontSize: 22, fontWeight: 700, color: "#242760" }}>
              45
            </Text>
            <Text style={{ fontSize: 18, fontWeight: 400, color: "#242760" }}>
              Followers
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 8 }}>
          <TouchableOpacity
            style={{
              width: s(120),
              height: vs(34),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#6619c7",
              borderRadius: 8,
              marginHorizontal: 14,
              elevation: 10,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2.4,
              flexDirection: "row",
              gap: 5,
            }}
            onPress={() => navigation.navigate("EditProfile", { userData })}
          >
            <MaterialIcons name="edit" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 18 }}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: s(120),
              height: vs(34),
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#6619c7",
              borderRadius: 8,
              marginHorizontal: 14,
              elevation: 8,
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.3,
              shadowRadius: 2.4,
              flexDirection: "row",
              gap: 5,
            }}
            onPress={() => navigation.navigate("Login")}
          >
            <MaterialIcons name="logout" size={18} color="white" />
            <Text style={{ color: "white", fontSize: 18 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 350,
            width: layout.width * 0.85,
            marginHorizontal: 22,
            marginTop: 10,
          }}
        >
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTab}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;
