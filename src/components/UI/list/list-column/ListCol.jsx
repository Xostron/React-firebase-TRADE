import React from "react";
import style from './ListCol.module.less'

export const ListCol = ({ item, renderItem, }) => {
    const items = item.map(renderItem)
    function get2dimensional(array, limit) {
        const result = [];
        for (var i = 0; i < array.length; i += limit) {
            result.push(array.slice(i, i + limit));
        }

        return result;
    }
    const newItems = get2dimensional(items, 5)

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