import React from "react";
import style from './ListSquare.module.less'

export const ListSquare = ({ item, renderItem, }) => {
    const items = item.map(renderItem)

    // преобразование 1мерного в 2мерный массив
    function get2Arr(array, limit) {
        const result = [];
        for (var i = 0; i < array.length; i += limit) {
            result.push(array.slice(i, i + limit));
        }

        return result;
    }
    const newItems = get2Arr(items, 5)

    return (
        <div className={style.wrapper}>
            <div className={style.container}>
                {newItems.map((component, idx) => {
                    return (
                        <div key={idx} className={style.row}>
                            {component.map(val => { return (val) })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}