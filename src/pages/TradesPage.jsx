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
import { DetailTradePage } from "./DetailTradePage"
import { useCollectionData } from 'react-firebase-hooks/firestore'

export const TradesPage = () => {
    // hooks
    const { auth, db } = useContext(firebaseContext)
    const [user] = useAuthState(auth)
    const { currentTime } = useSchedular(() => callbackSchedular(), 1000)
    const [roomPlayers, setRoomPlayers] = useState([])
    // данные из БД
    const [rooms, setRooms] = useState([])

    // модифицированные
    const [propsRooms, setPropsRooms] = useState([])
    const [timersSchedular, setTimersSchedular] = useState([])
    const [propsDetailRoom, setPropsDetailRoom] = useState({})
    // states
    const [modalCreate, setModalCreate] = useState(false)
    const [modalRoom, setModalRoom] = useState(false)
    const [itemRoom, setItemRoom] = useState({
        id: '',
        title: '',
        dateBegin: '',
        dateFinish: '',
        durationRound: '00:02:00',
        createRoom: ''
    })
    // оставшееся время хода
    const [remainingTime, setRemainingTime] = useState({})

    // ******************************SHEDULER******************************
    const [forTimer, setForTimer] = useState({})
    function callbackSchedular() {
        // console.log('TradesPage schedular', remainingTime)
        // setRemainingTime(new Date(currentTime).toISOString())
        if (modalRoom) {
            // console.log('SHEDULAR = ', Date.parse(currentTime), propsDetailRoom.room)
            let begin = Date.parse(propsDetailRoom.room.dateBegin)
            let finish = Date.parse(propsDetailRoom.room.dateFinish)
            let totalTime = finish - begin
            let elapsedTime = Date.parse(currentTime) - begin
            // console.log('SHEDULAR TOTAL = ', totalTime)
            // console.log('SHEDULAR ELAPSED= ', elapsedTime)
            let roundBig = Date.parse('2022-12-10T' + propsDetailRoom.room.durationRound)
            let roundZero = Date.parse('2022-12-10T00:00:00')
            let round = roundBig - roundZero
            // console.log('SHEDULAR ROUND= ', round)
            let countRound = parseInt(elapsedTime / round)
            let moduloRound = elapsedTime % round
            let remaining = round - moduloRound
            // console.log('SHEDULAR ROUND= ', countRound, remaining)
            let hh = parseInt(remaining / 3600000)
            let mm = parseInt((remaining - hh * 3600000) / 60000)
            let ss = (remaining - hh * 3600000 - mm * 60000) / 1000
            console.log('SHEDULAR ROUND= ', countRound, remaining, `${hh}:${mm}:${ss}`)
            setRemainingTime({ hh, mm, ss, countRound })
        }
        else {

        }
    }
    // ******************************HANDLERS******************************

    const handlerEnterAsWatch = (idx) => {
        // console.log('TradesPage handler as watch', idx, rooms[idx])
        setModalRoom(true)
        setPropsDetailRoom(cbPropsDetailRoom(idx))
    }

    const handlerEnterAsPlayer = async (idxRoom) => {

        if (user) {
            // проверка на участника комнаты
            let isAuthInRoom = await isMyRoom(idxRoom)

            if (isAuthInRoom === true) {
                // являюсь участником - заходим
                let countPlayers = await getPlayers(idxRoom)
                // console.log('являюсь участником', countPlayers)
            }
            else {
                // не являемся участником - проверка на регистрацию (лимит участников)
                let countPlayers = await getPlayers(idxRoom)
                // console.log('не являюсь участником', countPlayers)
                if (countPlayers.length >= 5) {
                    // превышен лимит участников - войти как наблюдатель
                    // console.log("превышен лимит участников - как наблюдатель")

                }
                else {
                    // есть места - регистрируемся и заходим
                    // console.log("есть свободные места")
                    savePlayer(idxRoom)
                }
            }
            setPropsDetailRoom(cbPropsDetailRoom(idxRoom))
            setModalRoom(true)
        }
        else {
            alert('Войдите через аккаунт goole:)')
        }
    }

    const changeHandlerForm = (e) => {
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
        // console.log('query', q)
        let data = []
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id })
        })
        setRooms(data)
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
            getRooms()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    // создание участника комнаты (Войти как участник)
    const savePlayer = async (idxRoom) => {
        try {
            const docRef = await addDoc(collection(db, "players"), {
                idRoom: rooms[idxRoom].id,
                uid: user.uid,
                userName: user.email,
                row1: '',
                row2: 0,
                row3: 0,
                row4: 0,
                row5_1: 0,
                row5_2: 0,
                row5_3: 0,
                online: true,
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
    // запрос являюсь ли участником комнаты
    const isMyRoom = async (idxRoom) => {
        try {
            let q = query(collection(db, "players"),
                where("idRoom", "==", rooms[idxRoom].id),
                where("uid", "==", user.uid))
            const querySnapshot = await getDocs(q)
            let data
            querySnapshot.forEach((doc) => {
                data = doc.data()
            })
            if (data) return true
            else return false
        } catch (error) {
            return false
        }
    }
    // получить участников (игроков) комнаты
    const getPlayers = async (idxRoom) => {
        try {
            let q = query(collection(db, "players"),
                where("idRoom", "==", rooms[idxRoom].id))
            const querySnapshot = await getDocs(q)
            let data = []
            querySnapshot.forEach((doc) => {
                data.push(doc.data())
            })
            return data
        } catch (error) { }
    }
    // 
    // удалить задачу
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
    }, [rooms, user])

    // console.log("modal room", rooms)
    // console.log("players", players)
    // console.log("players Room", roomPlayers)
    // *********************************Props**********************************
    // оглавление
    const titleProps = {
        title: 'Текущие торги'
    }
    // формирование props для отображения карточек-комнат CardRoom
    const cbPropsRoom = (room, idx) => ({
        idx,
        room,
        handlerEnterAsWatch,
        handlerEnterAsPlayer,
        timer: timersSchedular[idx]
    })
    // props для формы создания комнаты
    const propsFormCreate = {
        itemRoom,
        saveRoomHandler,
        setModalCreate,
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
    // формирование props для просмотра комнаты в DetailTradePage 
    const cbPropsDetailRoom = (idx) => ({
        room: rooms[idx],
        uid: user ? user.uid : null,
        isOpen: true,
    })
    // console.log('PAGE = ', rooms)
    return (
        <div>

            <Title props={titleProps}>
                <BtnIcon
                    icon={iAdd}
                    handler={() => {
                        user ?
                            setModalCreate(true)
                            :
                            alert('Войдите через аккаунт google:)')

                    }}
                />
            </Title>

            <ListSquare item={propsRooms} renderItem={(room, idx) => {
                return (
                    <CardRoom key={idx} props={room} />
                )
            }} />

            <MyModal visibleId={modalCreate} setVisibleId={setModalCreate}>
                <CardFormCreate props={propsFormCreate} />
            </MyModal>

            <MyModal visibleId={modalRoom} setVisibleId={setModalRoom}>
                <DetailTradePage props={propsDetailRoom} timer={remainingTime} />
            </MyModal>


        </div>
    )
}



