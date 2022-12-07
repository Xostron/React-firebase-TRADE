import React from "react";
import style from './InputTimeHMS.module.less'
import { HandySvg } from "handy-svg";


export const InputTimeHMS = ({ props }) => {
    const {
        name,
        placeholder,
        value,
        changeHandler,
    } = props



    return (
        <div className={style.container}>

            {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>
            }

            <input
                className={style.time}
                name={name}
                value={value}
                type="time"
                step="1"
                onChange={(e) => changeHandler(e)}
            />
        </div>
    )
}