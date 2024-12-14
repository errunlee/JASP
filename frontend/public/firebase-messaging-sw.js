// Import the Firebase Messaging module
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.2/firebase-messaging-compat.js"
);

// Your Firebase configuration
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
const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
