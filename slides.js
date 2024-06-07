import { IconButton } from "react-native-paper";

export default [
  {
    id: "1",
    title: "Welcome to SafeKarachi",
    desc: "Dive into our public safety features",
    image: require("./components/assets/safetyAnalysis.png"),
  },

  {
    id: "2",
    title: "Color-coded Map",
    desc: "Get a fully interactive map of Karachi with latest updates and never miss an important event",
    image: require("./components/assets/map.png"),
  },
  {
    id: "3",
    title: "Real-time Notifications",
    desc: "Get 24/7 real-time updates about public safety situation in karachi",
    image: require("./components/assets/Notification.png"),
  },
  {
    id: "4",
    title: "SOS Alert",
    desc: "Generate an SOS alert to Hospital, Police or Firebrigade in your Area at any time",
    image: require("./components/assets/SOS.png"),
  },
  {
    id: "5",
    title: "Get Started",
    desc: "Let's make Karachi safer together. Get started now to take control of your safety!",
    image: require("./components/assets/welcome.png"),
    button: (
      <IconButton
        icon="arrow-right"
        color="white"
        size={30}
        iconColor="#6619c7"
      />
    ),
  },
];
