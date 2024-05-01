import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const id = process.env.REACT_APP_FIREBASE_ID;

const firebaseSetting = () => {
  const firebaseConfig = {
    projectId: id,
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return { db };
};

export default firebaseSetting;
