import './App.css';
import { app } from './index';
import { getDatabase } from "firebase/database";
import { useEffect, useState } from 'react';
import { fetchDragon } from './Services/fetchDragon';
import useWindowDimensions from './hooks/getWindowDimensions';
import { Route, Routes } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { DragonsPage } from './pages/DragonsPage';
import { DetailsPage } from './pages/DetailsPage';
import { Layout } from './components/layout/Layout';
import { LoginPage } from './pages/LoginPage';
import { UserCollectionPage } from './pages/UserCollectionPage';
import { RegisterPage } from './pages/RegisterPage';
import { RequireAuth } from './hoc/RequireAuth';







function App() {
   const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [detDrag, setDetDrag] = useState({});


  useEffect(() => {
    const database = getDatabase(app);
console.log(database);
  })
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
  
   const getUserData = userData => {
        console.log(userData);
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
                        <Route index element={<MainPage data={data} mobileView={mobileView} />} />

                        <Route
                            path="all/"
                            element={
                                <DragonsPage
                                    detDrag={detDrag}
                                   
                                    dragonReciving={dragonReciving}
                                />
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
                        <Route path="collection" element={<UserCollectionPage />} />

                        <Route
                            path="register"
                            element={<RegisterPage getUserData={getUserData} />}
                        />
                        <Route path="login" element={<LoginPage getUserData={getUserData} />} />
                    </Route>
                </Routes>
            )}
        </>
  );
}

export default App;
