import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from 'store/userSlice';
import { useAuth } from 'hooks/useAuth';
import { CustomLink } from 'components/comon/CustomLink';
import styles from './Layout.module.css';

export function Layout() {
    const user = useSelector(state => state.user);
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
                                    <CustomLink to="/">
                                        <h3>HOME</h3>
                                    </CustomLink>
                                </li>

                                <li className={styles.linkItem}>
                                    <CustomLink to="all">
                                        <h3>MORE</h3>
                                    </CustomLink>
                                </li>
                                <li className={styles.linkItem}>
                                    <CustomLink to="collection">
                                        <h3>FAVORITES</h3>
                                    </CustomLink>
                                </li>
                            </ul>
                        </nav>
                        <div className={styles.userMenu}>
                            
                            <button
                                className={styles.logoutBtn}
                                onClick={() => dispatch(removeUser())}
                                type="button"
                            >
                                Log out
                            </button>
                            <h4 className={styles.userEmail}>{user.email}</h4>
                        </div>
                    </div>
                )}

                {!isAuth && (
                    <nav>
                        <ul className={styles.registerList}>
                            <li className={styles.registerItem}>
                                <CustomLink to="/register">
                                    <h3>REGISTER</h3>
                                </CustomLink>
                            </li>
                            <li className={styles.registerItem}>
                                <CustomLink to="/login">
                                    <h3>LOGIN</h3>
                                </CustomLink>
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
