import React from "react";
import style from './InputDate.module.less'
import { HandySvg } from "handy-svg";


export const InputDate = ({ props }) => {
    const {
        icon,
        name,
        placeholder,
        value,
        changeHandler,
        blurHandler,
        checked,
        propsSchedular,
        typeTime
    } = props

    let styleIcon = style.icon

    if (propsSchedular) {
        // console.log('inputDate = ', propsSchedular)
        // SCHEDULAR

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
    }

    return (
        <div className={style.container}>

            {icon ?
                <HandySvg className={styleIcon} src={icon} />
                :
                null
            }
            {value ?
                <span className={style.name}>{placeholder}:</span>
                :
                <span className={style.name}>{placeholder}...</span>


            }

            <input
                className={style.datetime}
                name={name}
                value={value}
                type={typeTime || "datetime-local"}
                onChange={(e) => changeHandler(e)}
                onBlur={(e) => {
                    blurHandler && blurHandler()
                }}
            />


        </div>
    )
}