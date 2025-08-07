// src/firebase.js (or wherever you prefer to put your Firebase initialization)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA3wwXweTXEUvVUYBALucxtzM0TJSrVslA",
  authDomain: "aryan-fitness-app.firebaseapp.com",
  projectId: "aryan-fitness-app",
  storageBucket: "aryan-fitness-app.firebasestorage.app",
  messagingSenderId: "666317295642",
  appId: "1:666317295642:web:a293c14081233d1c5701a3"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const formSubmit = async (data) => {
  try {
    
    console.log('Data to be saved:', data);
    // Example: await setDoc(doc(db, 'users', data.email), data);
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export { db }; 



