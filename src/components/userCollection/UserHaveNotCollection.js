import { Link } from 'react-router-dom';
import styles from './UserCollection.module.css';

export function UserHaveNotCollection() {
    return (
        <>
            <h2>There is nothing here</h2>
            <p className={styles.text}>
                go to <Link to="/all">More</Link> and add some elements
            </p>
        </>
    );
}
