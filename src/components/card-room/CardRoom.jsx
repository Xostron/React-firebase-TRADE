import React from "react";
import { BtnText } from "../UI/button/btn-text/BtnText";
import style from './CardRoom.module.less'

export const CardRoom = ({ props }) => {
    const {
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer,
        timer
    } = props
    let begin = new Date(room.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = new Date(room.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    return (
        <div className={style.container}>

            <span>{room.title}</span>
            <span>Начало торгов {begin}</span>
            <span>Окончание торгов {finish}</span>
            <span>{timer}</span>

            <BtnText onClick={() => handlerEnterAsPlayer(idx)}>
                Войти как участник
            </BtnText>
            <BtnText onClick={() => handlerEnterAsWatch(idx)}>
                Войти как наблюдатель
            </BtnText>

        </div>
    )
}