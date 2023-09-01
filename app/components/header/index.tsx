import styles from './index.module.scss';
import logo from '../../../public/logo.svg';

export default function Header(props: any) {
    return (
        <header className={styles.header}>
            <span onClick={props.callbacks.about}>О проекте</span>
            <img src={logo.src}></img>
            <span onClick={props.callbacks.openAuthor}>Автор</span>
        </header>
    );
}
