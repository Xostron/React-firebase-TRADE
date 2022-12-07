import React from 'react'
import style from './MyModal.module.less'

export const MyModal = ({ children, visibleId, setVisibleId }) => {

    const rootClasses = [style.modal]
    if (visibleId) {
        rootClasses.push(style.active)
    }
    const rootClasses2 = [style.content]
    if (visibleId) {
        rootClasses2.push(style.active)
    }

    return (
        <div className={rootClasses.join(" ")} onClick={() => setVisibleId(false)}>
            <div className={rootClasses2.join(" ")} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}