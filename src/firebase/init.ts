import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";


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
  const firebaseApp = initializeApp(firebaseConfig);

  // init firestore service
  const db = getFirestore();

  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = getStorage(firebaseApp);

  // Initialize Firebase Authentication and get a reference to the service
  const auth = getAuth(firebaseApp);


  
  export {
    db,
    storage,
    auth,
  };