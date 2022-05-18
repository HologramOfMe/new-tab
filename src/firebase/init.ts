import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDkeR3QroeBChKDTwGSdzz0zFBfMejq5rA",
    authDomain: "new-tab-792df.firebaseapp.com",
    projectId: "new-tab-792df",
    storageBucket: "new-tab-792df.appspot.com",
    messagingSenderId: "677055865159",
    appId: "1:677055865159:web:ce1530567e0aefd711ac62"
  };
  
  // Initialize Firebase
//   const firebase = 
  initializeApp(firebaseConfig);

  // init firestore service
  const db = getFirestore();

  
  export default db;