import React from "react";
import style from './InputTodo.module.less'
import { HandySvg } from 'handy-svg'
import { useState } from "react";

export const InputTodo = ({ props }) => {
    const {
        name,
        placeholder,
        autoFocus,
        iHandler,
        btnHandler,
        changeHandler,
        value,
        checked
    } = props

    const styleInput = [style.myInput]
    if (checked) {
        styleInput.push(style.active)
    }

    const [focus, setFocus] = useState(false)
    const focusHandler = (e) => {
        setFocus(true)
        e.stopPropagation()
    }
    const blurHandler = (e) => {
        setFocus(false)
        e.stopPropagation()
    }

    return (
        <div className={style.container}>
            <input
                className={styleInput.join(' ')}
                type='text'
                autoComplete='off'
                autoFocus={autoFocus || false}
                placeholder={placeholder}
                name={name}
                onChange={changeHandler}
                value={value}
                onFocus={focusHandler}
                onBlur={blurHandler}
            />

            {iHandler && focus &&
                <HandySvg
                    className={style.iconEnd}
                    src={iHandler}
                    onClick={btnHandler}
                />}
        </div>
    )
}