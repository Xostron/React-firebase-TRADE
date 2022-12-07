import React from "react";
import { useEffect, useState } from "react";
import { Title } from "../title/Title";
import { BtnIcon } from "../UI/button/btn-icon/BtnIcon";
import { InputFile } from "../UI/input/input-file/InputFile";
import { TodoItem } from "../todo/TodoItem";
import { ListCol } from '../UI/list/list-column/ListCol'
import { MyTextarea } from "../UI/input/areatext/MyTextarea";
import { InputDate } from "../UI/input/input-date/InputDate";
import { MyCheckbox } from "../UI/check/MyCheckbox";
import iClock from '../../source/icons/bxs-watch.svg'
import iDel from '../../source/icons/bx-trash-alt.svg'
import iFile from '../../source/icons/bx-file.svg'
import iAdd from '../../source/icons/bx-plus.svg'
import style from './DetailTaskItem.module.less'
import iBack from '../../source/icons/bx-x.svg'
import { BtnFile } from "../UI/button/btn-dwnl-del-file/BtnFile";


export const DetailTaskItem = ({ item }) => {
    const {
        task,
        files,
        propsTitle,
        propsInfo,
        propsDateBegin,
        propsDateFinish,
        propsFinishCheck,
        propsTitleTodos,
        propsTodosItem,
        propsAddTodo,
    } = item

    const [propsTodos, setPropsTodos] = useState([])


    // ********************************PROPS********************************
    // title
    const propsAreaTitle = {
        icon: iBack,
        handler: propsTitle.handler,
        propsTextarea: {
            name: 'title',
            placeholder: '...',
            iHandler: iDel,
            btnHandler: propsTitle.propsTextarea.btnHandler,
            changeHandler: propsTitle.propsTextarea.changeHandler,
            value: propsTitle.propsTextarea.value,
            blurHandlerTextarea: propsTitle.propsTextarea.blurHandlerTextarea
        }
    }
    //info 
    const propsTextareaInfo = {
        name: 'info',
        placeholder: '...',
        changeHandler: propsInfo.changeHandler,
        value: propsInfo.value,
        blurHandlerTextarea: propsInfo.blurHandlerTextarea
    }
    // DateBegin
    const propsInputDateBegin = {
        icon: iClock,
        placeholder: 'Начало',
        name: 'dateBegin',
        value: propsDateBegin.value,
        changeHandler: propsDateBegin.changeHandler,
        blurHandler: propsDateBegin.blurHandler,
        checked: task.checked,
        propsSchedular: propsDateBegin.schedularState
    }
    // DateFinish
    const propsInputDateFinish = {
        placeholder: 'Окончание',
        name: 'dateFinish',
        value: propsDateFinish.value,
        changeHandler: propsDateFinish.changeHandler,
        blurHandler: propsDateFinish.blurHandler
    }
    // DateFinishCheck
    const propsDateFinishCheck = {
        handler: propsFinishCheck.handler,
        checked: propsFinishCheck.checked,
        updChecked: propsFinishCheck.updChecked
    }
    // Todo title
    const propsTodosTitle = {
        text: 'Список задач:',
        childrenHandler: propsTitleTodos.handler
    }
    // input File
    const propsInputFile = {
        icon: iFile,
        name: 'Файлы:',
        handler: files.uploadHandler
    }
    // Todo2
    const propsTodo2 = {
        name: 'todo',
        placeholder: 'Добавить элемент...',
        changeHandler: propsAddTodo.changeHandler,
        type: false,
        blurHandlerTextarea: propsAddTodo.blurHandler
    }

    // callback для map todos
    const callbackPropsTodos = (todo, idx) =>
    ({
        propsCheck: {
            handler: propsTodosItem.checkboxHandler,
            checked: todo.checked,
            updChecked: propsTodosItem.updChecked,
            idx: idx,
            id: todo.id
        },
        propsTextarea: {
            idx,
            name: 'info',
            placeholder: '...',
            changeHandler: propsTodosItem.changeHandler,
            autoFocus: false,
            iHandler: iDel,
            btnHandler: propsTodosItem.btnHandler,
            type: true,
            checked: todo.checked,
            value: todo.info,
            blurHandlerTextarea: propsTodosItem.blurHandler
        }
    })
    //props list files
    const propsFiles = (item, idx) => ({
        idx: idx,
        name: item,
        handler: () => files.downloadHandler(idx),
        icon: iBack,
        iconHandler: () => files.deleteHandler(idx)
    })
    // обновление propsTodosItem
    useEffect(() => {
        propsTodosItem.todos && setPropsTodos(propsTodosItem.todos.map(callbackPropsTodos))
    }, [propsTodosItem.todos])

    // console.log('propsTaskItem = ', item)
    return (
        <div className={style.container}>

            <TodoItem props={propsAreaTitle} />
            <hr />
            <div className={style.description}>
                Описание:
                <MyTextarea props={propsTextareaInfo} />
            </div>
            <hr />
            <span className={style.inputFile}>
                <InputFile props={propsInputFile} />
            </span>
            <div className={style.files}>
                {files.items.map((item, idx) =>
                    // <div
                    //     className={style.file}
                    //     key={idx}
                    //     onClick={(e) => files.downloadHandler(e, idx)}
                    // >
                    //     {val}
                    // </div>
                    <BtnFile key={idx} props={propsFiles(item, idx)} />
                )}

            </div>
            <hr />
            <div className={style.time}>
                <InputDate props={propsInputDateBegin} />

                <hr />
                <div className={style.time2}>
                    <InputDate props={propsInputDateFinish} />
                    <MyCheckbox props={propsDateFinishCheck} />
                </div>
            </div>

            <div className={style.todo}>

                <Title props={propsTodosTitle}>
                    <BtnIcon
                        icon={iAdd}
                        handler={() => propsTodosTitle.childrenHandler()} />
                </Title>

                <ListCol
                    item={propsTodos}
                    renderItem={(val, idx) => { return (<TodoItem key={idx} props={val} />) }}
                />

                <div className={style.todo2}>
                    <MyTextarea props={propsTodo2} />
                </div>

            </div>
        </div>
    )
}