import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvs3e4QyTJtIHMUjB88mysT-zqo2QTXko",
  authDomain: "pioneerapi.firebaseapp.com",
  projectId: "pioneerapi",
  storageBucket: "pioneerapi.appspot.com",
  messagingSenderId: "180850817847",
  appId: "1:180850817847:web:43100deedf3c711f1938b2",
  measurementId: "G-T4VEJ3FGZ8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
