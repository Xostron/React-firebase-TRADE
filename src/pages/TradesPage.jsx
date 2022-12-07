import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
// import { TaskItem } from "../components/task/TaskItem"
import { ListCol } from "../components/UI/list/list-column/ListCol"
// import { BtnIcon } from '../components/UI/button/btn-icon/BtnIcon'
import { Title } from "../components/title/Title"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from "react"
import { firebaseContext } from ".."
// import iDel from '../source/icons/bx-trash-alt.svg'
// import iAdd from '../source/icons/bx-plus.svg'
// import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useSchedular } from "../hooks/useSchedular"
import { CardRoom } from "../components/card-room/CardRoom"



export const TradesPage = () => {
    // hooks
    const history = useNavigate()
    const { auth, db } = useContext(firebaseContext)
    const [user, loading, error] = useAuthState(auth)
    const { currentTime } = useSchedular(callbackSchedular, 1000)

    // данные из БД
    const [rooms, setrooms] = useState([{ a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }, { a: 1 }])
    // модифицированные
    const [propsRooms, setPropsRooms] = useState([])
    const [timersSchedular, setTimersSchedular] = useState([])


    // ******************************SHEDULER******************************
    function callbackSchedular() {
        console.log('TradesPage schedular')
    }
    // ******************************HANDLERS******************************
    const handlerEnterAsWatch = () => {
        console.log('TradesPage handler as watch')
    }
    const handlerEnterAsPlayer = () => {
        console.log('TradesPage handler as watch')
    }

    // ****************************API firebase*****************************
    // // удалить задачу
    // const delTask = async (idx) => {
    //     console.log('delete api = ', idx)
    //     let arr = tasks
    //     if (tasks[idx].id) {
    //         await deleteDoc(doc(db, "tasks", tasks[idx].id));

    //         arr.splice(idx, 1)
    //         setTasks([...arr])
    //     }
    //     else {
    //         arr.splice(idx, 1)
    //         setTasks([...arr])
    //     }

    // }
    // // обновить задачу
    // const updTask = async (idx) => {
    //     // let updData = tasks[idx]
    //     console.log('upd = ', tasks[idx])
    //     const DocRef = doc(db, "tasks", tasks[idx].id);
    //     await updateDoc(DocRef, {
    //         "title": tasks[idx].title,
    //         "info": tasks[idx].info,
    //         "dateBegin": tasks[idx].dateBegin,
    //         "dateFinish": tasks[idx].dateFinish,
    //         "createAT": serverTimestamp()
    //     });
    // }
    // // прочитать все задачи
    // const getTasks = async () => {


    //     let q = query(collection(db, "tasks"), where("uid", "==", user.uid), orderBy('createAT', 'desc'))


    //     const querySnapshot = await getDocs(q)
    //     // const q = query(collection(db, "cities"), where("capital", "==", true));

    //     console.log('query', q)
    //     querySnapshot.forEach((doc) => {
    //         let data = { ...doc.data(), id: doc.id }
    //         setTasks((prev) => [...prev, data])
    //     })

    // }
    // // создать одну задачу
    // const saveTask = async (idx) => {
    //     console.log('saveTask = ', tasks[idx])
    //     try {
    //         const docRef = await addDoc(collection(db, "tasks"), {
    //             uid: tasks[idx].uid,
    //             title: tasks[idx].title,
    //             info: tasks[idx].info,
    //             dateBegin: tasks[idx].dateBegin,
    //             dateFinish: tasks[idx].dateFinish,
    //             checked: tasks[idx].checked,
    //             createAT: serverTimestamp()
    //         });
    //         console.log("Document written with ID: ", docRef.id);
    //         // присваиваем id задаче для последующих операци обновления
    //         setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
    //     } catch (e) {
    //         console.error("Error adding document: ", e);
    //     }
    //     // console.log('save = ', saveId)

    // }

    // const saveOrUpdTask = async (idx) => {
    //     console.log('saveOrUpd = ', tasks[idx].id, tasks[idx])
    //     if (tasks[idx].id === '') {
    //         saveTask(idx)
    //     }
    //     else {
    //         updTask(idx)
    //     }
    // }
    // *********************************Props**********************************
    const titleProps = {
        title: 'Текущие торги'
    }
    const cbPropsRoom = (room, idx) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer,
        timer: timersSchedular[idx]
    })
    const callbackRenderRoom = (room, idx) => {
        return (
            <CardRoom key={idx} props={room} />
        )
    }
    // *******************************EFFECT*******************************
    // обновление пропсов для ListCol
    useEffect(() => {
        rooms && setPropsRooms(rooms.map(cbPropsRoom))
    }, [rooms])

    return (
        <div>
            <Title props={titleProps} />
            <ListCol item={propsRooms} renderItem={callbackRenderRoom} />
        </div>
    )
}



