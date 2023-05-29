import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAUhvr4DjzfFA7xjL5xf7BeFA7ktjaZsmg",
    authDomain: "todoapp-9270e.firebaseapp.com",
    projectId: "todoapp-9270e",
    storageBucket: "todoapp-9270e.appspot.com",
    messagingSenderId: "189869476636",
    appId: "1:189869476636:web:a6f8d5dc5de89e457888d9"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export default db;