'use client';

import Image from 'next/image';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter()

    const [pageStage, setPageStage] = useState(0);
    const [timer, setTimer] = useState(setTimeout(()=>{}));

    useEffect(() => {
        setTimer(setTimeout(() => {
            setPageStage(1)
            setTimeout(() => {
                setPageStage(2)
                setTimeout(() => {
                    setPageStage(3)
                }, 10000);
            }, 7000);
        }, 6000));
    }, []);

    const skip = () => {
        setPageStage(3);
        clearTimeout(timer);
        setTimer(setTimeout(()=>{}));
    };

    const callbacks = {
        goApp: () => {
            router.push('/app');
        }
    }

    return (
        <div>
            <div className={styles.bg}>
                <h1 className={styles.bgText}>АНТИ</h1>
                <h1 className={styles.bgText2}>АНТИ</h1>
                <h1 className={styles.bgText3}>ФИЛЬТР</h1>
            </div>
            <main className={styles.main} onClick={skip}>
                {pageStage == 0 ? (
                    <p style={{ animationDuration: '6s' }}>
                        Ваше мнение и эмоции, не должны быть
                        <br />
                        ограничены политикой и бесчеловечными
                        <br />
                        корпорациями
                    </p>
                ) : undefined}
                {pageStage == 1 ? (
                    <p style={{ animationDuration: '7s' }}>
                        Люди на то и люди что сами вольны решать
                        <br />
                        какие слова они хотят использовать, и какие
                        <br />
                        слова лучше передают их эмоции
                    </p>
                ) : undefined}
                {pageStage == 2 ? (
                    <p style={{ animationDuration: '10s' }}>
                        А русский мат наш дорогой,
                        <br />
                        Употребляйте осторожно.
                        <br />
                        Конечно, мат не хорошо,
                        <br />
                        Но и без мата <span>невозможно</span>.
                    </p>
                ) : undefined}
                {pageStage == 3 ? (
                    <nav className={styles.navigation}>
                        <span onClick={callbacks.goApp}>Открыть “анти-фильтр”</span>
                        <span>О проекте</span>
                        <span>Автор</span>
                    </nav>
                ) : undefined}

                {pageStage != 3 ? (
                    <span className={styles.skip}>
                        Нажмите чтоб пропустить анимацию
                    </span>
                ) : undefined}
            </main>
        </div>
    );
}
