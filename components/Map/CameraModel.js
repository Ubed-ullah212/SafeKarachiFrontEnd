import { StyleSheet, Text, View, Image } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { FontAwesome } from "@expo/vector-icons";
import { Video } from "expo-av";
import { shareAsync } from "expo-sharing";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const CameraModel = () => {
  const navigation = useNavigation();

  //camera
  
  const [hasCameraPermission, setHasCameraPermision] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);
  const [hasMicroPhonePermission, setHasMicroPhonePermission] = useState(null);
  const [isRecording, setIsRecording] = useState(null);
  const [video, setVideo] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] =
    useState(null);

  useEffect(() => {
    (async () => {
      const MediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      const microphonePermission =
        await Camera.requestMicrophonePermissionsAsync();
      setHasCameraPermision(cameraStatus.status === "granted");
      setHasMicroPhonePermission(microphonePermission.status === "granted");
      setHasMediaLibraryPermission(MediaLibraryPermission.status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (e) {
        console.log(e);
      }
    }
  };

  const saveImage = async () => {
    try {
      if (image) {
        await MediaLibrary.createAssetAsync(image);
        alert("Picture Saved!");
       navigation.navigate("Map", { cameraImage: image });
        setImage(null);
      } else {
        console.error("Image URI is null or undefined.");
      }
    } catch (error) {
      console.error("Error saving image:", error);
    }
  };
  
  const recordVideo = () => {
    try {
      setIsRecording(true);

      let options = {
        quality: "1080p",
        maxDuration: 60,
        mute: false,
      };
      cameraRef.current.recordAsync(options).then((video) => {
        setVideo(video);
        setIsRecording(false);
      });
    } catch (e) {
      console.log(e);
    }
  };

  let stopRecording = () => {
    setIsRecording(false);
    cameraRef.current.stopRecording();
  };

  if (video) {
    let shareVideo = () => {
      shareAsync(video.uri).then(() => {
        setVideo(undefined);
      });
    };

    let saveVideo = () => {
      MediaLibrary.saveToLibraryAsync(video.uri).then(() => {
        {
          alert("Video Saved!");
          navigation.navigate("Map", { cameraVideo: video });
           setVideo(null);
        }
      });
    };

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <Video
          style={{
            flex: 1,
            alignSelf: "stretch",
          }}
          source={{ uri: video.uri }}
          useNativeControls
          resizeMode="contain"
          isLooping
        />
        <Button
          textColor="white"
          mode="contained"
          style={{ color: "black" }}
          onPress={shareVideo}
        >
          Share
        </Button>
        {hasMediaLibraryPermission ? (
          <Button
            mode="contained"
            onPress={saveVideo}
            style={{ color: "black" }}
          >
            Save
          </Button>
        ) : undefined}
        <Button
          mode="contained"
          onPress={() => {
            setVideo(undefined);
            navigation.navigate("Map");
          }}
          style={{ color: "black" }}
        >
          Discard
        </Button>
      </View>
    );
  }

  if (hasCameraPermission === false || hasMicroPhonePermission === false) {
    return <Text>No Access To Camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#000",
        justifyContent: "center",
        paddingBottom: 25,
      }}
    >
      {!image ? (
        <Camera
          style={{
            flex: 1,
            borderRadius: 20,
          }}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 30,
              marginTop: 25,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                )
              }
            >
              <FontAwesome name="retweet" size={28} color={"white"} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                setFlash(
                  flash === Camera.Constants.FlashMode.off
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.off
                )
              }
            >
              <FontAwesome
                name="flash"
                size={28}
                color={
                  flash === Camera.Constants.FlashMode.off ? "gray" : "white"
                }
              />
            </TouchableOpacity>
          </View>
        </Camera>
      ) : (
        <Image
          source={{ uri: image }}
          style={{
            flex: 1,
            borderRadius: 20,
          }}
        />
      )}
      <View>
        {image ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 50,
            }}
          >
            <TouchableOpacity
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setImage(null)}
            >
              <FontAwesome name="retweet" size={28} color={"white"} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#f1f1f1",
                  marginLeft: 10,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={saveImage}
            >
              <FontAwesome name="check" size={28} color={"white"} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#f1f1f1",
                  marginLeft: 10,
                }}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={takePicture}
            >
              <Ionicons
                title="Take a picture"
                name="camera"
                size={33}
                color={"white"}
              />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#f1f1f1",
                  marginLeft: 10,
                }}
              >
                Take a Picture
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={isRecording ? stopRecording : recordVideo}
            >
              <FontAwesome name="video-camera" size={33} color={"white"} />
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 16,
                  color: "#f1f1f1",
                  marginLeft: 10,
                }}
              >
                {isRecording ? "Stop Recording " : "Record Video"}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default CameraModel;
