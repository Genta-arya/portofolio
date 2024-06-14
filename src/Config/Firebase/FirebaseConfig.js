import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage untuk Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyAWAlRyIchdxfY2Hx0jcIKqZFreol9N9rw",
  authDomain: "portfolio-2acc8.firebaseapp.com",
  projectId: "portfolio-2acc8",
  storageBucket: "portfolio-2acc8.appspot.com",
  messagingSenderId: "792011351334",
  appId: "1:792011351334:web:6abb3336ee21245b050de7",
  measurementId: "G-29B0JW1DM7",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Inisialisasi Firebase Storage
export { db, auth, analytics, storage }; // Export storage
