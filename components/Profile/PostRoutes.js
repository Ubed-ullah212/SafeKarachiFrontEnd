import {
 
    Text,
    View,
    TouchableOpacity,

    FlatList,
    TextInput,
    KeyboardAvoidingView,
    Alert,
  } from "react-native";
  import React, { useEffect, useState } from "react";

  import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from "react-native-responsive-screen";

  import { MaterialIcons, AntDesign } from "@expo/vector-icons";
  import { Image } from "@rneui/base";

  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  import { s, vs, ms } from "react-native-size-matters";
  import * as ImagePicker from "expo-image-picker";
  import Modal from "react-native-modal";
  import { EvilIcons } from "@expo/vector-icons";
  import CustomAvatar from "../UserFeed/Comment Component/Avatar";
  import moment from "moment";








const PostRoutes = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [postTitle, setPostTitle] = useState("");
    const [postDescription, setPostDescription] = useState("");
    const [postImage, setPostImage] = useState("");
    const [userData, setUserData] = useState({});
  
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
            userLikedData: (userDataFromAPI?.UserLikedData || []).map((likedPost) => ({
              id: likedPost?.id,
              title: likedPost?.PostLikedData?.Title,
              description: likedPost?.PostLikedData?.Description,
              status: likedPost?.PostLikedData?.Status,
              longitude: likedPost?.PostLikedData?.longitude,
              latitude: likedPost?.PostLikedData?.latitude,
              imageUri: likedPost?.PostLikedData?.Image,
              time: likedPost?.PostLikedData?.createdAt ? moment(likedPost.PostLikedData.createdAt).fromNow() : undefined,
              postedByData: likedPost?.PostLikedData?.PostedByData ? {
                id: likedPost.PostLikedData.PostedByData.id,
                name: likedPost.PostLikedData.PostedByData.Name,
                image: likedPost.PostLikedData.PostedByData.Image,
              } : undefined,
            })),
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
        console.log(userData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    
    useEffect(() => {
      fetchUserData();
    }, []);
  
    const saveEditPost = async (values) => {
      const userToken = await AsyncStorage.getItem("userToken");
  
      const formData = new FormData();
      formData.append("Title", postTitle);
      formData.append("Description", postDescription);
  
      if (postImage) {
        const fileExtension = postImage.split(".").pop().toLowerCase();
        const mimeType = fileExtension === "jpg" ? "image/jpeg" : "image/jpeg";
  
        formData.append("Media", {
          uri: postImage,
          type: mimeType,
          name: `upload.${fileExtension}`, // Dynamically set the file name based on the URI
        });
      }
  
      const config = {
        headers: {
          authorization: userToken,
          "Content-Type": "multipart/form-data",
        },
      };
  
      await axios
        .put(
          `http://172.20.10.7:4000/api/v1/EditPost/${selectedPost.id}`,
          formData,
          config
        )
        .then((res) => {
          console.log(res);
          fetchUserData();
          setModalVisible(false);
          setSelectedPost({});
          setPostTitle("");
          setPostDescription("");
          setEditMode(false);
          setPostImage("");
          Alert.alert("Success", "Post edited successfully!");
        })
        .catch((err) => console.log("Error", err.message));
    };
   
    const deletePost = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const config = {
          headers: {
            authorization: userToken,
          },
        };
  
        const response = await axios.delete(
          `http://172.20.10.7:4000/api/v1/SoftDeletePost/${selectedPost.id}`,
  
          config
        );
        console.log(response);
        console.log("succeed");
        fetchUserData();
        setEditMode(false);
  
        Alert.alert("Success", "Post has been deleted successfully!", [
          {
            text: "OK",
          },
        ]);
        setModalVisible(false);
        setSelectedPost({});
      } catch (error) {
        console.error("Error commenting on post:", error);
        throw error;
      }
    };
    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
     
  
      if (!result.canceled) {
        setPostImage(result.assets[0].uri);
        if (editMode) {
          setModalVisible(true);
        }
      }
    };
  
    return (
      <View style={{ flex: 1, paddingVertical: 10 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userData.postedByData}
          numColumns={2}
          renderItem={({ item }) => (
            <PostItem
              post={item}
              userData={userData}
              onPostItemLongPress={() => {
                console.log("i", item);
                setSelectedPost(item);
                setModalVisible(true);
              }}
            />
          )}
        />
        <Modal
          onBackdropPress={() => {
            setModalVisible(false);
            setSelectedPost({});
            setEditMode(false);
            setPostTitle("");
            setPostDescription("");
          }}
          isVisible={isModalVisible}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View
              key={selectedPost.id}
              style={{
                marginVertical: 10,
                height: 470,
                backgroundColor: "#fcfbfe",
                borderRadius: 10,
                padding: 10,
  
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.32,
                shadowRadius: 2.42,
                elevation: 15,
              }}
            >
              <View style={{ top: 5, display: "flex", flexDirection: "row" }}>
                <CustomAvatar
                  source={{
                    uri: `http://172.20.10.7:4000${userData.image}`,
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
                      fontSize: 18,
                      marginTop: vs(2),
                      paddingLeft: s(10),
                      color: "black",
                    }}
                  >
                    {userData.name}
                  </Text>
                  <View
                    style={{
                      paddingLeft: s(10),
                      marginTop: vs(1),
                      flexDirection: "row",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "#979494",
                      }}
                    >
                      {selectedPost.time} •
                    </Text>
                    <EvilIcons name="location" size={17} color="#979494" />
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: "#979494",
                      }}
                    >
                      DHA Phase V •
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 400,
                        color: "#979494",
                        paddingLeft: s(2),
                      }}
                    >
                      {selectedPost.PostType}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setEditMode(true);
                  }}
                  style={{ position: "absolute", left: vs(255) }}
                >
                  <MaterialIcons name="edit" size={25} color="black" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  marginTop: 12,
                  // marginHorizontal: 5,
                }}
              >
                <TextInput
                  //numberOfLines={4}
                  editable={editMode ? true : false}
                  placeholder={selectedPost.title}
                  value={postTitle}
                  onChangeText={(text) => {
                    setPostTitle(text);
                  }}
                  placeholderTextColor={"#0D0907"}
                  style={{
                    fontSize: 18,
                    color: "#0D0907",
                    marginBottom: 1,
                    fontWeight: "700",
                    textAlign: "justify",
                  }}
                />
  
                <TextInput
                  editable={editMode ? true : false}
                  placeholder={selectedPost.description}
                  value={postDescription}
                  onChangeText={(text) => {
                    setPostDescription(text);
                  }}
                  placeholderTextColor={"#0D0907"}
                  //numberOfLines={4}
                  style={{
                    fontSize: 13,
                    color: "#0D0907",
  
                    textAlign: "justify",
                  }}
                />
                <TouchableOpacity
                  disabled={editMode ? false : true}
                  onPress={pickImage}
                  style={{
                    width: wp("90%"),
                    height: vs(270),
                    marginHorizontal: -10,
                  }}
                >
                  <Image
                    source={{
                      uri:
                        postImage ||
                        `http://172.20.10.7:4000${selectedPost.imageUri}`,
                    }}
                    style={{
                      height: "100%",
                      width: "100%",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,
                    justifyContent: "space-between",
                    paddingHorizontal: 0,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert("Warning", "Are you sure to delete the post?", [
                        {
                          text: "cancel",
                        },
                        {
                          text: "delete",
                          onPress: () => {
                            deletePost();
                          },
                        },
                      ]);
                    }}
                    style={{
                      width: s(90),
                      height: vs(34),
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#6619c7",
                      borderRadius: 8,
  
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
                  >
                    <MaterialIcons name="delete" size={18} color="white" />
                    <Text style={{ color: "white", fontSize: 14 }}>Delete</Text>
                  </TouchableOpacity>
                  {editMode && (
                    <TouchableOpacity
                      style={{
                        width: s(90),
                        height: vs(34),
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#6619c7",
                        borderRadius: 8,
  
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
                      onPress={saveEditPost}
                    >
                      <MaterialIcons name="check" size={18} color="white" />
                      <Text style={{ color: "white", fontSize: 14 }}>Save</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    );
  };
  

  
const PostItem = ({ post, onPostItemLongPress, userData }) => (
    <TouchableOpacity
      onLongPress={onPostItemLongPress}
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
          source={{ uri: `http://172.20.10.7:4000${userData.image}` }}
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
            {userData.name}
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
              {post.time} •
            </Text>
  
            <Text
              style={{
                fontSize: 9,
                fontWeight: 500,
                color: "#979494",
                paddingLeft: s(2),
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
          {post.title}
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
          {post.description}
        </Text>
        <Image
          source={{ uri: `http://172.20.10.7:4000${post.imageUri}` }}
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
            {post.PostLikes}
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
          <Text
            style={{
              color: "#0D0907",
              top: 6,
              paddingLeft: 7,
              fontSize: 15,
            }}
          >
            {/* {post.PostComments.length} */}
          </Text>
        </View>
      </View>
  
      {/* <Text
        //numberOfLines={4}
        style={{
          fontSize: 13,
          color: "#0D0907",
          marginBottom: 2,
          fontWeight: "600",
          paddingHorizontal: 4,
        }}
      >
        {post.title}
      </Text>
      <Text
        //numberOfLines={4}
        style={{
          fontSize: 11,
          color: "#0D0907",
          marginBottom: 2,
          paddingHorizontal: 4,
        }}
      >
        {post.description}
      </Text>
      <View style={{ width: wp("40%"), height: vs(110) }}>
        <Image
          source={require("./assets/Robbery.webp")}
          style={{
            height: "100%",
            width: "100%",
          }}
        />
      </View> */}
    </TouchableOpacity>
  );

  
  export default PostRoutes;