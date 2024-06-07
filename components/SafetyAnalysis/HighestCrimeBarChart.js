import React from "react";
import { View, Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";

const HighestCrimeBarChart = ({ allPosts }) => {
  // Step 1: Count occurrences of each crime type
  const crimeCounts = {};
  allPosts.forEach((post) => {
    const crimeType = post.PostType;
    crimeCounts[crimeType] = (crimeCounts[crimeType] || 0) + 1;
  });

  // Step 2: Identify the crime type with the highest occurrence
  const highestCrimeType = Object.keys(crimeCounts).reduce((a, b) =>
    crimeCounts[a] > crimeCounts[b] ? a : b
  );

  // Step 3: Prepare data for the bar chart
  const barChartData = Object.entries(crimeCounts).map(([type, count]) => ({
    label: type,
    value: count,
    color: type === highestCrimeType ? "red" : "blue", // Highlight the highest crime type
  }));

  return (
    <View style={{ marginTop: 25, padding: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        Highest Occurring Crime Across All Areas
      </Text>
      <BarChart
        data={barChartData}
        isAnimated
        barWidth={35}
        width={360}
        height={280}
        xAxisLabelTextStyle={{ fontSize: 10 }}
        cappedBars
        capColor={"rgba(78, 0, 142)"}
        capThickness={4}
        showGradient
        gradientColor={"rgba(200, 100, 244,0.8)"}
        frontColor={"rgba(219, 182, 249,0.2)"}
      />
    </View>
  );
};

export default HighestCrimeBarChart;
