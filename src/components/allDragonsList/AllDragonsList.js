import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchDragonsAll } from '../../Services/fetchDragon';
import { AllDragonsListItem } from '../allDragonsListItem/AllDragonsListItem';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDragon, removeDragon } from '../../store/dragonSlice';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import styles from './AllDragonsList.module.css';
import { getDatabase, ref, set, push } from 'firebase/database';

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

    const addDragonInDB = (data, { id } = user) => {
        const db = getDatabase();
        collection.forEach(element => {
            if (data.id !== element.id) {
                const dragonsListRef = ref(db, 'users/' + `${id}/` + 'collection/');

                const newDragRef = push(dragonsListRef);

                set(newDragRef, { data });
            }
        });
    };

    const addDrag = e => {
        if (e.target.nodeName === 'BUTTON') {
            const resp = data.find(el => el.id === e.target.id);

            if (collection.length === 0) {
                addDragonInDB(resp);
                dispatch(addDragon(resp));
                Notify.success(`${resp.name} добавлен в избранные`, {
                    timeout: 1500,
                });
            } else if (collection.length !== 0) {
                const exist = collection.find(el => el.id === resp.id);

                if (exist) {
                    Notify.info(`${resp.name} уже был добавлен ранее`, {
                        timeout: 1500,
                    });

                    return;
                } else if (!exist) {
                    const exist = collection.find(el => el.id === resp.id);
                    addDragonInDB(resp);
                    dispatch(addDragon(resp));
                    Notify.success(`${resp.name} добавлен в избранные`, {
                        timeout: 1500,
                    });

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
