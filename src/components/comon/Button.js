import styles from './Button.module.css'

export function Button({ text, type }) {
    return <button className={styles.button} type = {type}>{text}</button>
}