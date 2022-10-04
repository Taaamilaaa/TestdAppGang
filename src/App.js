import './App.css';
import { useEffect, useState } from 'react';
import { fetchMainDragonfromAPI } from './store/dragonSlice';
import { useDispatch, useSelector } from 'react-redux';
import useWindowDimensions from './hooks/getWindowDimensions';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';

import { RequireAuth } from './hoc/RequireAuth';
import { currentUser } from 'store/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDragonsCollection } from './store/dragonSlice';
import { getDatabase, ref, onValue } from 'firebase/database';
import Loading from 'components/comon/Loader';
import { lazy, Suspense } from 'react';

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
        //currentUser
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
        //fetchMainData
        dispatch(fetchMainDragonfromAPI());
    }, [dispatch]);

    const getCollection = () => {  
let data = [];
        const db = getDatabase();
        // eslint-disable-next-line
        const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

        onValue(collectionRef, snapshot => {
            if (snapshot.val()) {

                const collection = Object.values(snapshot.val())
                
                dispatch(getDragonsCollection(collection))
    

                // for (const key in snapshot.val()) {
                //     if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                //         const element = snapshot.val()[key];
                //         console.log(element);

                //         for (const key in element) {
                //             if (Object.hasOwnProperty.call(element, key)) {
                //                 const dataElement = element[key];
                //                 console.log(dataElement);

                //                 data.unshift(dataElement);
                //             }
                //         }
                //     }
                // }
                // dispatch(getDragonsCollection(data));
            } else if (!snapshot.val()) {
                dispatch(getDragonsCollection(data));
            }
        });
    };

    useEffect(() => {
        //getCollection
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

            {/* <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <HomePage data={data} mobileView={mobileView} />
                                </RequireAuth>
                            }
                        />

                        <Route
                            path="all/"
                            element={
                                <RequireAuth>
                                    <DragonsPage
                                        detDrag={detDrag}
                                        dragonReciving={dragonReciving}
                                       
                                    />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="all/details"
                            element={
                                <RequireAuth>
                                    <DetailsPage dragon={detDrag} mobileView={mobileView} />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="collection"
                            element={
                                <RequireAuth>
                                    <UserCollectionPage getCollection = {getCollection} />
                                </RequireAuth>
                            }
                        />

                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                </Routes> */}
        </>
    );
}

export default App;
