import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2OVl_LMvJ12_hoV8e6CRV_cAmhnwCiR0",
  authDomain: "seafoods-485ee.firebaseapp.com",
  projectId: "seafoods-485ee",
  storageBucket: "seafoods-485ee.firebasestorage.app",
  messagingSenderId: "1028775726077",
  appId: "1:1028775726077:web:e0929839f24e5bd90be794",
  measurementId: "G-P3LNVD0TZP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Analytics (guarded for SSR/browser support)
export let analytics: ReturnType<typeof getAnalytics> | null = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export default app;
