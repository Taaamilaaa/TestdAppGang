import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchDragonsAll } from '../../Services/fetchDragon';
import { AllDragonsListItem } from '../allDragonsListItem/AllDragonsListItem';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { addDragon, removeDragon } from '../../store/dragonSlice';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './AllDragonsList.module.css';
import { getDatabase, ref, set, push, onValue } from 'firebase/database';
import { getDragonsCollection} from '../../store/dragonSlice';


export function AllDragonsList({ dragonReciving }) {
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState(false);

    const user = useSelector(state => state.user);
    const collection = useSelector(state => state.dragons.dragons);
    const dispatch = useDispatch();

    useEffect(() => {
       
        fetchDragonsAll().then(resp => {
            setData(resp);
        });
    }, []);



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








//////////////////old
    // const getCollection = () => {
    //     let data = [];
    //     const db = getDatabase();
    //     // eslint-disable-next-line
    //     const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

    //     onValue(collectionRef, snapshot => {
    //         if (snapshot.val()) {
               
    //             for (const key in snapshot.val()) {
    //                 if (Object.hasOwnProperty.call(snapshot.val(), key)) {
    //                     const element = snapshot.val()[key];
                        
    //                     for (const key in element) {
    //                         if (Object.hasOwnProperty.call(element, key)) {

    //                             const dataElement = element[key];
    //                             data.push(dataElement);
    //                         }
    //                     }
    //                 }
    //             }
    //             dispatch(getDragonsCollection(data));
    //         } else if (!snapshot.val()) {
    //             dispatch(getDragonsCollection(data));
    //         }
    //     });
    // };

    

    const addDragonInDB = (data, { id } = user) => {
        const db = getDatabase();
        // eslint-disable-next-line
        const dragonsListRef = ref(db, 'users/' + `${id}/` + 'collection/');
        if (collection.length === 0) {
            const newDragRef = push(dragonsListRef);

            set(newDragRef, { data });
            Notify.success(`${data.name} добавлен в избранные`, {
                timeout: 1500,
            });
        } else if (collection.length !== 0) {

            collection.forEach(element => {
                if (data.data.id !== element.data.id) {
                    const newDragRef = push(dragonsListRef);

                    set(newDragRef, { data });
                    Notify.success(`${data.name} добавлен в избранные`, {
                        timeout: 1500,
                    });
                }
            });
        }
    };

    const addDrag = e => {
        if (e.target.nodeName === 'BUTTON') {
            const resp = data.find(el => el.id === e.target.id);
           

            if (collection.length === 0) {
                addDragonInDB({data: resp});
                getCollection();
            } else if (collection.length !== 0) {
                const exist = collection.find(el => el.data.data.id === resp.id);
                
                if (exist) {
                    Notify.info(`${resp.name} уже был добавлен ранее`, {
                        timeout: 1500,
                    });
                } else if (!exist) {
                    console.log('!exist');
                   
                    addDragonInDB({data: resp});
                    getCollection();

                    return;
                }
            }
        }
    };

    const onImgClick = e => {
        if (e.target.nodeName === 'BUTTON' || e.target.nodeName === 'LI') {
            return;
        } else if (e.target.nodeName === 'IMG') {
            const resp = data.find(el => el.id === e.target.id);
            dragonReciving(resp);
            setFlag(true);
        }
    };

    return (
        <section>
            <h3 className={styles.title}>All dragons</h3>
            <ul className={styles.list}>
                {flag && <Navigate to="details" />}
                {data.map((dragon, index) => {
                    return (
                        <div key={index}>
                            <AllDragonsListItem
                                addDrag={addDrag}
                                onImgClick={onImgClick}
                                id={dragon.id}
                                name={dragon.name}
                                src={dragon.flickr_images[0]}
                            />
                        </div>
                    );
                })}
            </ul>
        </section>
    );
}
