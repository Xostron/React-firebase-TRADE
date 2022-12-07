import React from "react";
import style from "./BtnText.module.less"

export const BtnText = ({ children, ...props }) => {
    return (
        <button className={style.container} {...props}>
            {children}
        </button>
    )
}