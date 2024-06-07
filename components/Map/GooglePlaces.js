import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { MaterialIcons } from "@expo/vector-icons";

const GooglePlaces = () => {

    const [region,setRegion] = useState({
        // latitude: 29.837896761320245,
    // longitude: 67.03277639731591,
    })

  return (
    <GooglePlacesAutocomplete
      placeholder="Search Location"
      onPress={(data, details = null) => {
        console.log(data, details);
        console.log("has");
      }}
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: "distance",
      }}
      query={{
        key: "AIzaSyAHbC-BbheLBt0k79e-RaWAl3h03KBybF0",
        language: "en",
        components: "country:pk",
        types: "establishment",
        radius: 30000,
        location: `${region.latitude},${region.longitude}`,
      }}
      // listEmptyComponent={() => (
      //   <View style={{ flex: 1, backgroundColor: "white" }}>
      //     <Text style={{ fontWeight: 600, color: "#979494" }}>
      //       No results were found
      //     </Text>
      //   </View>
      // )}
      //currentLocation={true}
      //currentLocationLabel="Your location!"
      onFail={(error) => console.error("Autocomplete failed:", error)}
      styles={{
        container: {
          flex: 0,
        },
        description: {
          color: "#000",
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: "#3caf50",
        },
        listView: {
          backgroundColor: "white",
        },
      }}
    />
  );
};

export default GooglePlaces;

const styles = StyleSheet.create({});
