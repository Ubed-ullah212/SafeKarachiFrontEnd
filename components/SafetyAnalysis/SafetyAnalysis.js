import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Picker } from "@react-native-picker/picker";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import {
  Avatar,
  Badge,
  IconButton,
  SegmentedButtons,
} from "react-native-paper";
import {
  BarChart,
  LineChart,
  PieChart,
  PopulationPyramid,
} from "react-native-gifted-charts";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";
import HighCrimeAreasTable from "./HighCrimeAreasTable";
import HighestCrimeBarChart from "./HighestCrimeBarChart";
import { ThemedButton } from "react-native-really-awesome-button";
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
import { setCrimes } from "../store/actions/crime";
import { useNavigation } from "@react-navigation/native";

const SafetyAnalysis = () => {
  //------------------------------------------------------------

  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [crimeInfo, setCrimeInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArea, setSelectedArea] = useState(""); // State to store selected area
  const [showPicker, setShowPicker] = useState(false);
  // Fetch all posts from the Redux store
  const allPosts = useSelector((state) => state.postReducer.posts);
  // Update the areas array to filter out specific post types
  const areas = Array.from(
    new Set(
      allPosts
        .filter(
          (post) =>
            ![
              "Event",
              "Rain",
              "Gas Issue",
              "Water Issue",
              "Electricity Issue",
              "Protest",
              "Road Block",
            ].includes(post.PostType)
        ) // Filter out specific post types
        .map((post) => post.address)
    )
  );

  // Calculate total crime count for each area, considering filtered posts
  const areaCrimeCounts = areas.map((area) => {
    const areaPosts = allPosts.filter(
      (post) =>
        post.address === area &&
        ![
          "Event",
          "Rain",
          "Gas Issue",
          "Water Issue",
          "Electricity Issue",
          "Protest",
          "Road Block",
        ].includes(post.PostType)
    ); // Filter out specific post types
    const totalCrimeCount = areaPosts.length;
    // Assuming latitude and longitude properties exist in each post object
    const { latitude, longitude } = areaPosts[0]; // Assuming latitude and longitude are the same for all posts in the area
    return { area, totalCrimeCount, latitude, longitude };
  });

  // Sort areas based on total crime count (descending order)
  const sortedAreaCrimeCounts = [...areaCrimeCounts].sort(
    (a, b) => b.totalCrimeCount - a.totalCrimeCount
  );

  // Create areaCrimeData array with latitude and longitude values
  const areaCrimeData = sortedAreaCrimeCounts.map((areaCount, index) => ({
    label: `${index + 1}. ${areaCount.area}`,
    value: areaCount.totalCrimeCount,
    latitude: areaCount.latitude,
    longitude: areaCount.longitude,
    color: "rgba(200, 100, 244,0.8)",
  }));

  dispatch(setCrimes(areaCrimeData));

  // useEffect(() => {
  //   if (selectedArea !== "") {
  //     getCrimeInfo(selectedArea);
  //   }
  // }, [selectedArea, allPosts]); // Update crime info when selected area or all posts change

  return (
    <SafeAreaView style={{ backgroundColor: "#6619c7" }}>
      <View
        style={{
          width: wp("100%"),
          height: hp("6.7%"),
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4,
          backgroundColor: "#6619c7",
        }}
      >
        {/* 172.20.10.5
        192.168.1.160 */}
        <View style={{ paddingLeft: 10, top: 9 }}>
          <Text
            style={{
              fontSize: 26,
              fontWeight: "800",
              color: "white",
              textAlign: "center",

              marginBottom: 4,
            }}
          >
            Safety Analysis
          </Text>
        </View>
        <View style={{ paddingRight: 7, top: 8 }}>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Avatar.Image
              size={40}
              source={{ uri: `http://172.20.10.7:4000${user.image}` }}
              style={{}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          width: wp("100%"),
          height: hp("94%"),
          backgroundColor: "#ffffff",
          padding: 10,
          alignItems: "center",
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 200 }}
        >
          <View style={{ marginBottom: 30, padding: 20, alignItems: "center" }}>
            {/* <TouchableOpacity
              onPress={() => setShowPicker(!showPicker)}
              style={{
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: "#6619c7",
                borderRadius: 5,
                marginTop: 6,
              }}
            >
             
            </TouchableOpacity> */}
            <ThemedButton
              name="bruce"
              onPress={() => setShowPicker(!showPicker)}
              type="secondary"
              width={150}
              height={50}
              borderColor={"#8f1ee6"}
              backgroundDarker={"#8f1ee6"}
              textColor="#8f1ee6"
              // progress={true}
              // progressLoadingTime={10000}
            >
              <Text
                style={{
                  fontSize: 12,
                  color: "#6619c7",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {showPicker ? "Hide Area Wise" : "Show Area Wise"}
              </Text>
            </ThemedButton>
            {showPicker && (
              <Picker
                selectedValue={selectedArea}
                style={{ height: 100, width: 350, marginTop: 10 }}
                onValueChange={(itemValue) => setSelectedArea(itemValue)}
              >
                <Picker.Item label="Choose an area..." value="" />
                {areas.map((area, index) => (
                  <Picker.Item key={index} label={area} value={area} />
                ))}
              </Picker>
            )}
          </View>

          {selectedArea === "" && (
            <View
              style={{
                marginTop: showPicker ? 55 : 0,
                padding: 0,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  textAlign: "center",
                  color: "#222f3e",
                }}
              >
                Total Crime Count for Each Area
              </Text>
              <BarChart
                data={areaCrimeCounts.map(({ area, totalCrimeCount }) => ({
                  label:
                    area.length > 10 ? area.substring(0, 10) + "..." : area,
                  value: totalCrimeCount,
                  color: "rgba(200, 100, 244,0.8)",
                }))}
                isAnimated
                barWidth={35}
                width={360}
                height={280}
                maxValue={10}
                xAxisLabelTextStyle={{ fontSize: 10 }}
                cappedBars
                capColor={"rgba(78, 0, 142)"}
                capThickness={4}
                showGradient
                gradientColor={"rgba(200, 100, 244,0.8)"}
                frontColor={"#6619c7"}
              />
            </View>
          )}

          {selectedArea === "" && (
            <HighCrimeAreasTable
              sortedAreaCrimeCounts={sortedAreaCrimeCounts}
            />
          )}

          {selectedArea === "" && (
            <HighestCrimeBarChart
              allPosts={allPosts.filter(
                (post) =>
                  ![
                    "Event",
                    "Rain",
                    "Gas Issue",
                    "Water Issue",
                    "Electricity Issue",
                    "Protest",
                    "Road Block",
                  ].includes(post.PostType)
              )} // Filter out specific post types
            />
          )}

          {selectedArea !== "" && (
            <View style={{ display: "flex", padding: 10 }}>
              {areas
                .filter((area) => area === selectedArea)
                .map((area, index) => {
                  const areaPosts = allPosts.filter(
                    (post) => post.address === area
                  );
                  const data = {};

                  // Aggregate post counts for each post type in the area
                  areaPosts.forEach((post) => {
                    if (data[post.PostType]) {
                      data[post.PostType] += 1;
                    } else {
                      data[post.PostType] = 1;
                    }
                  });

                  const chartData = Object.keys(data).map((postType) => ({
                    label:
                      postType.length > 10
                        ? postType.substring(0, 30) + "..."
                        : postType,
                    value: data[postType],
                    color: "rgba(200, 100, 244,0.8)",
                  }));

                  return (
                    <View
                      key={`${area}-${index}`}
                      style={{
                        marginTop: 55,
                        padding: 10,
                        elevation: 5,
                        shadowColor: "rgba(0, 0, 0, 0.1)",
                        shadowOffset: {
                          width: 1,
                          height: 3,
                        },
                        shadowOpacity: 0.99,
                        shadowRadius: 5,
                        backgroundColor: "white",
                        flex: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Text style={{ textAlign: "center", marginTop: 5 }}>
                        Crime Statistics of {area}
                      </Text>
                      <View
                        style={{
                          marginTop: 20,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <BarChart
                          data={chartData}
                          isAnimated
                          barWidth={35}
                          width={290}
                          height={250}
                          maxValue={10}
                          xAxisLabelTextStyle={{ fontSize: 10 }}
                          cappedBars
                          capColor={"rgba(78, 0, 142)"}
                          capThickness={4}
                          showGradient
                          gradientColor={"rgba(200, 100, 244,0.8)"}
                          frontColor={"rgba(219, 182, 249,0.2)"}
                        />
                      </View>
                    </View>
                  );
                })}
            </View>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default SafetyAnalysis;
