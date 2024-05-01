import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseSetting = () => {
  const firebaseConfig = {
    key: "AIzaSyCFBGM5rf7h8Na94dGdQ-ZT829GehrOz1g",
    authDomain: "tscenping.firebaseapp.com",
    projectId: "tscenping",
    storageBucket: "tscenping.appspot.com",
    messagingSenderId: "414079852656",
    appId: "1:414079852656:web:40da4680c3437d0d46d4b5",
    measurementId: "G-L4MDLD6WWR",
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  return { db };
};

export default firebaseSetting;
