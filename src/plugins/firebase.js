import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore';

const app = initializeApp({
    apiKey: "AIzaSyBuqK4vfgJO3tcDR52KGuuWWFZgoDesqHw",
    authDomain: "todolist-firebasevuejs.firebaseapp.com",
    projectId: "todolist-firebasevuejs",
    storageBucket: "todolist-firebasevuejs.appspot.com",
    messagingSenderId: "203432502240",
    appId: "1:203432502240:web:f8889f90e4b776dea2c185"
});
const auth = getAuth(app);
const db = getFirestore(app);
const tasksCollection = collection(db, 'tasks');
const profileCollection = collection(db, 'profile');

export {
    auth, db, tasksCollection, profileCollection, app
}