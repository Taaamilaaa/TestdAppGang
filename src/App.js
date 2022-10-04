import './App.css';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, onValue } from 'firebase/database';
import { fetchMainDragonfromAPI, getDragonsCollection } from './store/dragonSlice';
import { currentUser } from 'store/userSlice';
import useWindowDimensions from './hooks/getWindowDimensions';
import { RequireAuth } from './hoc/RequireAuth';
import { Layout } from './components/layout/Layout';
import Loading from 'components/comon/Loader';

const HomePage = lazy(() => import('./pages/HomePage'));
const DragonsPage = lazy(() => import('./pages/DragonsPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const UserCollectionPage = lazy(() => import('./pages/UserCollectionPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));

function App() {
    const data = useSelector(state => state.dragons.data);
    const [detDrag, setDetDrag] = useState({});
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, user => {
            if (user) {
                dispatch(
                    currentUser({
                        email: user.email,
                        token: user.accessToken,
                        password: user.password,
                        id: user.uid,
                    })
                );
            }
        });
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMainDragonfromAPI());
    }, [dispatch]);

    const getCollection = () => {
        let data = [];
        const db = getDatabase();
        // eslint-disable-next-line
        const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

        onValue(collectionRef, snapshot => {
            if (snapshot.val()) {
                const collection = Object.values(snapshot.val());

                dispatch(getDragonsCollection(collection));
            } else if (!snapshot.val()) {
                dispatch(getDragonsCollection(data));
            }
        });
    };

    useEffect(() => {
        getCollection();
        // eslint-disable-next-line
    }, [user]);

    const dragonReciving = dragon => {
        setDetDrag(dragon);
    };

    const size = useWindowDimensions();
    const { width } = size;
    const mobileView = width <= 767.98;

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route
                        index
                        element={
                            <Suspense fallback={<Loading />}>
                                <RequireAuth>
                                    <HomePage data={data} mobileView={mobileView} />
                                </RequireAuth>
                            </Suspense>
                        }
                    />

                    <Route
                        path="all/"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RequireAuth>
                                    <DragonsPage
                                        detDrag={detDrag}
                                        dragonReciving={dragonReciving}
                                    />
                                </RequireAuth>
                            </Suspense>
                        }
                    />
                    <Route
                        path="all/details"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RequireAuth>
                                    <DetailsPage dragon={detDrag} mobileView={mobileView} />
                                </RequireAuth>
                            </Suspense>
                        }
                    />
                    <Route
                        path="collection"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RequireAuth>
                                    <UserCollectionPage getCollection={getCollection} />
                                </RequireAuth>
                            </Suspense>
                        }
                    />

                    <Route
                        path="register"
                        element={
                            <Suspense fallback={<Loading />}>
                                <RegisterPage />
                            </Suspense>
                        }
                    />
                    <Route
                        path="login"
                        element={
                            <Suspense fallback={<Loading />}>
                                <LoginPage />
                            </Suspense>
                        }
                    />
                </Route>
            </Routes>
        </>
    );
}

export default App;
