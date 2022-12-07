import { HandySvg } from "handy-svg";
import React from "react";
import style from './BtnFile.module.less'


export const BtnFile = ({ props }) => {

    const {
        name,
        handler,
        icon,
        iconHandler,
    } = props

    const iconHandlerFile = (e) => {
        iconHandler(e)
        e.stopPropagation()
    }
    return (
        <div className={style.container} onClick={handler}>
            <span>{name}</span>
            <HandySvg className={style.icon} src={icon} onClick={iconHandlerFile} />
        </div>
    )
}