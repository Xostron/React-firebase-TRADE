import React from "react";
import style from './BtnIcon.module.less'
import { HandySvg } from 'handy-svg'

export const BtnIcon = ({ icon, handler, width = 24, height = 24, children }) => {
    return (
        <div className={style.container} onClick={handler}>
            {children}
            <HandySvg className={style.icon} src={icon} width={width} height={height} />
        </div>
    )
}