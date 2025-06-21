// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA-5uACVuzvHKptFW_S97DEl81yLIlCKK0",
  authDomain: "recipe-sharing-app-4889e.firebaseapp.com",
  databaseURL: "https://recipe-sharing-app-4889e-default-rtdb.firebaseio.com",
  projectId: "recipe-sharing-app-4889e",
  storageBucket: "recipe-sharing-app-4889e.firebasestorage.app",
  messagingSenderId: "993334256763",
  appId: "1:993334256763:web:660a7852c9834000f2aede"
};

const app = initializeApp(firebaseConfig);

// ✅ Export all the services
export const auth = getAuth(app);
export const db = getDatabase(app);       // <== this is what you need
export const storage = getStorage(app);   // optional
export default app;
