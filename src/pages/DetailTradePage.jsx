import React, { useEffect, useState, useContext } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import style from './DetailTradePage.module.less'
// import iBack from '../source/icons/bx-x.svg'
// import iDel from '../source/icons/bx-trash-alt.svg'
// import { DetailTaskItem } from "../components/detail-task/DetailTaskItem.jsx"

// import { collection, addDoc, getDocs, serverTimestamp, orderBy, getDoc, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { firebaseContext } from ".."
import { PlayersTable } from "../components/player-table/PlayersTable"
// import { useSchedular } from "../hooks/useSchedular"
// import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";


export const DetailTradePage = ({ props }) => {
    const {
        room,
        uid,
        timer,
    } = props
    const { auth, db } = useContext(firebaseContext)
    const [players, loading] = useCollectionData(query(collection(db, 'players')))
    // const { state } = useLocation()
    // const { id } = useParams()
    // const history = useNavigate()
    // const [schedularState, setSchedularState] = useState({ state: 'none' })
    // const { db, storage } = useContext(firebaseContext)

    // ******************************SHEDULER******************************

    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })



    const propsPlayersTable = {
        players,
        uid
    }

    console.log("players DETAIL", players, room)
    return (
        <>
            {room ?
                <div className={style.container}>
                    <div className={style.info}>
                        <span>{room.title}</span>
                        <span>Начало торгов {begin}</span>
                        <span>Окончание торгов {finish}</span>
                        <span>{timer}</span>
                    </div>
                    <div>Ход торгов:</div>
                    <div className={style.players}>
                        <PlayersTable props={propsPlayersTable} />
                    </div>

                </div>
                :
                <div className={style.container}>
                    Комната не найдена!
                </div>
            }
        </>
    )
}