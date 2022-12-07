import React from "react";
import style from './InputFile.module.less'
import { HandySvg } from "handy-svg";
import { useRef } from "react";

export const InputFile = ({ props }) => {
    const {
        icon,
        name,
        handler
    } = props
    const refInput = useRef(null)
    const handleRefInputFile = (e) => {
        refInput.current.click()
    }
    return (
        <>

            <div className={style.container} onClick={handleRefInputFile}>
                <span className={style.name}>{name}</span>
                {icon ?
                    <HandySvg className={style.icon} src={icon} />
                    :
                    null
                }

            </div>
            <input
                className={style.hiddenInputFile}
                type="file"
                ref={refInput}
                onChange={handler}
            />

        </>
    )
}