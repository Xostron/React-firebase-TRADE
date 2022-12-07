import React, { useRef, useEffect } from 'react'
import { HandySvg } from 'handy-svg'
import style from './MyCheckbox.module.less'
import iOk from '../../../source/icons/bx-check.svg'


export const MyCheckbox = ({ props }) => {

    const {
        handler,
        checked,
        updChecked,
        idx,
        id
    } = props

    // const [active, setActive] = useState(false)

    const styleToggle = checked ? (style.toggle + ' ' + style.active) : style.toggle
    const styleTContainer = checked ? (style.container + ' ' + style.active) : style.container

    const checkRef = useRef()



    const handlerEvent = async (e) => {
        checkRef.current.click()
        let currentCheck = !checked
        handler('checked', checked, idx, id)
        updChecked(currentCheck, id)
    }


    return (
        <>
            <div
                className={styleTContainer}
                onClick={handlerEvent}

            >
                <HandySvg

                    className={styleToggle}
                    src={iOk}

                />
            </div>

            <input className={style.hiddenParent} type="checkbox" ref={checkRef} />

        </>
    )
}