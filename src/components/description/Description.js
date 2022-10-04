import styles from './Description.module.css';

export function Description({ name, link, additionParam }) {
    return (
        <div className={styles.optionsContainer}>
            <h3>Additional options:</h3>

            <ul className={styles.descrList}>
                {additionParam.map(el => {
                    return (
                        <li key={el.param}>
                            <span className={styles.text}>
                                {el.title}: {el.param}
                            </span>
                        </li>
                    );
                })}
            </ul>

            <a href={link} className={styles.link} target = 'blank'>
                more about {name}
            </a>
        </div>
    );
}
