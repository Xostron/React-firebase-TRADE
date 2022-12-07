import React from "react";
import style from './InputText.module.less'
import { HandySvg } from 'handy-svg'

export const InputText = ({ props }) => {
    const {
        name,
        placeholder,
        autoFocus,
        changeHandler,
        value,
    } = props
    return (
        <div className={style.container}>
            <input
                className={style.myInput}
                type='text'
                autoComplete='off'
                autoFocus={autoFocus || false}
                placeholder={placeholder}
                name={name}
                onChange={changeHandler}
                value={value}
            />
        </div>
    )
}