import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCqZbXGz1R11xNNEWhP-iVit9aTO2hSzNY',
  authDomain: 'pathpioneer-12684.firebaseapp.com',
  projectId: 'pathpioneer-12684',
  storageBucket: 'pathpioneer-12684.appspot.com',
  messagingSenderId: '621281019618',
  appId: '1:621281019618:web:0e085369f0ef0f3fad80bb',
  measurementId: 'G-WXRTS1Q1CB',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
