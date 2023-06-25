// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCayXALN8kyNesMsbFo-e3dAtHQRXC_giQ',
  authDomain: 'e-commerce-mern-d75ac.firebaseapp.com',
  projectId: 'e-commerce-mern-d75ac',
  storageBucket: 'e-commerce-mern-d75ac.appspot.com',
  messagingSenderId: '676958880158',
  appId: '1:676958880158:web:c77e5765201aacd359d68f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get the Auth instance
const auth = getAuth(app)

// Create GoogleAuthProvider instance
const googleAuthProvider = new GoogleAuthProvider()

export { auth, googleAuthProvider }
