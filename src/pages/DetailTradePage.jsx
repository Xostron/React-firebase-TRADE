import React, { useEffect, useState, useContext } from "react"
import style from './DetailTradePage.module.less'
import { firebaseContext } from ".."
import { PlayersTable } from "../components/player-table/PlayersTable"
// import { useSchedular } from "../hooks/useSchedular"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";


export const DetailTradePage = ({ props }) => {
    const {
        room,
        uid,
        timer,
    } = props

    const { auth, db } = useContext(firebaseContext)
    let idRoom = room ? room.id : 0
    const [players, loading] = useCollectionData(query(collection(db, 'players'), where('idRoom', '==', idRoom)))

    // ******************************SHEDULER******************************

    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })



    let propsPlayerTable = {
        players,
        uid,
        idRoom,
    }

    // console.log("players DETAIL", players, room)
    return (
        <>
            {room && players ?
                <div className={style.container}>
                    <div className={style.info}>
                        <span>{room.title}</span>
                        <span>Начало торгов {begin}</span>
                        <span>Окончание торгов {finish}</span>

                    </div>
                    <div>Ход торгов: {timer}</div>
                    <div className={style.players}>
                        <PlayersTable props={propsPlayerTable} />
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