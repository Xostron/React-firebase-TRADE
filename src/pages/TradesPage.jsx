import React, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { ListSquare } from "../components/UI/list/list-column/ListSquare"
import { BtnIcon } from '../components/UI/button/btn-icon/BtnIcon'
import { Title } from "../components/title/Title"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useContext } from "react"
import { firebaseContext } from ".."
import iDel from '../source/icons/bx-trash-alt.svg'
import iAdd from '../source/icons/bx-plus.svg'
import { collection, addDoc, getDocs, serverTimestamp, orderBy, where, query, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { useSchedular } from "../hooks/useSchedular"
import { CardRoom } from "../components/card-room/CardRoom"
import { MyModal } from '../components/UI/modal/MyModal'
import { CardFormCreate } from "../components/card-form-create/CardFormCreate"


export const TradesPage = () => {
    // hooks
    const history = useNavigate()
    const { auth, db } = useContext(firebaseContext)
    const [user, loading, error] = useAuthState(auth)
    const { currentTime } = useSchedular(callbackSchedular, 1000)

    // данные из БД
    const [rooms, setRooms] = useState([])
    // модифицированные
    const [propsRooms, setPropsRooms] = useState([])
    const [timersSchedular, setTimersSchedular] = useState([])
    // states
    const [modalCreate, setModalCreate] = useState(false)
    const [itemRoom, setItemRoom] = useState({
        id: '',
        title: '',
        dateBegin: '',
        dateFinish: '',
        durationRound: '00:02:00',
        createRoom: ''
    })
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
    const changeHandlerForm = (e) => {
        // console.log(e.target.name, e.target.value)
        setItemRoom({ ...itemRoom, [e.target.name]: e.target.value })
    }
    // ****************************API firebase*****************************
    // получить все комнаты
    const getRooms = async () => {
        // для использования в запросе where и orderBy одновременно, возможно, 
        // надо будет проиндексировать БД, 
        // сгенерируется ошибка со ссылкой на индексирование БД
        //  let q = query(collection(db, "rooms"), where("uid", "==", user.uid), orderBy('createAT', 'desc'))
        let q = query(collection(db, "rooms"), orderBy('createAT', 'desc'))
        const querySnapshot = await getDocs(q)
        console.log('query', q)
        querySnapshot.forEach((doc) => {
            let data = { ...doc.data(), id: doc.id }
            setRooms((prev) => [...prev, data])
        })
    }
    // создание комнаты
    const saveRoomHandler = async () => {
        // setRooms([...rooms, itemRoom])
        console.log(itemRoom)
        try {
            const docRef = await addDoc(collection(db, "rooms"), {
                title: itemRoom.title,
                dateBegin: itemRoom.dateBegin,
                dateFinish: itemRoom.dateFinish,
                durationRound: itemRoom.durationRound,
                createAT: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
            // присваиваем id Комнате для последующих операций обновления
            // setRooms
            // setTasks(tasks.map((val, index) => index === idx ? { ...val, id: docRef.id } : val))
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
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
    // const saveOrUpdTask = async (idx) => {
    //     console.log('saveOrUpd = ', tasks[idx].id, tasks[idx])
    //     if (tasks[idx].id === '') {
    //         saveTask(idx)
    //     }
    //     else {
    //         updTask(idx)
    //     }
    // }
    // ****************************API firebase*****************************

    // *******************************EFFECT*******************************
    useEffect(() => {
        getRooms()
    }, [])
    // обновление пропсов для ListSquare
    useEffect(() => {
        rooms && setPropsRooms(rooms.map(cbPropsRoom))
        console.log('rooms', rooms)
    }, [rooms])
    console.log('time = ', new Date().toLocaleString())
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

    const propsFormCreate = {
        itemRoom,
        saveRoomHandler,
        IPropsTitle: {
            name: 'title',
            placeholder: 'Введите название лота...',
            changeHandler: changeHandlerForm,
            value: itemRoom.title,
            type: true
        },
        IPropsDateBegin: {
            name: 'dateBegin',
            placeholder: 'Начало торгов',
            changeHandler: changeHandlerForm,
            value: itemRoom.dateBegin
        },
        IPropsDateFinish: {
            name: 'dateFinish',
            placeholder: 'Окончание торгов',
            changeHandler: changeHandlerForm,
            value: itemRoom.dateFinish
        },
        IPropsDuration: {
            name: 'durationRound',
            placeholder: 'Длительность хода',
            changeHandler: changeHandlerForm,
            value: itemRoom.durationRound
        }
    }

    return (
        <div>

            <Title props={titleProps}>
                <BtnIcon icon={iAdd} handler={() => { setModalCreate(true) }} />
            </Title>

            <ListSquare item={propsRooms} renderItem={(room, idx) => {
                return (
                    <CardRoom key={idx} props={room} />
                )
            }} />

            <MyModal visibleId={modalCreate} setVisibleId={setModalCreate}>
                <CardFormCreate props={propsFormCreate} />
            </MyModal>
        </div>
    )
}



