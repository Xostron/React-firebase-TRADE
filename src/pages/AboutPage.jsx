import React, { useRef, useEffect, useState } from "react";


export const AboutPage = () => {

    return (
        <div className="about">
            <ul >
                <h4 >Stack</h4>
                <li>Frontend: React (functional components, hooks), css(less)</li>
                <li>Backend: firebase - firestore database (сохранение данных о задаче), storage (сохранение файлов)</li>
                <li>Hoisting: firebase</li>
            </ul>

            <ul>
                <h4 >Функционал:</h4>
                <li>Онлайн комната с таймером хода торгов</li>
                <li>Участники</li>
                <li>Наблюдатели</li>
            </ul>

            <ul>
                <h4 >Ссылки:</h4>
                <li>
                    <a

                        href="https://github.com/Xostron/React-firebase-TRADE.git" target="_blank" >
                        Посмотреть код на GitHub
                    </a>
                </li>


                <h4 >Контактная информация</h4>
                <li>
                    <a
                        href="https://t.me/Xostron" target="_blank" >
                        Мой телеграм: https://t.me/Xostron
                    </a>

                </li>
                <li>

                    <a
                        href="mailto://xostron8@gmail.com.subject=вакансия" target="_blank" >
                        Почта: xostron8@gmail.com
                    </a>
                </li>
            </ul>

        </div>
    )
}
