// import {
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   FlatList,
//   Dimensions,
//   Button,
//   Linking
// } from "react-native";
// import React, { useState } from "react";
// import { Avatar, Badge, IconButton, SegmentedButtons } from "react-native-paper";
// import { SafeAreaView } from "react-native-safe-area-context";
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
//   widthPercentageToDP,
// } from "react-native-responsive-screen";
// import { Ionicons } from "react-native-vector-icons";
// import { Image } from "@rneui/base";
// import call from "react-native-phone-call";
// import MapView, {
//   Callout,
//   Circle,
//   Marker,
//   PROVIDER_DEFAULT,
//   PROVIDER_GOOGLE,
// } from "react-native-maps";
// import { useLocation } from 'react-native-maps';
// import { Feather } from "@expo/vector-icons";
// import { useNavigation } from "@react-navigation/native";
// import { useSelector } from "react-redux";
// import { MaterialIcons } from '@expo/vector-icons';
// // import Geolocation from '@react-native-community/geolocation';

// const PoliceMarkers = ({ value }) => {
//   const policeStations = [
//     {
//       name: 'Police Station Soldier Bazar',
//       location: { latitude: 24.8585589, longitude: 67.0481051 },
//       phoneNumber: '921-5435',
//     },
//     {
//       name: 'New Karachi Police Station',
//       location: { latitude: 24.86955, longitude: 67.01729 },
//       phoneNumber: '15',
//     },
//     {
//         name: 'Pak Colony Police Station',
//         location: {  latitude: 24.8750598,
//             longitude: 67.0289334,},
//         phoneNumber: '021-32573131',
//       },
//       {
//         name: 'Police Station Civil Line Karachi',
//         location: {    latitude: 24.9340166,
//             longitude: 67.0326513, },
//         phoneNumber: '99206209',
//       },
//       {
//         name: 'Defence Police Station',
//         location: {  latitude: 24.8521428,
//             longitude: 67.0132153, },
//         phoneNumber: '0213-538228',
//       },
//       {
//         name: 'Baghdadi Police Station',
//         location: {   latitude: 24.8328767,
//             longitude: 67.0647636, },
//         phoneNumber: '0213-2528566',
//       },
//       {
//         name: 'Gulberg Police Station',
//         location: {   latitude: 24.8597258,
//             longitude:  66.9845295,},
//         phoneNumber: '15',
//       },
//       {
//         name: 'Gizri Police Station',
//         location: {    latitude: 24.9358526,
//             longitude:  67.0564132,},
//         phoneNumber: '0213-5891709',
//       },
//       {
//         name: 'Tipu Sultan Police Station',
//         location: {   latitude: 24.8280675,
//             longitude:  67.0490266, },
//         phoneNumber: '3202-8792',
//       },
//       {
//         name: 'Kalakot Police Station',
//         location: {       latitude: 24.857405,
//             longitude:  67.0674555, },
//         phoneNumber: '0213-2524970',
//       },
//       {
//         name: 'Darakhshan Police Station',
//         location: {   latitude: 24.8782222,
//             longitude:  66.9929076, },
//         phoneNumber: '0213-5345100',
//       },
//       {
//         name: 'Mobina Town Police Station',
//         location: {   latitude: 24.7787597,
//             longitude:  67.0550306, },
//         phoneNumber: '499-4792',
//       },
//       {
//         name: 'Sohrab Goth Police Station',
//         location: {     latitude: 24.9390327,
//             longitude:  67.0904983, },
//         phoneNumber: '15',
//       },
//       {
//         name: 'Gulistan-e-Johar Police Station Block 9',
//         location: {      latitude: 24.9497689,
//             longitude:  67.0955899, },
//         phoneNumber: '461-7444',
//       },
//       {
//         name: 'PIB Police Station',
//         location: {     latitude: 24.9233286,
//             longitude:  67.137354, },
//         phoneNumber: '923-1395',
//       },
//       {
//         name: 'Risala police station',
//         location: {     latitude: 24.8918692,
//             longitude:  67.0396149, },
//         phoneNumber: '99215517',
//       },
//       {
//         name: 'SITE-A Police Station',
//         location: {      latitude: 24.8593907,
//             longitude:   66.9949101, },
//         phoneNumber: '021-32573322',
//       },
//   ];

//   const handleCallPress = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   return (
//     <>
//       {value === 'police' &&
//         policeStations.map((policeStation, index) => (
//           <Marker
//             key={index}
//             coordinate={policeStation.location}
//             pinColor="red"
//             tappable={true}
//             draggable // Allow dragging the marker
//           >
//             <Callout onPress={() => handleCallPress(policeStation.phoneNumber)}>
//               <View>
//                 <Text style={{ fontWeight: '500' }}>
//                   <Feather/> {policeStation.name}
//                 </Text>
//                 <Text>Phone: {policeStation.phoneNumber}</Text>
//                 <Text style={{ color: 'blue'}}>Call PoliceStation</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}
//     </>
//   );
// };

// const FirebrigadeMarkers = ({ value }) => {
//   const firebrigade = [
//     {
//       name: 'New Karachi Fire Station',
//       location: { latitude: 24.9789985, longitude: 67.0694139 },
//       phoneNumber: '123456789',
//     },
//     {
//       name: 'Chief Fire Officer KMC',
//       location: { latitude: 24.9791505, longitude: 66.9973127 },
//       phoneNumber: '37773252',
//     },
//     {
//         name: 'Civic Center Fire Station',
//         location: {  latitude: 24.9206905,
//             longitude: 66.5608406,},
//         phoneNumber: '02199231808',
//       },
//       {
//         name: 'Central Fire Station KPT',
//         location: {    latitude: 24.8287851,
//             longitude: 66.4542572, },
//         phoneNumber: '02199263344',
//       },
//       {
//         name: 'Central Fire Station ',
//         location: {  latitude: 24.8287851,
//             longitude: 66.4542572, },
//         phoneNumber: '02199215007',
//       },
//       {
//         name: 'Baldia Town Fire Station',
//         location: {   latitude: 24.8298326,
//             longitude: 66.4542523, },
//         phoneNumber: '02132562243',
//       },
//       {
//         name: 'NAZIMABAD FIRE STATION',
//         location: {   latitude: 24.9207061,
//             longitude:  66.5052963,},
//         phoneNumber: '02136649983',
//       },
//       {
//         name: 'Saddar Fire Station',
//         location: {    latitude: 24.8635867,
//             longitude:  67.0296084,},
//         phoneNumber: '32259864 ',
//       },
//       {
//         name: 'Landhi Fire Station',
//         location: {   latitude: 24.8421906,
//             longitude:   67.1989196, },
//         phoneNumber: '02135015888',
//       },
//       {
//         name: 'Manzoor Colony Fire Station',
//         location: {       latitude: 24.8589376,
//             longitude:  67.0891986, },
//         phoneNumber: '32562245 ',
//       },
//       {
//         name: 'Mohammad Aqeel Shaheed Fire Station',
//         location: {   latitude: 24.9090973,
//             longitude:  66.9915854, },
//         phoneNumber: '02132562243',
//       },
//       {
//         name: 'Karsaz Fire Station',
//         location: {   latitude: 24.8856618,
//             longitude:  67.0961906, },
//         phoneNumber: '987654321',
//       },
//       {
//         name: 'Shah Faisal colony Fire station',
//         location: {     latitude: 24.8782789,
//             longitude:  67.1451758, },
//         phoneNumber: '02199333912',
//       },
//       {
//         name: 'Gulshan-e-Iqbal Fire Station',
//         location: {      latitude: 24.9140907,
//             longitude:  67.0915533, },
//         phoneNumber: '02199244490',
//       },
//       {
//         name: 'Gulistan-e-Jauhar Fire Station',
//         location: {     latitude: 24.9108944,
//             longitude:  67.1165032, },
//         phoneNumber: '02134631918',
//       },
//       {
//         name: 'Sohrab Goth Fire Station',
//         location: {     latitude:  24.9445989,
//             longitude:  67.0805603, },
//         phoneNumber: '36365353',
//       },
//       {
//         name: 'Orangi Fire Station',
//         location: {      latitude:  24.9367743,
//             longitude:   67.0046964, },
//         phoneNumber: '02136650515',
//       },
//   ];

//   const handleCallPress = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   return (
//     <>
//       {value === 'firebrigade' &&
//         firebrigade.map((firebrigade, index) => (
//           <Marker
//             key={index}
//             coordinate={firebrigade.location}
//             pinColor="red"
//             tappable={true}
//             draggable // Allow dragging the marker
//           >
//             <Callout onPress={() => handleCallPress(firebrigade.phoneNumber)}>
//               <View>
//                 <Text style={{ fontWeight: '500' }}>
//                   <Feather/> {firebrigade.name}
//                 </Text>
//                 <Text>Phone: {firebrigade.phoneNumber}</Text>
//                 <Text style={{ color: 'blue'}}>Call Firebrigade</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}
//     </>
//   );
// };

// const HospitalMarkers = ({ value }) => {
//   const hospital = ([
//     {
//       name: 'Holy Family Hospital',
//       location: { latitude: 24.8723589,
//         longitude: 67.01776,},
//       phoneNumber: '(021) 32258991',
//       Callhospital: "Call Hospital",
//     },

//     {
//       name: 'Family Health Hospital (Karachi)',
//       location: { latitude: 24.8753541,
//         longitude: 67.0243717, },
//       phoneNumber: '(021) 32252045',
//       Callhospital: "Call Hospital",
//     },
//     {
//         name: 'Fatima Bai Hospital',
//         location: {  latitude: 24.9010277,
//             longitude: 67.0080729,},
//         phoneNumber: '(021) 34853061',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Fatima Bai Tai Memorial Hospital',
//         location: {    latitude: 24.918711,
//             longitude: 67.0613626, },
//         phoneNumber: '(021) 34853061',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Dr. Ruth K. M. Pfau, Civil Hospital Karachi',
//         location: {  latitude: 24.8589392,
//             longitude:  67.0101439, },
//         phoneNumber: '021 99215740',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Memon Hospital Burns Road Karachi',
//         location: {   latitude: 24.8576651,
//             longitude: 67.015406, },
//         phoneNumber: '(021) 32631045',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'JJ Hospital',
//         location: {   latitude: 24.8634307,
//             longitude: 67.0258066,},
//         phoneNumber: '(021) 32777036',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'PNS SHIFA Hospital',
//         location: {   latitude: 24.8280675,
//             longitude:  67.0490266, },
//         phoneNumber: '(021) 48506777',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'The Aga Khan University Hospital',
//         location: {  latitude:  24.8920057,
//             longitude: 67.0747154, },
//         phoneNumber: '021 111 911 911',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Aga Khan Hospital for Women',
//         location: {   latitude: 24.9266769,
//             longitude: 67.0645916, },
//         phoneNumber: '021 111 911 911',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'The Aga Khan University hospital - Clifton Medical',
//         location: {   latitude: 24.8132045,
//             longitude: 67.0144435, },
//         phoneNumber: '021 111 911 911',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'AKAR Hospital (Jamiyat Hospital)',
//         location: {     latitude: 24.8985891,
//             longitude: 67.0314503, },
//         phoneNumber: '(021) 34132360',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Abbasi Shaheed Hospital - KMC',
//         location: {    latitude: 24.9203232,
//             longitude:  67.0191851, },
//         phoneNumber: '021 9260400',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Osmania General Hospital',
//         location: {   latitude: 24.8867563,
//             longitude: 67.0532524, },
//         phoneNumber: '(021) 34120292',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Parsi General Hospital',
//         location: {  latitude: 24.8635822,
//             longitude: 67.0284939, },
//         // phoneNumber: '987654321',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Anklesaria Hospital',
//         location: {   latitude: 24.8669985,
//             longitude: 67.0236536, },
//         phoneNumber: ' (021) 32720371',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Seventh-day Adventist Hospital',
//         location: {  latitude:  24.8661025,
//             longitude: 67.0273116, },
//         phoneNumber: '(021) 32258021',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Zainab Panjwani Memorial Hospital',
//         location: {   latitude:  24.8746943,
//             longitude: 67.035979, },
//         phoneNumber: '(021) 32236251',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Midway General Hospital ',
//         location: {   latitude: 24.9148818,
//             longitude: 67.0247856, },
//         phoneNumber: '(021) 36612484',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'MS Hospital',
//         location: {  latitude: 24.9039615,
//             longitude: 67.0302902, },
//         phoneNumber: '(021) 36683628',
//         Callhospital: "Call Hospital",
//       },
//       {
//         name: 'Jinnah Postgraduate Medical Center (JPMC)',
//         location: {   latitude: 24.852176,
//             longitude: 67.0438841, },
//         phoneNumber: '021 99201300',
//         Callhospital: "Call Hospital",

//       },

//   ]);

//   // const userLocation = useLocation();

//   // useEffect(() => {
//   //   // Request for permission to access location
//   //   Geolocation.requestAuthorization();

//   //   // Get the current position
//   //   Geolocation.getCurrentPosition(
//   //     (position) => {
//   //       const { latitude, longitude } = position.coords;
//   //       // Do something with latitude and longitude
//   //       console.log(latitude, longitude);
//   //     },
//   //     (error) => {
//   //       console.error(error);
//   //     },
//   //     { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//   //   );
//   // }, []);

//   // const [selectedHospital, setSelectedHospital] = useState(null);

//   const handleCallPress = (phoneNumber) => {
//     Linking.openURL(`tel:${phoneNumber}`);
//   };

//   // const handleGetDirections = async (hospital) => {
//   //   if (!userLocation) {
//   //     console.warn('User location unavailable for route calculation.');
//   //     return;
//   //   }

//   //   const directions = await MapView.getDirections({
//   //     origin: userLocation,
//   //     destination: {
//   //       latitude: hospital.location.latitude,
//   //       longitude: hospital.location.longitude,
//   //     },
//   //     mode: 'driving', // Adjust mode as needed (e.g., 'walking', 'bicycling')
//   //   });

//   //   setSelectedHospital(hospital); // Update selected hospital for route display
//   //   setRoute(directions.routes[0]); // Not shown here (assumed part of your MapView component)
//   // };

//   // const SOSCall = () => {
//   // const args = {
//   //   number: "+92364356789001",
//   //   prompt: true,
//   //   skipCanOpen: true,
//   // };}

//   return (
//     <>
//       {value === 'hospital' &&
//         hospital.map((hospital, index) => (
//           <Marker
//             key={index}
//             coordinate={hospital.location}
//             title={hospital.name}
//             // description={`Phone: ${hospital.phoneNumber}`}
//             pinColor="purple"
//             // onPress={() => handleCallPress(hospital.phoneNumber)}
//             // onPress={() => handleGetDirections(hospital)}
//             tappable={true}
//           >
//           <Callout onPress={() => handleCallPress(hospital.phoneNumber)}>
//               <View>
//                 <Text>{hospital.name}</Text>
//                 <Text>Phone: {hospital.phoneNumber}</Text>
//                 <Text style={{ color: 'blue'}}>Call Hospital</Text>
//               </View>
//             </Callout>
//           </Marker>
//         ))}
//     </>
//   );
// };

// const SOS = () => {
//    //naviagtion
//    const navigation = useNavigation();
//    const user = useSelector((state) => state.userReducer.user);
//   const { height, width } = Dimensions.get("window");

//   const [value, setValue] = useState("");

//   const [selectedDestination, setSelectedDestination] = useState(null);
//   const [route, setRoute] = useState(null);

//   // Function to handle route calculation
//   const handleGetDirections = async (destination) => {
//     const directions = await MapView.getDirections({
//       origin: {
//         latitude: userLocation.latitude, // Get user's current latitude
//         longitude: userLocation.longitude, // Get user's current longitude
//       },
//       destination: {
//         latitude: destination.latitude,
//         longitude: destination.longitude,
//       },
//       mode: 'driving', // Adjust mode as needed (e.g., 'walking', 'bicycling')
//     });

//     setSelectedDestination(destination); // Update selected destination
//     setRoute(directions.routes[0]); // Store the calculated route
//   };

//   return (
//     <SafeAreaView style={{ backgroundColor: "#6619c7" }}>

//       <View
//         style={{
//           width: wp("100%"),
//           height: hp("6.7%"),
//           display: "flex",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           padding: 4,
//           backgroundColor: "#6619c7",
//         }}
//       >
//         {/* 172.20.10.5
//         192.168.1.160 */}
//          <View style={{ paddingLeft: 10, top: 4 }}>
//          <Avatar.Image
//               size={42}
//               source={{ uri: `http://172.20.10.7:4000${user.image}` }}

//               style={{}}
//             />

//         </View>
//         <View style={{ paddingRight: 7, top: 10 }}>
//           <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//         <MaterialIcons name="logout" size={34} color="white" />
//         </TouchableOpacity>
//         </View>

//       </View>

//       <View
//         style={{
//           width: wp("100%"),
//           height: hp("94%"),
//           backgroundColor: "white",
//           // padding: 5,
//           alignItems: "center",
//         }}
//       >
//         <View
//           style={{
//             padding: 20,
//             alignItems: "center",
//           }}
//         >
//           <SegmentedButtons
//             style={{
//               padding: 10,
//               width: wp("90%"),
//             }}
//             checkedColor="#6619c7"
//             value={value}
//             onValueChange={setValue}
//             buttons={[
//               {
//                 value: "police",
//                 label: "Police",
//                 icon: "car-emergency",
//               },
//               {
//                 value: "hospital",
//                 label: "Hospital",
//                 icon: "hospital",
//                 padding: 20,
//                 onPress: () => {},
//               },
//               {
//                 value: "firebrigade",
//                 label: "Firebrigade",
//                 icon: "fire-truck",
//                 padding: 20,
//                 onPress: () => {},
//               },
//             ]}
//           />
//         </View>

//         <View>
//           <Text
//             style={{
//               marginTop: 10,
//               fontSize: 33,
//               fontWeight: "800",
//               color: "#808e9b",
//               textAlign: "center",
//             }}
//           >
//             Nearby Police Stations
//           </Text>
//           <View
//             style={{
//               alignItems: "center",
//               justifyContent: "center",
//               display: "flex",
//               padding: 18,
//             }}
//           >
//             <View
//               style={{
//                 width: wp("90%"),
//                 height: hp("50%"),
//                 justifyContent: "center",
//                 alignItems: "center",
//                 shadowOffset: {
//                   width: 0,
//                   height: 1,
//                 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 2.4,
//                 borderRadius: 10,
//               }}
//             >
//               <View
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                 }}
//               >
//                 <MapView
//                   mapType="hybrid"
//                   zoomEnabled={true}
//                   zoomControlEnabled={true}
//                   zoomTapEnabled={true}
//                   showsBuildings={true}
//                   showsPointsOfInterest={true}
//                   showsCompass={true}
//                   style={{ flex: 1 }}
//                   userInterfaceStyle={"light"}
//                   showsUserLocation={true}
//                   followsUserLocation={true}
//                   userLocationPriority={'high'}
//                   showsMyLocationButton={true}
//                   provider={PROVIDER_DEFAULT}
//                   initialRegion={{
//                     latitude: 24.837896761320245,
//                     longitude: 67.03277639731591,
//                     latitudeDelta: 0.055,
//                     longitudeDelta: 0.05,
//                   }}
//                   region={{
//                     latitude: 24.837896761320245,
//                     longitude: 67.03277639731591,
//                     latitudeDelta: 0.055,
//                     longitudeDelta: 0.05,
//                   }}
//                 >
//                   {value === "police" ? (
//                     <Marker
//                       // coordinate={{
//                       //   latitude: 24.826464,
//                       //   longitude: 67.025534,
//                       // }}
//                       // pinColor="red"
//                       // tappable={true}
//                       // draggable // we can drag marker
//                     >
//                       <Callout>
//                         {/* <Text style={{ fontWeight: 500 }}>
//                           <Feather name="alert-circle" size={15} color="red" />{" "}
//                           Target Killing
//                         </Text>
//                         <Text style={{ fontSize: 8, color: "#979494" }}>
//                           Boy killed by people in vigo at Boat Basin
//                         </Text> */}
//                       </Callout>
//                     </Marker>
//                   ) : null}
//                     <PoliceMarkers value={value} />

//                   {value === "hospital" ? (
//                     <Marker
//                       coordinate={{
//                         // latitude: 24.826469,
//                         // longitude: 67.025531,
//                       }}
//                       // pinColor="purple"
//                       // tappable={true}
//                       // draggable // we can drag marker
//                     >
//                       <Callout>
//                         {/* <Text style={{ fontWeight: 500 }}>
//                           <Feather name="alert-circle" size={15} color="red" />{" "}
//                           Target Killing
//                         </Text>
//                         <Text style={{ fontSize: 8, color: "#979494" }}>
//                           Boy killed by people in vigo at Boat Basin
//                         </Text> */}
//                       </Callout>
//                     </Marker>
//                   ) : null}
//                    <HospitalMarkers value={value} />

//                   {value === "firebrigade" ? (
//                     <Marker
//                       coordinate={{
//                         // latitude: 24.8266,
//                         // longitude: 67.025534,
//                       }}
//                       // pinColor="blue"
//                       // tappable={true}
//                       // draggable // we can drag marker
//                     >
//                       <Callout>
//                         {/* <Text style={{ fontWeight: 500 }}>
//                           <Feather name="alert-circle" size={15} color="red" />{" "}
//                           Target Killing
//                         </Text>
//                         <Text style={{ fontSize: 8, color: "#979494" }}>
//                           Boy killed by people in vigo at Boat Basin
//                         </Text> */}
//                       </Callout>
//                     </Marker>
//                   ) : null}
//                    <FirebrigadeMarkers value={value} />
//                    {/* {route && (
//                     <Polyline
//                       coordinates={route.coordinates}
//                       strokeWidth={5}
//                       strokeColor="blue"
//                     />
//                   )} */}
//                 </MapView>
//               </View>
//             </View>
//           </View>
//           <View
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               width: 200,
//               height: 100,
//               position: "absolute",
//               alignItems: "center",
//               justifyContent: "center",
//               top: "44%",
//               left: 100,
//             }}
//           ></View>
//         </View>
//       </View>
//       <Button
//         title="Get Directions"
//         onPress={() => handleGetDirections(selectedDestination)}
//       />
//     </SafeAreaView>
//   );
// };

// export default SOS;

// const styles = StyleSheet.create({});

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
  Button,
  Linking,
} from "react-native";
import React, { useState } from "react";
import {
  Avatar,
  Badge,
  IconButton,
  SegmentedButtons,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { Ionicons } from "react-native-vector-icons";
import { Image } from "@rneui/base";
import call from "react-native-phone-call";
import MapView, {
  Callout,
  Circle,
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { useLocation } from "react-native-maps";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
// import Geolocation from '@react-native-community/geolocation';

const PoliceMarkers = ({ value }) => {
  const policeStations = [
    {
      name: "Police Station Soldier Bazar",
      location: { latitude: 24.8750561, longitude: 67.0288571 },
      phoneNumber: "921-5435",
    },
    {
      name: "New Karachi Police Station",
      location: { latitude: 24.9790897, longitude: 67.070215 },
      phoneNumber: "15",
    },
    {
      name: "Pak Colony Police Station",
      location: { latitude: 24.8750598, longitude: 67.0289334 },
      phoneNumber: "021-32573131",
    },
    {
      name: "Police Station Civil Line Karachi",
      location: { latitude: 24.9340166, longitude: 67.0326513 },
      phoneNumber: "99206209",
    },
    {
      name: "Defence Police Station",
      location: { latitude: 24.8328573, longitude: 67.0749899 },
      phoneNumber: "0213-538228",
    },
    {
      name: "Baghdadi Police Station",
      location: { latitude: 24.8597182, longitude: 66.99470543957271 },
      phoneNumber: "0213-2528566",
    },
    {
      name: "Gulberg Police Station",
      location: { latitude: 24.93556195, longitude: 67.06652825609311 },
      phoneNumber: "15",
    },
    {
      name: "Gizri Police Station",
      location: { latitude: 24.8275591, longitude: 67.0594362 },
      phoneNumber: "0213-5891709",
    },
    {
      name: "Tipu Sultan Police Station",
      location: { latitude: 24.8280675, longitude: 67.0490266 },
      phoneNumber: "3202-8792",
    },
    {
      name: "Kalakot Police Station",
      location: { latitude: 24.878025755, longitude: 67.00298070323059 },
      phoneNumber: "0213-2524970",
    },
    {
      name: "Darakhshan Police Station",
      location: { latitude: 24.7787148, longitude: 67.0652486 },
      phoneNumber: "0213-5345100",
    },
    {
      name: "Mobina Town Police Station",
      location: { latitude: 24.9390283, longitude: 67.1007538 },
      phoneNumber: "499-4792",
    },
    {
      name: "Sohrab Goth Police Station",
      location: { latitude: 24.9390327, longitude: 67.0904983 },
      phoneNumber: "15",
    },
    {
      name: "Gulistan-e-Johar Police Station Block 9",
      location: { latitude: 24.9184575, longitude: 67.1495354 },
      phoneNumber: "461-7444",
    },
    {
      name: "PIB Police Station",
      location: { latitude: 24.891823, longitude: 67.0498427 },
      phoneNumber: "923-1395",
    },
    {
      name: "Risala police station",
      location: { latitude: 24.8592003, longitude: 67.0049782 },
      phoneNumber: "99215517",
    },
    {
      name: "SITE-A Police Station",
      location: { latitude: 24.8593907, longitude: 66.9949101 },
      phoneNumber: "021-32573322",
    },
  ];

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      {value === "police" &&
        policeStations.map((policeStation, index) => (
          <Marker
            key={index}
            coordinate={policeStation.location}
            pinColor="red"
            tappable={true}
            draggable // Allow dragging the marker
          >
            <Callout onPress={() => handleCallPress(policeStation.phoneNumber)}>
              <View>
                <Text style={{ fontWeight: "500" }}>
                  <Feather /> {policeStation.name}
                </Text>
                <Text>Phone: {policeStation.phoneNumber}</Text>
                <Text style={{ color: "blue" }}>Call PoliceStation</Text>
              </View>
            </Callout>
          </Marker>
        ))}
    </>
  );
};

const FirebrigadeMarkers = ({ value }) => {
  const firebrigade = [
    {
      name: "New Karachi Fire Station",
      location: { latitude: 24.9789985, longitude: 67.0694139 },
      phoneNumber: "123456789",
    },
    {
      name: "Chief Fire Officer KMC",
      location: { latitude: 24.9791505, longitude: 66.9973127 },
      phoneNumber: "37773252",
    },
    {
      name: "Civic Center Fire Station",
      location: { latitude: 24.9206905, longitude: 66.5608406 },
      phoneNumber: "02199231808",
    },
    {
      name: "Central Fire Station KPT",
      location: { latitude: 24.8287851, longitude: 66.4542572 },
      phoneNumber: "02199263344",
    },
    {
      name: "Central Fire Station ",
      location: { latitude: 24.8287851, longitude: 66.4542572 },
      phoneNumber: "02199215007",
    },
    {
      name: "Baldia Town Fire Station",
      location: { latitude: 24.8298326, longitude: 66.4542523 },
      phoneNumber: "02132562243",
    },
    {
      name: "NAZIMABAD FIRE STATION",
      location: { latitude: 24.9207061, longitude: 66.5052963 },
      phoneNumber: "02136649983",
    },
    {
      name: "Saddar Fire Station",
      location: { latitude: 24.8635867, longitude: 67.0296084 },
      phoneNumber: "32259864 ",
    },
    {
      name: "Landhi Fire Station",
      location: { latitude: 24.8421906, longitude: 67.1989196 },
      phoneNumber: "02135015888",
    },
    {
      name: "Manzoor Colony Fire Station",
      location: { latitude: 24.8589376, longitude: 67.0891986 },
      phoneNumber: "32562245 ",
    },
    {
      name: "Mohammad Aqeel Shaheed Fire Station",
      location: { latitude: 24.9090973, longitude: 66.9915854 },
      phoneNumber: "02132562243",
    },
    {
      name: "Karsaz Fire Station",
      location: { latitude: 24.8856618, longitude: 67.0961906 },
      phoneNumber: "987654321",
    },
    {
      name: "Shah Faisal colony Fire station",
      location: { latitude: 24.8782789, longitude: 67.1451758 },
      phoneNumber: "02199333912",
    },
    {
      name: "Gulshan-e-Iqbal Fire Station",
      location: { latitude: 24.9140907, longitude: 67.0915533 },
      phoneNumber: "02199244490",
    },
    {
      name: "Gulistan-e-Jauhar Fire Station",
      location: { latitude: 24.9108944, longitude: 67.1165032 },
      phoneNumber: "02134631918",
    },
    {
      name: "Sohrab Goth Fire Station",
      location: { latitude: 24.9445989, longitude: 67.0805603 },
      phoneNumber: "36365353",
    },
    {
      name: "Orangi Fire Station",
      location: { latitude: 24.9367743, longitude: 67.0046964 },
      phoneNumber: "02136650515",
    },
  ];

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      {value === "firebrigade" &&
        firebrigade.map((firebrigade, index) => (
          <Marker
            key={index}
            coordinate={firebrigade.location}
            pinColor="red"
            tappable={true}
            draggable // Allow dragging the marker
          >
            <Callout onPress={() => handleCallPress(firebrigade.phoneNumber)}>
              <View>
                <Text style={{ fontWeight: "500" }}>
                  <Feather /> {firebrigade.name}
                </Text>
                <Text>Phone: {firebrigade.phoneNumber}</Text>
                <Text style={{ color: "blue" }}>Call Firebrigade</Text>
              </View>
            </Callout>
          </Marker>
        ))}
    </>
  );
};

const HospitalMarkers = ({ value }) => {
  const hospital = [
    {
      name: "Holy Family Hospital",
      location: { latitude: 24.8721154, longitude: 67.02786456644401 },
      phoneNumber: "(021) 32258991",
      Callhospital: "Call Hospital",
    },

    {
      name: "Family Health Hospital (Karachi)",
      location: { latitude: 24.8753541, longitude: 67.0243717 },
      phoneNumber: "(021) 32252045",
      Callhospital: "Call Hospital",
    },
    {
      name: "Fatima Bai Hospital",
      location: { latitude: 24.9010277, longitude: 67.0080729 },
      phoneNumber: "(021) 34853061",
      Callhospital: "Call Hospital",
    },
    {
      name: "Fatima Bai Tai Memorial Hospital",
      location: { latitude: 24.918711, longitude: 67.0613626 },
      phoneNumber: "(021) 34853061",
      Callhospital: "Call Hospital",
    },
    {
      name: "Dr. Ruth K. M. Pfau, Civil Hospital Karachi",
      location: { latitude: 24.8589392, longitude: 67.0101439 },
      phoneNumber: "021 99215740",
      Callhospital: "Call Hospital",
    },
    {
      name: "Memon Hospital Burns Road Karachi",
      location: { latitude: 24.8576651, longitude: 67.015406 },
      phoneNumber: "(021) 32631045",
      Callhospital: "Call Hospital",
    },
    {
      name: "JJ Hospital",
      location: { latitude: 24.8634307, longitude: 67.0258066 },
      phoneNumber: "(021) 32777036",
      Callhospital: "Call Hospital",
    },
    {
      name: "PNS SHIFA Hospital",
      location: { latitude: 24.8280675, longitude: 67.0490266 },
      phoneNumber: "(021) 48506777",
      Callhospital: "Call Hospital",
    },
    {
      name: "The Aga Khan University Hospital",
      location: { latitude: 24.8920057, longitude: 67.0747154 },
      phoneNumber: "021 111 911 911",
      Callhospital: "Call Hospital",
    },
    {
      name: "Aga Khan Hospital for Women",
      location: { latitude: 24.9266769, longitude: 67.0645916 },
      phoneNumber: "021 111 911 911",
      Callhospital: "Call Hospital",
    },
    {
      name: "The Aga Khan University hospital - Clifton Medical",
      location: { latitude: 24.8132045, longitude: 67.0144435 },
      phoneNumber: "021 111 911 911",
      Callhospital: "Call Hospital",
    },
    {
      name: "AKAR Hospital (Jamiyat Hospital)",
      location: { latitude: 24.8985891, longitude: 67.0314503 },
      phoneNumber: "(021) 34132360",
      Callhospital: "Call Hospital",
    },
    {
      name: "Abbasi Shaheed Hospital - KMC",
      location: { latitude: 24.9203232, longitude: 67.0191851 },
      phoneNumber: "021 9260400",
      Callhospital: "Call Hospital",
    },
    {
      name: "Osmania General Hospital",
      location: { latitude: 24.8867563, longitude: 67.0532524 },
      phoneNumber: "(021) 34120292",
      Callhospital: "Call Hospital",
    },
    {
      name: "Parsi General Hospital",
      location: { latitude: 24.8635861, longitude: 67.02853800683077 },
      // phoneNumber: '987654321',
      Callhospital: "Call Hospital",
    },
    {
      name: "Anklesaria Hospital",
      location: { latitude: 24.8726116, longitude: 67.03109748193964 },
      phoneNumber: " (021) 32720371",
      Callhospital: "Call Hospital",
    },
    {
      name: "Seventh-day Adventist Hospital",
      location: { latitude: 24.8661719, longitude: 67.02762135272194 },
      phoneNumber: "(021) 32258021",
      Callhospital: "Call Hospital",
    },
    {
      name: "Zainab Panjwani Memorial Hospital",
      location: { latitude: 24.861826, longitude: 67.033856 },
      phoneNumber: "(021) 32236251",
      Callhospital: "Call Hospital",
    },
    {
      name: "Midway General Hospital ",
      location: { latitude: 24.9204202, longitude: 67.0310582 },
      phoneNumber: "(021) 36612484",
      Callhospital: "Call Hospital",
    },
    {
      name: "MS Hospital",
      location: { latitude: 24.9041352, longitude: 67.0304887 },
      phoneNumber: "(021) 36683628",
      Callhospital: "Call Hospital",
    },
    {
      name: "Jinnah Postgraduate Medical Center (JPMC)",
      location: { latitude: 24.8517423, longitude: 67.0471346 },
      phoneNumber: "021 99201300",
      Callhospital: "Call Hospital",
    },
  ];

  const handleCallPress = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <>
      {value === "hospital" &&
        hospital.map((hospital, index) => (
          <Marker
            key={index}
            coordinate={hospital.location}
            title={hospital.name}
            pinColor="purple"
            tappable={true}
          >
            <Callout onPress={() => handleCallPress(hospital.phoneNumber)}>
              <View>
                <Text>{hospital.name}</Text>
                <Text>Phone: {hospital.phoneNumber}</Text>
                <Text style={{ color: "blue" }}>Call Hospital</Text>
              </View>
            </Callout>
          </Marker>
        ))}
    </>
  );
};

const SOS = () => {
  //naviagtion
  const navigation = useNavigation();
  const user = useSelector((state) => state.userReducer.user);
  const { height, width } = Dimensions.get("window");

  const [value, setValue] = useState("police");

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [route, setRoute] = useState(null);

  const handleGetDirections = async (destination) => {
    const directions = await MapView.getDirections({
      origin: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
      destination: {
        latitude: destination.latitude,
        longitude: destination.longitude,
      },
      mode: "driving",
    });

    setSelectedDestination(destination);
    setRoute(directions.routes[0]);
  };

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
            SOS
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
          backgroundColor: "white",
          // padding: 5,
          alignItems: "center",
        }}
      >
        <View
          style={{
            padding: 20,
            alignItems: "center",
          }}
        >
          <SegmentedButtons
            style={{
              padding: 10,
              width: wp("90%"),
            }}
            checkedColor="#6619c7"
            value={value}
            onValueChange={setValue}
            buttons={[
              {
                value: "police",
                label: "Police",
                icon: "car-emergency",
              },
              {
                value: "hospital",
                label: "Hospital",
                icon: "hospital",
                padding: 20,
                onPress: () => {},
              },
              {
                value: "firebrigade",
                label: "Firebrigade",
                icon: "fire-truck",
                padding: 20,
                onPress: () => {},
              },
            ]}
          />
        </View>

        <View>
          <Text
            style={{
              marginTop: 10,
              fontSize: 33,
              fontWeight: "800",
              color: "#808e9b",
              textAlign: "center",
            }}
          >
            Nearby Police Stations
          </Text>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
              padding: 18,
            }}
          >
            <View
              style={{
                width: wp("90%"),
                height: hp("50%"),
                justifyContent: "center",
                alignItems: "center",
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.3,
                shadowRadius: 2.4,
                borderRadius: 10,
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <MapView
                  mapType="hybrid"
                  zoomEnabled={true}
                  zoomControlEnabled={true}
                  zoomTapEnabled={true}
                  showsBuildings={true}
                  showsPointsOfInterest={true}
                  showsCompass={true}
                  style={{ flex: 1 }}
                  userInterfaceStyle={"light"}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  userLocationPriority={"high"}
                  showsMyLocationButton={true}
                  provider={PROVIDER_DEFAULT}
                  initialRegion={{
                    latitude: 24.837896761320245,
                    longitude: 67.03277639731591,
                    latitudeDelta: 0.055,
                    longitudeDelta: 0.05,
                  }}
                  region={{
                    latitude: 24.837896761320245,
                    longitude: 67.03277639731591,
                    latitudeDelta: 0.055,
                    longitudeDelta: 0.05,
                  }}
                >
                  {value === "police" ? (
                    <Marker>
                      <Callout>
                        {/* <Text style={{ fontWeight: 500 }}>
                          
                        </Text> */}
                      </Callout>
                    </Marker>
                  ) : null}
                  <PoliceMarkers value={value} />

                  {value === "hospital" ? (
                    <Marker coordinate={{}}>
                      <Callout>
                        {/* <Text style={{ fontWeight: 500 }}>
        
                        </Text> */}
                      </Callout>
                    </Marker>
                  ) : null}
                  <HospitalMarkers value={value} />

                  {value === "firebrigade" ? (
                    <Marker coordinate={{}}>
                      <Callout>
                        {/* <Text style={{ fontWeight: 500 }}>
                    
                        </Text> */}
                      </Callout>
                    </Marker>
                  ) : null}
                  <FirebrigadeMarkers value={value} />
                  {/* {route && (
             
                  )} */}
                </MapView>
              </View>
            </View>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              width: 200,
              height: 100,
              position: "absolute",
              alignItems: "center",
              justifyContent: "center",
              top: "44%",
              left: 100,
            }}
          ></View>
        </View>
      </View>
      <Button
        title="Get Directions"
        onPress={() => handleGetDirections(selectedDestination)}
      />
    </SafeAreaView>
  );
};

export default SOS;

const styles = StyleSheet.create({});
