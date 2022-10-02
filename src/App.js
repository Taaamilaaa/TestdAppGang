import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDragon } from './Services/fetchDragon';
import useWindowDimensions from './hooks/getWindowDimensions';
import { Route, Routes } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { DragonsPage } from './pages/DragonsPage';
import { DetailsPage } from './pages/DetailsPage';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { UserCollectionPage } from './pages/UserCollectionPage';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './hoc/RequireAuth';
import { useAuth } from './hooks/useAuth';
import { currentUser } from 'store/userSlice';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDragonsCollection } from './store/dragonSlice';
// import { getDatabase, ref, child, get } from 'firebase/database';
import { getDatabase, ref, onValue } from 'firebase/database';

function App() {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [detDrag, setDetDrag] = useState({});
    const dispatch = useDispatch();
    const { isAuth } = useAuth();
    const user = useSelector(state => state.user);

    useEffect(() => {
        const db = getDatabase();

        const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

        onValue(collectionRef, snapshot => {
            if (snapshot.val()) {
                let data = [];
                for (const key in snapshot.val()) {
                    if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                        const element = snapshot.val()[key];
                        for (const key in element) {
                            if (Object.hasOwnProperty.call(element, key)) {
                                const dataElement = element[key];
                               
                                data.push(dataElement);
                            }
                        }
                    }
                }

                dispatch(getDragonsCollection(data));
            } else if (!snapshot.val()) {
               
                return null;
            }
        });
    })

  

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
        
    }, []);

    useEffect(() => {
        if (Object.keys(data).length === 0) {
            setIsLoading(true);
        } else if (Object.keys(data).length !== 0) {
            setIsLoading(false);
        }

        // eslint-disable-next-line
    }, [data]);

    useEffect(() => {
        const dataFromStorage = JSON.parse(localStorage.getItem('data'));

        if (dataFromStorage === null) {
            setIsLoading(true);
            fetchDragon()
                .then(resp => {
                    setData(resp);
                    setIsLoading(false);
                    return resp;
                })
                .then(resp => {
                    localStorage.setItem('data', JSON.stringify(resp));
                })
                .catch(error => console.log(error));
        } else {
            setData(dataFromStorage);
            fetchDragon()
                .then(resp => {
                    setData(resp);
                    return resp;
                })
                .then(resp => {
                    localStorage.setItem('data', JSON.stringify(resp));
                })
                .catch(error => console.log(error));
        }
    }, []);
    const dragonReciving = dragon => {
        setDetDrag(dragon);
    };

    const size = useWindowDimensions();
    const { width } = size;
    const mobileView = width <= 767.98;

    return (
        <>
            {isLoading && <h1>ЗАГРУЗКА</h1>}

            {Object.keys(data).length !== 0 && (
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                <RequireAuth>
                                    <HomePage data={data}  mobileView={mobileView} />
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
                                    <DetailsPage dragon={detDrag}  mobileView={mobileView}/>
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="collection"
                            element={
                                <RequireAuth>
                                    <UserCollectionPage />
                                </RequireAuth>
                            }
                        />

                        <Route path="register" element={<RegisterPage />} />
                        <Route path="login" element={<LoginPage />} />
                    </Route>
                </Routes>
            )}
        </>
    );
}

export default App;
