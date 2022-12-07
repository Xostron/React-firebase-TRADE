import React from "react";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { MyCheckbox } from '../UI/check/MyCheckbox'
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import style from './TodoItem.module.less'

export const TodoItem = ({ props }) => {
    const {
        icon,
        handler,
        propsCheck,
        propsTextarea
    } = props
    return (
        <div className={style.container}>
            <div className={style.left}>
                {
                    propsCheck ?
                        <MyCheckbox props={propsCheck} />
                        :
                        <BtnIcon icon={icon} handler={handler} />
                }
            </div>
            <div className={style.right}>
                <MyTextarea props={propsTextarea} />
            </div>

        </div>
    )
}