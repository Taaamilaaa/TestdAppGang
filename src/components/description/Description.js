import { useLocation } from 'react-router-dom';
import styles from './Description.module.css';

export function Description({ name, link, additionParam }) {
    const location = useLocation();
    return (
        <div className={styles.optionsContainer}>
            {location.pathname !== '/collection' && <h3>Additional options:</h3>}

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
            {location.pathname !== '/collection' && (
                <a href={link} className={styles.link} target="blank">
                    more about {name}
                </a>
            )}
        </div>
    );
}
