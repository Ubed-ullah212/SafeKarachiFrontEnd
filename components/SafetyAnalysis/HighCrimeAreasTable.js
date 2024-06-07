import React from "react";
import { View, Text } from "react-native";
import { Table, Row } from "react-native-table-component";

const HighCrimeAreasTable = ({ sortedAreaCrimeCounts }) => {
  const tableHead = ["Rank", "Area", "Total Crimes"];

  return (
    <View style={{ marginTop: 25, padding: 10 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 15,
          textAlign: "center",
        }}
      >
        High Crime Areas of Karachi
      </Text>
      <Table borderStyle={{ borderWidth: 0.17, borderColor: "#666" }}>
        <Row
          data={tableHead}
          style={{
            height: 30,
            backgroundColor: "#9c88ff",
            alignItems: "center",
            justifyContent: "center",
          }}
          textStyle={{ margin: 6, fontSize: 16, fontWeight: "bold", color: "white" }}
        />
        {sortedAreaCrimeCounts.map((areaCount, index) => (
          <Row
            key={index}
            data={[index + 1, areaCount.area, areaCount.totalCrimeCount]}
            style={{
              height: 40,
              backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#E7E6E1",
              alignItems: "center",
              justifyContent: "center",
             // borderBottomWidth: 0.17,
             // borderBottomColor: "#666", 
            }}
            textStyle={{ margin: 6, fontSize: 16 }}
          />
        ))}
      </Table>
    </View>
  );
};

export default HighCrimeAreasTable;
