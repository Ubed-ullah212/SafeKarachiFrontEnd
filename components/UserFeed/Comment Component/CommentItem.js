import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// const likeComment = async (commentId) => {
//   try {
//     const userToken = await AsyncStorage.getItem("userToken");
//     const config = {
//       headers: {
//         authorization: userToken,
//       },
//     };

//     const response = await axios.post(
//       `http://172.20.10.7:4000/api/v1/LikedComment/${commentId}`,

//       config
//     );
//     console.log("COMMENT ID " + commentId);
//     console.log(response);

//   } catch (error) {
//     console.error("Error liking comment:", error);
//     throw error;
//   }
// };

const CommentItem = ({ comment }) => {


  
  const likeComment = async (commentId) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.post(
        `http://172.20.10.7:4000/api/v1/LikedComment/${commentId}`,
        commentId,
        config
      );
      console.log("COMMENT ID of liked comment" + commentId);
      console.log(response);
    } catch (error) {
      console.error("Error liking on post:", error);
      throw error;
    }
  };
  const dislikeComment = async (commentId) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.delete(
        `http://172.20.10.7:4000/api/v1/UnLikeComment/${commentId}`,
      
        config
      );
      console.log("COMMENT ID of unliked comment " + commentId);
      console.log(response);
    } catch (error) {
      console.error("Error liking on post:", error);
      throw error;
    }
  };
 

  return (
    <View style={{ padding: 8, flexDirection: "row" }}>
      <Avatar.Image
        size={44}
        source={{
          uri: `http://172.20.10.7:4000${comment.UserCommentData.image}`,
        }}
      />

      <View style={{ marginLeft: 7, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 2,
            paddingVertical: 2,
          }}
        >
          <Text style={{ fontWeight: 800, fontSize: 13, color: "black" }}>
            {comment.UserCommentData.name}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: 400,
              color: "#979494",
              marginLeft: 5,
            }}
          >
            {comment.createdAt}
          </Text>
        </View>

        <Text style={{ fontSize: 13, color: "black", marginTop: 4 }}>
          {comment.comment}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("comment id of liked comment", comment.id);
              likeComment(comment.id);
          
            }}
          >
            <AntDesign
              name="like1"
              size={16}
              color={"#979494"}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 15, color: "#979494", paddingLeft: 5 }}>
            {comment.commentLikesCount}
          </Text>
          <TouchableOpacity
             style={{ marginLeft:5,marginTop:3 }}
            onPress={() => {
              console.log("comment id of unliked comment", comment.id);
              dislikeComment(comment.id);
          
            }}
          >
            <AntDesign
              name="dislike1"
              size={16}
              color={"#979494"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CommentItem;
