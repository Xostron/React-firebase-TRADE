import React, { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
// import iBack from '../source/icons/bx-x.svg'
// import iDel from '../source/icons/bx-trash-alt.svg'
// import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"

// import { collection, addDoc, getDocs, serverTimestamp, orderBy, getDoc, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from ".."
// import { useSchedular } from "../hooks/useSchedular"
// import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";

export const DetailTradePage = () => {
    // const { state } = useLocation()
    const { id } = useParams()
    const history = useNavigate()
    // const [schedularState, setSchedularState] = useState({ state: 'none' })
    // const { db, storage } = useContext(firebaseContext)

    // ******************************SHEDULER******************************

    // console.log('GET FILE = ', files)
    return (
        <div>
            Комната {id}

        </div>
    )
}