import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { BtnText } from "../UI/button/btn-text/BtnText"
import { MyTextarea } from "../UI/input/areatext/MyTextarea"
import { InputDate } from '../UI/input/input-date/InputDate'
import { InputText } from "../UI/input/input-text/InputText"
import { InputTimeHMS } from "../UI/input/input-time/InputTimeHMS"
import style from './CardFormCreate.module.less'

export const CardFormCreate = ({ props }) => {
    const [disable, setDisable] = useState(true)
    const {
        itemRoom,
        saveRoomHandler,
        IPropsTitle,
        IPropsDateBegin,
        IPropsDateFinish,
        IPropsDuration
    } = props

    const disableBtn = () => {
        if (itemRoom.title != '' && itemRoom.dateBegin != '' &&
            itemRoom.dateFinish != '' && itemRoom.durationRound != '') {
            setDisable(false)
        }
        else {
            setDisable(true)
        }
    }

    useEffect(() => {
        disableBtn()
    }, [itemRoom])

    return (
        <div className={style.container}>
            <MyTextarea props={IPropsTitle} />
            <InputDate props={IPropsDateBegin} />
            <InputDate props={IPropsDateFinish} />
            {/* <InputText props={IPropsDuration} /> */}
            <InputTimeHMS props={IPropsDuration} />
            <BtnText
                onClick={saveRoomHandler}
                disabled={disable}
            >
                Сохранить
            </BtnText>
        </div>
    )
}