import React, { useEffect, useState, useContext } from "react"
import style from './DetailTradePage.module.less'
import { firebaseContext } from ".."
import { PlayersTable } from "../components/player-table/PlayersTable"
// import { useSchedular } from "../hooks/useSchedular"
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";


export const DetailTradePage = ({ props, timer }) => {
    const {
        room,
        uid,
        isOpen,
    } = props

    const { auth, db } = useContext(firebaseContext)
    let idRoom = room ? room.id : 0
    const [players, loading] = useCollectionData(query(collection(db, 'players'), where('idRoom', '==', idRoom)))

    // ******************************SHEDULER******************************

    let begin = room && new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = room && new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })


    // let remainingTime =

    let propsPlayerTable = {
        players,
        uid,
        idRoom,
        isOpen
    }

    // console.log("players DETAIL", room, players)
    return (
        <>
            {!loading && room ?
                <div className={style.container}>
                    <div className={style.info}>
                        <span>{room.title}</span>
                        <span>Начало торгов {begin}</span>
                        <span>Окончание торгов {finish}</span>
                        <span>Длительность хода {room.durationRound}</span>
                        <span>Пройдено ходов {timer.countRound}</span>
                        {timer.message !== '' ? <span>{timer.message}</span> : null}
                    </div>
                    <div className={style.hms}>
                        <span>Ход торгов: </span>
                        <span>
                            {timer.hh > 9 ? timer.hh : '0' + timer.hh}:
                            {timer.mm > 9 ? timer.mm : '0' + timer.mm}:
                            {timer.ss > 9 ? timer.ss : '0' + timer.ss}
                        </span>
                    </div>

                    <div className={style.players}>
                        <PlayersTable props={propsPlayerTable} />
                    </div>

                </div>
                :
                <div className={style.container2}>
                    <span>...Загружается</span>
                </div>
            }
        </>
    )
}