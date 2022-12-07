import { HandySvg } from "handy-svg";
import React from "react";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import style from './TaskItem.module.less'
import iClock from '../../source/icons/bx-history.svg'

export const TaskItem = ({ item, children }) => {
    const {
        idx,
        task,
        handlerOpen,
        changeHandlerTitle,
        saveHandler,
        schedular
    } = item
    const propsSchedular = schedular || { state: 'none' }
    const propsTextarea = {
        idx: idx,
        name: 'title',
        placeholder: '...',
        changeHandler: changeHandlerTitle,
        value: task.title,
        blurHandlerTextarea: saveHandler,
    }
    // SCHEDULAR
    let styleIcon = style.icon
    switch (propsSchedular.state) {
        case 'checked':
            styleIcon = style.icon + ' ' + style.checked
            break
        case 'warning':
            styleIcon = style.icon + ' ' + style.warning
            break
        case 'alarm':
            styleIcon = style.icon + ' ' + style.alarm
            break
        default:
            styleIcon = style.icon
            break;
    }
    // console.log('TASK ITEM =', task)
    let begin = new Date(task.dateBegin).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    let finish = new Date(task.dateFinish).toLocaleString('ru', { dateStyle: 'medium', timeStyle: 'short' })
    return (
        <div className={style.container} onClick={() => handlerOpen(idx)}>

            <div className={style.left}>
                {task.id === '' ?
                    <MyTextarea props={propsTextarea} />
                    :
                    <span>{task.title}</span>
                }
                {task.dateBegin && <span>Начало: {begin}</span>}
                {task.dateFinish && <span>Окончание: {finish}</span>}
            </div>

            <div className={style.right}>
                <HandySvg className={styleIcon} src={iClock} />
                {children}
            </div>

        </div>

    )
}