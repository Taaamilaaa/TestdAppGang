import { Outlet, Link } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';
import { useDispatch } from 'react-redux';
import { removeUser } from 'store/userSlice';

import styles from './Layout.module.css';

export function Layout() {
    const { isAuth } = useAuth();
    const dispatch = useDispatch();

    return (
        <>
            <header className={styles.header}>
                {isAuth && (
                    <div className={styles.privatHederContainer}>
                        <nav>
                            <ul className={styles.navLinkList}>
                                <li className={styles.linkItem}>
                                    <Link to="/">
                                        <h3>HomePage</h3>
                                    </Link>
                                </li>

                                <li className={styles.linkItem}>
                                    <Link to="/all">
                                        <h3>More</h3>
                                    </Link>
                                </li>
                                <li className={styles.linkItem}>
                                    <Link to="/collection">
                                        <h3>favorit</h3>
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                        <button
                            className={styles.logoutBtn}
                            onClick={() => dispatch(removeUser())}
                            type="button"
                        >
                            Log out
                        </button>
                    </div>
                )}

                {!isAuth && (
                    <nav>
                        <ul className={styles.registerList}>
                            <li className={styles.registerItem}>
                                <Link to="/register">
                                    <h3>register</h3>
                                </Link>
                            </li>
                            <li className={styles.registerItem}>
                                <Link to="/login">
                                    <h3>login</h3>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                )}
            </header>
            <main className={styles.container}>
                <Outlet />
            </main>
        </>
    );
}
