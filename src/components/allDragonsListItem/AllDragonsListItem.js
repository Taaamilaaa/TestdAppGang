import styles from './AllDragonsListItem.module.css';

export function AllDragonsListItem({ name, src, id, onImgClick, addDrag }) {
    return (
        <li className={styles.listItem} onClick={onImgClick}>
            <img className={styles.img} src={src} alt={name} id={id} />
            <button onClick={addDrag} className={styles.addBtn} id={id}>
                +
            </button>
        </li>
    );
}
