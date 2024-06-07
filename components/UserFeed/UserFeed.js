import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "react-native-vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { IconButton, Avatar, Searchbar } from "react-native-paper";
import { Feather, EvilIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { AntDesign, MaterialIcons, Octicons } from "@expo/vector-icons";
import { s, vs, ms, mvs } from "react-native-size-matters";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import CommentItem from "./Comment Component/CommentItem";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../store/actions/post";
import { Video } from "expo-av";
// import { VLCPlayer, VlCPlayerView } from 'react-native-vlc-media-player';
import * as Location from "expo-location";

const UserFeed = () => {
  //  reverse geocoding for location icon in posts
  // geocoding user location to an address
  // const [userAddress,setUserAddress] = useState();
  // const reverseGeocode = async () =>
  // {
  //   const reverseGeocodeAddress = await Location.reverseGeocodeAsync(
  //     {
  //       longitude: longitude,
  //       latitude: latitude,
  //     }
  //   );
  //   console.log(reverseGeocodeAddress)
  //   setUserAddress(reverseGeocodeAddress[0].name) //isme user address hai
  // }
  // console.log(userAddress);

  //User data from redux state, for dp disply of user in top left app bar and comments
  const user = useSelector((state) => state.userReducer.user);
  console.log("User data from redux state:", user);

  {
    /*Refresh control*/
  }
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPost, setSelectedPost] = useState({});
  const [searchText, setSearchText] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);

    await fetchPost();
    setRefreshing(false);
  };

  {
    /*Search Post API */
  }
  const [post, setPost] = useState([]);
  // console.log("Postttttt", post);
  const searchPosts = async (text) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
        params: {
          Title: text,
          // Description: search,
          // Type: search,
        },
      };
      const response = await axios.get(
        "http://172.20.10.7:4000/api/v1/GetPostListing",
        config
      );

      const postData = response.data.result.items.map((item) => {
        const postComments = item.PostCommentData.map((comment) => ({
          id: comment.id,
          comment: comment.Comment,
          createdAt: moment(comment.createdAt).fromNow(),
          commentLikesCount: comment.likescount,

          UserCommentData: {
            id: comment.UserIdCommentData.id,
            name: comment.UserIdCommentData.Name,
            image: comment.UserIdCommentData.Image,
          },

          PostID: item.id,
        }));

        return {
          id: item.id,
          time: moment(item.createdAt).fromNow(),
          title: item.Title,
          description: item.Description,
          latitude: item.latitude,
          longitude: item.longitude,
          status: item.Status,
          PostedBy: item.PostedByData.Name,
          PostedByImage: item.PostedByData.Image,
          PostType: item.TypeData.Name,
          PostLikes: item.likescount,
          PostComments: postComments,
          image: item.Image,
        };
      });

      setPost(postData);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  {
    /*Fetch Post API , data stored in redux to access in map for long, lat*/
  }

  const dispatch = useDispatch();
  // Define crimeAddresses at a higher scope
  const crimeAddresses = {};

  const fetchPost = async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.get(
        "http://172.20.10.7:4000/api/v1/GetPostListing",
        config
      );

      // Process response to fetch posts and populate crimeAddresses
      const postData = response.data.result.items.map(async (item) => {
        const reverseGeocodeAddress = await Location.reverseGeocodeAsync({
          longitude: item.longitude,
          latitude: item.latitude,
        });

        const crimeType = item.TypeData.Name;

        // Initialize crime type array if it doesn't exist
        if (!crimeAddresses[crimeType]) {
          crimeAddresses[crimeType] = [];
        }

        // Push address to corresponding crime type array
        crimeAddresses[crimeType].push(reverseGeocodeAddress[0].name);

        const postComments = item.PostCommentData.map((comment) => ({
          id: comment.id,
          comment: comment.Comment,
          createdAt: moment(comment.createdAt).fromNow(),
          commentLikesCount: comment.likescount,
          UserCommentData: {
            id: comment.UserIdCommentData.id,
            name: comment.UserIdCommentData.Name,
            image: comment.UserIdCommentData.Image,
          },
          PostID: item.id,
        }));

        return {
          id: item.id,
          time: moment(item.createdAt).fromNow(),
          title: item.Title,
          description: item.Description,
          latitude: item.latitude,
          longitude: item.longitude,
          status: item.Status,
          PostedBy: item.PostedByData.Name,
          PostedByImage: item.PostedByData.Image,
          PostType: item.TypeData.Name,
          PostLikes: item.likescount,
          PostComments: postComments,
          image: item.Image,
          address: reverseGeocodeAddress[0].name,
          crimeAddresses: crimeAddresses[crimeType], // Include crimeAddresses in post object
        };
      });

      // Wait for all postData to resolve
      const posts = await Promise.all(postData);

      // Dispatch posts to the Redux store
      dispatch(setPosts(posts));
      setPost(posts);

      console.log("Data is:", posts);
      console.log("Crime addresses:", crimeAddresses);
    } catch (error) {
      console.error("Error fetching post fetch data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPost();
      return;
    }, [])
  );

  {
    /*Post Comment API*/
  }
  const [userComments, setUserComments] = useState({});
  const commentPost = async (postId, comment) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.post(
        `http://172.20.10.7:4000/api/v1/CommentPost/${postId}`,
        {
          Comment: comment,
        },
        config
      );
      console.log("COMMENT ID " + postId);
      console.log(response);
      console.log("succeed");

      Alert.alert("Success", "Comment was successful!", [
        {
          text: "OK",
          onPress: () => {
            bottomSheetModalRef.current?.close();
            fetchPost();
            setUserComments({});
          },
        },
      ]);
    } catch (error) {
      console.error("Error commenting on post:", error);
      throw error;
    }
  };

  //naviagtion
  const navigation = useNavigation();

  //post apis
  const likePost = async (postId) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.get(
        `http://172.20.10.7:4000/api/v1/LikePost/${postId}`,

        config
      );
      console.log("COMMENT ID " + postId);
      // console.log(response);
      console.log("succeed");

      fetchPost();
    } catch (error) {
      console.error("Error liking on post:", error);
      throw error;
    }
  };
  const dislikePost = async (postId) => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      const config = {
        headers: {
          authorization: userToken,
        },
      };

      const response = await axios.get(
        `http://172.20.10.7:4000/api/v1/UnLikePost/${postId}`,
        config
      );
      console.log("COMMENT ID " + postId);
      // console.log(response);
      console.log("succeed");

      fetchPost();
    } catch (error) {
      console.error("Error commenting on post:", error);
      throw error;
    }
  };

  //comments modal

  const [isCommentModalOpen, setisCommentModalOpen] = useState(false);
  const handleCloseCommentModal = () => bottomSheetModalRef.current?.close();
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["60%"];
  const handleCommentModal = () => {
    bottomSheetModalRef.current?.present();
    setisCommentModalOpen(true);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: Platform.OS === "ios" ? "#6619c7" : "transparent",
      }}
    >
      <View
        style={{
          width: wp("100%"),
          height: Platform.OS == "ios" ? hp("7%") : hp("10%"),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4,
          backgroundColor: "#6619c7",
        }}
      >
        <View style={{ paddingLeft: s(8), top: vs(3) }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar.Image
              size={42}
              source={{ uri: `http://172.20.10.7:4000${user.image}` }}
              style={{}}
            />
          </TouchableOpacity>
        </View>
        <Searchbar
          value={searchText}
          onChangeText={(text) => {
            setSearchText(text);
            searchPosts(text);
          }}
          size={10}
          elevation={2}
          placeholder="Search Feed"
          style={{
            width: s(225),
            height: vs(30),
            backgroundColor: "white",
            marginTop: 6,
          }}
          mode="bar"
          inputStyle={{ marginTop: -8 }}
          loading={false}
        ></Searchbar>
        {/* <Ionicons name="person-circle-outline" size="45" color="white" style={{top: 10,paddingRight:10,}} /> */}
        <View style={{ paddingRight: s(7), top: vs(6.5) }}>
          {/* <Image
            source={require("./assets/Display.jpg")}
            style={{
              width: wp("13"),
              height: hp("6%"),
              borderRadius: 75,
            }}
          ></Image> */}
          {/* <Ionicons name="settings-sharp" size={35} color="white" style={{top: 10,}} /> */}
          <TouchableOpacity onPress={fetchPost}>
            <Ionicons name="settings" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: wp("100%"),

          backgroundColor: "#f1f2f6",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "#f1f2f6",
              // padding: 5,
              alignItems: "center",
              padding: 20,
            }}
          >
            {post.map((item) => (
              <View
                key={item.id}
                style={{
                  marginVertical: 10,
                  flex: 1,
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
                  {/* <Image
                    source={require("./assets/Female.jpg")}
                    style={{
                      width: wp("11"),
                      height: hp("5%"),
                      borderRadius: 75,
                    }}
                  ></Image> */}
                  <Avatar.Image
                    source={{
                      uri: `http://172.20.10.7:4000${item.PostedByImage}`,
                    }}
                    size={45}
                  />

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 18,
                        marginTop: vs(2),
                        paddingLeft: s(10),
                        color: "black",
                        maxWidth: 200,
                      }}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.PostedBy}
                    </Text>
                    <View
                      style={{
                        paddingLeft: s(7),
                        marginTop: vs(1),
                        flexDirection: "row",
                      }}
                    >
                      <EvilIcons name="location" size={16} color="#979494" />
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#979494",
                        }}
                      >
                        {item.address}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingLeft: s(10),
                        marginTop: vs(1),
                        flexDirection: "row",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#979494",
                        }}
                      >
                        {item.time} •
                      </Text>

                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 400,
                          color: "#979494",
                          paddingLeft: s(2),
                        }}
                      >
                        {item.PostType}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{ position: "absolute", left: vs(255) }}
                  >
                    {/* <Feather name="more-vertical" size={24} color="black"   style={{ top: 6, paddingLeft:width * 0.39}}/> */}
                    <Ionicons
                      name="checkmark-circle-sharp"
                      size={25}
                      color={item.status ? "blue" : "grey"}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    marginTop: 12,
                    marginHorizontal: 5,
                  }}
                >
                  <Text
                    //numberOfLines={4}
                    style={{
                      fontSize: 14,
                      color: "#0D0907",
                      marginBottom: 8,
                      fontWeight: "700",
                      textAlign: "justify",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text
                    //numberOfLines={4}
                    style={{
                      fontSize: 13,
                      color: "#0D0907",
                      marginBottom: 10,
                      textAlign: "justify",
                    }}
                  >
                    {item.description}
                  </Text>
                  {item.image.toLowerCase().endsWith(".quicktime") ? (
                    <Video
                      source={{
                        uri: `http://172.20.10.7:4000${item.image}`,
                      }}
                      // source={{
                      //   uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
                      // }}
                      style={{
                        width: wp("85%"),
                        height: vs(220),
                        borderRadius: ms(12),
                        alignSelf: "center",
                      }}
                      useNativeControls
                      resizeMode="contain"
                      // isLooping
                      controls={true}
                      shouldPlay={true}
                      isLooping={false}
                      usePoster
                      rate={1.0}
                      volume={1.0}
                      isMuted={true}
                    />
                  ) : (
                    //                   <VLCPlayer
                    //     style={[styles.video]}
                    //     videoAspectRatio="16:9"
                    //     source={{ uri: "https://www.radiantmediaplayer.com/media/big-buck-bunny-360p.mp4"}}
                    // />

                    <Image
                      source={{
                        uri: `http://172.20.10.7:4000${item.image}`,
                      }}
                      style={{
                        width: wp("85%"),
                        height: vs(220),
                        borderRadius: ms(12),
                      }}
                    />
                  )}

                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: vs(10),
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        console.log("item", item.id);
                        likePost(item.id);
                      }}
                    >
                      <AntDesign
                        marginTop={2}
                        name="like1"
                        size={21}
                        color={"#979494"}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        color: "#0D0907",
                        top: 6,
                        paddingLeft: 8,
                        fontSize: 15,
                      }}
                    >
                      {item.PostLikes}
                    </Text>
                    <TouchableOpacity
                      style={{ padding: 8 }}
                      onPress={() => {
                        dislikePost(item.id);
                      }}
                    >
                      <AntDesign name="dislike1" size={21} color={"#979494"} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setSelectedPost(item);
                        handleCommentModal();
                      }}
                    >
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
                      {item.PostComments.length}
                    </Text>

                    <TouchableOpacity>
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
                        onDismiss={() => setisCommentModalOpen(false)}
                        style={{
                          shadowOffset: {
                            width: 0,
                            height: 2,
                          },
                          shadowOpacity: 0.32,
                          shadowRadius: 2.42,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              gap: 113,
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
                            <TouchableOpacity onPress={handleCloseCommentModal}>
                              <IconButton
                                icon="close"
                                color="white"
                                size={26}
                                iconColor="#6619c7"
                              />
                            </TouchableOpacity>

                            <Text
                              style={{
                                fontSize: 19,
                                fontWeight: 600,
                                color: "#979494",
                                marginTop: 14,
                              }}
                            >
                              Comments
                            </Text>
                          </View>
                          <View style={{ flex: 4 }}>
                            <ScrollView
                              showsVerticalScrollIndicator={false}
                              contentContainerStyle={{
                                flexGrow: 1,
                                paddingBottom: 5,
                              }}
                              refreshControl={
                                <RefreshControl
                                  refreshing={refreshing}
                                  onRefresh={onRefresh}
                                />
                              }
                            >
                              {Object.keys(selectedPost).length > 0 &&
                                selectedPost.PostComments.map((comment) => {
                                  return (
                                    comment.PostID === selectedPost.id && (
                                      <CommentItem
                                        key={comment.id}
                                        comment={comment}
                                      />
                                    )
                                  );
                                })}
                            </ScrollView>
                          </View>

                          <View
                            style={{
                              flex: 1,
                              flexDirection: "row",
                              elevation: 5,
                              shadowColor: "rgba(0, 0, 0, 0.19)",
                              shadowOffset: {
                                width: 2,
                                height: 6,
                              },
                              shadowOpacity: 0.9,
                              shadowRadius: 12,
                              backgroundColor: "white",
                            }}
                          >
                            <TouchableOpacity
                              style={{
                                top: vs(12),
                                left: s(14),
                              }}
                            >
                              <Avatar.Image
                                size={44}
                                source={{
                                  uri: `http://172.20.10.7:4000${user.image}`,
                                }}
                              />
                            </TouchableOpacity>

                            <TextInput
                              //  editable
                              //  multiline
                              //  numberOfLines={4}
                              //  maxLength={40}
                              // value={userComment}
                              // onChangeText={(userComment) => setUserComment(userComment)}

                              value={userComments[item.id] || ""}
                              onChangeText={(userComment) => {
                                setUserComments((prevUserComments) => ({
                                  ...prevUserComments,
                                  [item.id]: userComment,
                                }));
                              }}
                              placeholderTextColor="#979476"
                              textBreakStrategy="highQuality"
                              placeholder="Add a Comment"
                              style={{
                                height: vs(31),
                                width: s(240),
                                margin: 12,
                                borderWidth: 1,
                                padding: 10,
                                borderRadius: 23,
                                backgroundColor: "white",
                                fontSize: 14,
                                fontWeight: "500",
                                borderColor: "#979494",
                                borderWidth: 0.6,
                                top: vs(4),
                                left: s(14),
                              }}
                            />
                            <TouchableOpacity
                              style={{ top: 21, left: 16 }}
                              onPress={() =>
                                commentPost(
                                  selectedPost.id,
                                  userComments[item.id]
                                )
                              }
                            >
                              <Octicons
                                name="paper-airplane"
                                size={29}
                                color="#979494"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </BottomSheetModal>

                      <TouchableOpacity
                        style={{ position: "absolute", left: vs(140) }}
                      >
                        <Feather name="share-2" size={22} color="#979494" />
                      </TouchableOpacity>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default UserFeed;
