import {initializeApp} from 'firebase/app';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import {getAuth,updateProfile} from 'firebase/auth'

import 'firebase/compat/storage'
import 'firebase/compat/database'

const firebaseConfig = {
    apiKey: "AIzaSyCkqF9nc7Axf1zM_k3aIqDn0ypRp_Igy68",
    authDomain: "login-3498e.firebaseapp.com",
    projectId: "login-3498e",
    storageBucket: "login-3498e.appspot.com",
    messagingSenderId: "37401257050",
    appId: "1:37401257050:web:338a079616114c8fbd2463"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth=getAuth(app)

export default app