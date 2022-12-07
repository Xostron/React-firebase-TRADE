import React, { useState, useEffect, useRef, useCallback } from "react";


export const useSchedular = (callback, delay) => {

    const updCallback = useRef()

    const [currentTime, setCurrentTime] = useState(new Date())



    useEffect(() => {
        updCallback.current = callback
    }, [callback])


    useEffect(() => {

        const schedular = () => {
            updCallback.current()
            setCurrentTime(new Date())
        }

        let id = setInterval(schedular, delay)
        return () => clearInterval(id)
    }, [])
    return { currentTime }
}