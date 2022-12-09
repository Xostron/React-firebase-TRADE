import React from "react";
import style from './InputNumber.module.less'
import { HandySvg } from "handy-svg";


export const InputNumber = ({ props }) => {
    const {
        name,
        placeholder,
        value,
        changeHandler,
    } = props



    return (
        <div className={style.container}>

            {/* {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>
            } */}

            <input
                className={style.numb}
                name={name}
                value={value}
                type="number"
                onChange={(e) => changeHandler(e)}
            />
        </div>
    )
}