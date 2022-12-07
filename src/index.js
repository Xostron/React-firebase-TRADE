import React, { createContext } from 'react';
import ReactDOMClient from 'react-dom/client';
import App from './App';
import './index.less';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import 'firebase/firestore'


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

// для того чтобы данные сохранялись в cloud firestore нужно,
// на сайте firebase зайти cloud firestore - Rules и изменить
// allow read, write: if false; на allow read, write: if true;

//firestorage хранение файлов
// для запросов на скачивание фалов необходимо настроить CORS:
// 1. установить gsutil
// 2. воспользоваться консолью VS и перейти к папке с файлом cors.json cd prj/server
// 3. выполнить команду:
// gsutil cors set cors.json gs://<your-cloud-storage-bucket> 


const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(
    <firebaseContext.Provider
        value={{ auth, db }}
    >
        <App />
    </firebaseContext.Provider>
)


