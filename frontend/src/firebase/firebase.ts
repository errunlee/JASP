import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
import { initializeApp } from "firebase/app";

// const sendTokenToBackend = async (token:) => {
//   try {
//     await axios.post("https://your-backend-url/api/save-fcm-token", {
//       fcmToken: token,
//     });
//     console.log("Token sent successfully!");
//   } catch (error) {
//     console.error("Error sending token to backend: ", error);
//   }
// };

export const fetchFCMToken = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyBAAIIYtoCbjO-WaBEC214CxL0Si0bttLc",
    authDomain: "hackathon-eece0.firebaseapp.com",
    projectId: "hackathon-eece0",
    storageBucket: "hackathon-eece0.appspot.com",
    messagingSenderId: "1034125437339",
    appId: "1:1034125437339:web:8f8d3a854fcf6ee693193e",
    measurementId: "G-DG99663889",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Get Firebase messaging service
  const messaging = getMessaging(app);

  try {
    const token = await getToken(messaging, {
      vapidKey:
        "BG-WAmApoxzoAP09DBMbe9U-nv-1rqAHmS2oIbFRuZF0f6f4YFIu-5wX5iWSe_oqzwzdLeeBVL3QE8ugND1f6K0",
    });
    if (token) {
      console.log("FCM Token retrieved: ", token);
      localStorage.setItem("FCMToken", token);
      return token;
    } else {
      console.log("No registration token available.");
    }
  } catch (error) {
    console.error("Error getting FCM token: ", error);
  }
};
