// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-5uACVuzvHKptFW_S97DEl81yLIlCKK0",
  authDomain: "recipe-sharing-app-4889e.firebaseapp.com",
  projectId: "recipe-sharing-app-4889e",
  storageBucket: "recipe-sharing-app-4889e.firebasestorage.app",
  messagingSenderId: "993334256763",
  appId: "1:993334256763:web:660a7852c9834000f2aede"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.log("firebase is working properly");
export default app;