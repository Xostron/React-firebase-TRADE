import React, { createContext } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.less';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'
import { getStorage } from 'firebase/storage'

export const firebaseContext = createContext()

const firebaseConfig = {
    apiKey: "AIzaSyDwZs2dGg_vObKFhJzIEixeIxy71FSn6i0",
    authDomain: "xostron-todo-12.firebaseapp.com",
    projectId: "xostron-todo-12",
    storageBucket: "xostron-todo-12.appspot.com",
    messagingSenderId: "567976429918",
    appId: "1:567976429918:web:18834641ba41d1ceee27cf"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app);
// const storage = getStorage(app)


const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(
    <firebaseContext.Provider
        value={{ auth, db }}
    >
        <App />
    </firebaseContext.Provider>
)


