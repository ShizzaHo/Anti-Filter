import styles from './index.module.scss';
import logo from '../../../public/logo.svg';

export default function Textarea(props: any) {
    return (
        <textarea
            className={styles.textarea}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
        ></textarea>
    );
}
