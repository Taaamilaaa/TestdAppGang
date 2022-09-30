import { Outlet, Link } from 'react-router-dom';
import styles from './Layout.module.css';

export function Layout() {
    const auth = false;
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.navLinkList}>
                        <li className={styles.linkItem}>
                            <Link to="/">
                                <h3>StartPage</h3>
                            </Link>
                        </li>
                        {auth && (
                            <li className={styles.linkItem}>
                                <Link to="/all">
                                    <h3>All DRAGONS</h3>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
                {auth && (
                    <Link to="/collection">
                        <h3>favorit</h3>
                    </Link>
                )}
                {!auth && (
                    <div>
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
                    </div>
                )}
            </header>
            <main className={styles.container}>
                <Outlet />
            </main>
        </>
    );
}
