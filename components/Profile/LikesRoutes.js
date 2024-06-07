import { Text, View, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { AntDesign } from "@expo/vector-icons";
import { Image } from "@rneui/base";

import { s, vs, ms } from "react-native-size-matters";

import { EvilIcons } from "@expo/vector-icons";
import CustomAvatar from "../UserFeed/Comment Component/Avatar";

const LikesRoutes = ({ userData }) => {
    const filteredUserLikedData = userData?.userLikedData?.filter(
      (item) => item?.title && item?.description
    );
  
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={filteredUserLikedData}
          numColumns={2}
          renderItem={({ item }) => <LikesItem likedPost={item} />}
        />
      </View>
    );
  };
  

const LikesItem = ({ likedPost, userData }) => (
  <TouchableOpacity
    style={{
      // aspectRatio: 0.9,
      margin: 3,
      backgroundColor: "white",
      borderRadius: 5,
      paddingVertical: 4,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.32,
      shadowRadius: 2.42,
      width: "50%",
      elevation: 15,
      padding: 4,
    }}
  >
    <View style={{ top: 5, display: "flex", flexDirection: "row" }}>
      <CustomAvatar
        source={{
          uri: `http://172.20.10.7:4000${likedPost.postedByData?.image}`,
        }}
      />

      <View
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Text
          style={{
            fontWeight: 700,
            fontSize: 16,
            marginTop: vs(2),
            paddingLeft: s(4),
            color: "black",
          }}
        >
          {likedPost.postedByData?.name}
        </Text>
        <View
          style={{
            paddingLeft: s(4),
            marginBottom: vs(3),
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 9,
              fontWeight: 500,
              color: "#979494",
            }}
          >
            {likedPost?.time} •
          </Text>

          <Text
            style={{
              fontSize: 9,
              fontWeight: 500,
              color: "#979494",
              paddingLeft: s(2),
            }}
          >
            {likedPost?.PostType}
          </Text>
        </View>
      </View>
    </View>
    <View
      style={{
        flexDirection: "column",
        marginTop: 2,
        marginHorizontal: 5,
      }}
    >
      <Text
        //numberOfLines={4}
        style={{
          fontSize: 12,
          color: "#0D0907",
          marginBottom: 3,
          fontWeight: "700",
          textAlign: "justify",
        }}
      >
        {likedPost?.title}
      </Text>
      <Text
        //numberOfLines={2}
        style={{
          fontSize: 12,
          color: "#0D0907",
          marginBottom: 10,
          textAlign: "justify",
        }}
      >
        {likedPost.description}
      </Text>
      <Image
        source={{ uri: `http://172.20.10.7:4000${likedPost?.imageUri}` }}
        style={{
          width: wp("40%"),
          height: vs(110),

          borderRadius: ms(0),
        }}
      ></Image>

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: vs(10),
        }}
      >
        <TouchableOpacity>
          <AntDesign marginTop={2} name="like1" size={21} color={"#979494"} />
        </TouchableOpacity>
        <Text
          style={{
            color: "#0D0907",
            top: 6,
            paddingLeft: 8,
            fontSize: 15,
          }}
        >
          {likedPost?.PostLikes}
        </Text>
        {/* <TouchableOpacity style={{ padding: 8 }}>
          <AntDesign marginTop={2} name="dislike1" size={21} />
        </TouchableOpacity> */}

        <TouchableOpacity>
          <EvilIcons
            name="comment"
            size={28}
            color={"#979494"}
            paddingLeft={40}
            marginTop={3}
          />
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default LikesRoutes;
