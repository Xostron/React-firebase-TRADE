import React from "react";
import style from './CardRoom.module.less'

export const CardRoom = ({ props }) => {
    const {
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer,
        timer
    } = props
    return (
        <div className={style.container}>
            loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum loremIpsum
        </div>
    )
}