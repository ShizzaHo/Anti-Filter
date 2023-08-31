'use client';

import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import logo from '../../../public/logo.svg';
import { clearTimeout } from 'timers';
import generateDifferenceArray from '@/app/lib/generateDifferenceArray';
import generateRandomID from '@/app/lib/randomID';

export default function App() {
    const [requestWaiter, setRequestWaiter] = useState(
        setTimeout(() => {}, 400)
    );

    const [unfilteredMode, setUnfilteredMode] = useState('CAR');
    const [isModeSelect, setIsModeSelect] = useState(true);
    const [filteredText, setFilteredText] = useState('');
    const [unfilteredText, setUnfilteredText] = useState('');
    const [differenceArray, setDifferenceArray] = useState<
        [string, 'original' | 'change'][]
    >([]);

    const handlers = {
        changeUnfilteredText: (e: any) => {
            setFilteredText(e.target.value);
        },
        selectMode: (mode: string) => {
            setUnfilteredMode(mode);
            setIsModeSelect(false);
        }
    };

    const selectMode = () => {
        setIsModeSelect(true);
    }

    const getModeName = () => {
        switch (unfilteredMode) {
            case "CAR":
                return "Замена кириллицы"
                break;
            case "UGLY":
                return "Уродливый"
                break;
            case "SCRATCHED":
                return "Поцарапанный"
                break;
            case "SCRATCHEDEASY":
                return "Легкая царапка"
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.clearTimeout(requestWaiter);
        setRequestWaiter(
            setTimeout(async () => {
                const response = await fetch(
                    `/api/unfiltered?method=${unfilteredMode}&text=${filteredText}`
                );
                if (response.ok) {
                    const results = await response.json();
                    setUnfilteredText(results.result.formatted);
                    setDifferenceArray(
                        generateDifferenceArray(
                            filteredText,
                            results.result.formatted
                        )
                    );
                }
            }, 400)
        );
    }, [filteredText]);

    return (
        <div className={styles.app}>
            <header className={styles.header}>
                <span>О проекте</span>
                <img src={logo.src}></img>
                <span>Автор</span>
            </header>
            <div className={styles.mode}>
                {isModeSelect ? (
                    <>Выбор режима</>
                ) : (
                    <>
                        Выбран режим обхода фильтров: 
                        <span onClick={selectMode}>{getModeName()}</span>
                    </>
                )}
            </div>
            {isModeSelect == false ? (
                <main className={styles.main}>
                    <div className={styles.editor}>
                        <textarea
                            className={styles.textarea}
                            placeholder='Введите здесь текст который нужно отформатироать'
                            value={filteredText}
                            onChange={handlers.changeUnfilteredText}
                        ></textarea>
                    </div>
                    <div className={styles.resultContainer}>
                        <div className={styles.result}>
                            <textarea
                                className={styles.textarea}
                                readOnly
                                placeholder='Здесь автоматически появится уже отформатированный текст'
                                value={unfilteredText}
                            ></textarea>
                        </div>
                        <div className={styles.variance}>
                            {differenceArray.length == 0 ? (
                                <span className={styles.noDifference}>
                                    Здесь будет подробный текст с тем где
                                    произошли изменения
                                </span>
                            ) : undefined}
                            {differenceArray.map((item) => {
                                const key = generateRandomID(8);
                                return item[1] == 'original' ? (
                                    <span key={key}>{item[0]}</span>
                                ) : (
                                    <span
                                        className={styles.difference}
                                        key={key}
                                    >
                                        {item[0]}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </main>
            ) : undefined}
            {isModeSelect == true ? (
                <main className={styles.modeSelect}>
                    <div className={styles.modeSelect__row}>
                        <div
                            className={
                                styles.modeSelect__column +
                                ' ' +
                                styles.modeSelect__CAR
                            }
                            onClick={()=>{handlers.selectMode("CAR")}}
                        >
                            <div>
                                <h1 className={styles.modeSelect__title}>
                                    Замена кириллицы
                                </h1>
                                <p className={styles.modeSelect__desc}>
                                    Самый красивый по восприятию режим, который
                                    меняет символы из кириллицы на аналогичные
                                    символы из латиницы, а также заменяет
                                    некоторые буквы на символы, это к сожалению
                                    бывает заметно на разных шрифтах, но все
                                    равно это остается лучшим режимом
                                </p>
                            </div>
                            <div>
                                <span className={styles.modeSelect__simple}>
                                    Пример отформатированного текста: Xyли ты
                                    этo читaeшь?
                                </span>
                                <span className={styles.modeSelect__rec}>
                                    Работает почти везде, потому рекомендуется
                                    использовать именно этот вариант
                                </span>
                            </div>
                        </div>
                        <div
                            className={
                                styles.modeSelect__column +
                                ' ' +
                                styles.modeSelect__SCRATCHED
                            }
                            onClick={()=>{handlers.selectMode("SCRATCHED")}}
                        >
                            <div>
                                <h1 className={styles.modeSelect__title}>
                                    Поцарапанный
                                </h1>
                                <p className={styles.modeSelect__desc}>
                                    В целом достаточно читаемый и условно
                                    приятный для восприятия режим, однако
                                    работать он будет не везде, используемые
                                    вами сервисы могут удалять подобные
                                    Zalgo-подобные юникод символы, или же просто
                                    игнорировать их для проверки на цензуру
                                </p>
                            </div>
                            <div>
                                <span className={styles.modeSelect__simple}>
                                    Пример отформатированного текста: Х̷у̷л̷и̷ т̷ы̷
                                    э̷т̷о̷ ч̷и̷т̷а̷е̷ш̷ь̷?
                                </span>
                                <span className={styles.modeSelect__noRec}>
                                    Работает не везде, не рекомендуется
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.modeSelect__row}>
                        <div
                            className={
                                styles.modeSelect__column +
                                ' ' +
                                styles.modeSelect__CAR
                            }
                            onClick={()=>{handlers.selectMode("UGLY")}}
                        >
                            <div>
                                <h1 className={styles.modeSelect__title}>
                                    Уродливый
                                </h1>
                                <p className={styles.modeSelect__desc}>
                                    Самый отвратительный по восприятию режим,
                                    который меняет символы из кириллицы на
                                    отдаленно похожие по образу символы, это до
                                    ужаса заметно, противно и неудобно для
                                    восприятия, именно такой режим любят
                                    использовать безмозглые тиктокершы
                                </p>
                            </div>
                            <div>
                                <span className={styles.modeSelect__simple}>
                                    Пример отформатированного текста: Хyлu ты
                                    эт0 4uт@еwb?
                                </span>
                                <span className={styles.modeSelect__noRec}>
                                    Работает везде, однако читать это нереально,
                                    не рекомендуется
                                </span>
                            </div>
                        </div>
                        <div
                            className={
                                styles.modeSelect__column +
                                ' ' +
                                styles.modeSelect__SCRATCHEDEASY
                            }
                            onClick={()=>{handlers.selectMode("SCRATCHEDEASY")}}
                        >
                            <div>
                                <h1 className={styles.modeSelect__title}>
                                    Легкая царапка
                                </h1>
                                <p className={styles.modeSelect__desc}>
                                    Тоже самое что и режим “Поцарапанный”,
                                    однако заменяются не все символы, от чего
                                    возрастает приятность восприятия.
                                    Рекомендуется использовать именно этот режим
                                    вместо “Поцарапанный”, тот скорее как
                                    тяжелая артиллерия :]
                                </p>
                            </div>
                            <div>
                                <span className={styles.modeSelect__simple}>
                                Пример отформатированного текста: Х̷у̷ли ты это̷ чита̷е̷шь?
                                </span>
                                <span className={styles.modeSelect__noRec}>
                                    Работает не везде, не рекомендуется
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            ) : undefined}
        </div>
    );
}
