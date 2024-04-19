// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: "my-brand-patsicko.firebaseapp.com",
//   projectId: "my-brand-patsicko",
//   storageBucket: "my-brand-patsicko.appspot.com",
//   messagingSenderId: "938465124094",
//   appId: "1:938465124094:web:df1912eeb6e2fc4e280faf"
// };

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);


// rules_version = '2';

// // Craft rules based on data in your Firestore database
// // allow write: if firestore.get(
// //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
// service firebase.storage {
//   match /b/{bucket}/o {
//     match /{allPaths=**} {
//       allow read;
//       allow write: if
//       request.resource.size < 2 *1024 * 1024 && request.resource.contentType.matches('image/*')
//     }
//   }
// }







// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp9xGZMcNBjVN55aZcO0c3xDN8SusNgf4",
  authDomain: "packmedia.firebaseapp.com",
  projectId: "packmedia",
  storageBucket: "packmedia.appspot.com",
  messagingSenderId: "588897400296",
  appId: "1:588897400296:web:376705b3585975dbba605d",
  measurementId: "G-S0H0EN3M3E"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);