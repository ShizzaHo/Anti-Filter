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

    const [filteredText, setFilteredText] = useState('');
    const [unfilteredText, setUnfilteredText] = useState('');
    const [differenceArray, setDifferenceArray] = useState<[string, "original" | "change"][]>([]);

    const handlers = {
        changeUnfilteredText: (e: any) => {
            setFilteredText(e.target.value);
        },
    };

    useEffect(() => {
        window.clearTimeout(requestWaiter);
        setRequestWaiter(
            setTimeout(async () => {
                const response = await fetch(`/api/unfiltered?method=${"CAR"}&text=${filteredText}`);
                if (response.ok) {
                    const results = await response.json();
                    setUnfilteredText(results.result.formatted);
                    setDifferenceArray(generateDifferenceArray(filteredText, results.result.formatted))
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
                Выбран режим обхода фильтров: <span>Замена кириллицы</span>
            </div>
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
                        {differenceArray.length == 0 ? <span className={styles.noDifference}>Здесь будет подробный текст с тем где произошли изменения</span> : undefined}
                        {differenceArray.map((item) => {
                            const key = generateRandomID(8);
                            return item[1] == "original" ? <span key={key}>{item[0]}</span> : <span className={styles.difference} key={key}>{item[0]}</span>;
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
