import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeDragon } from '../store/dragonSlice';
import { ImageSlider } from '../components/imageSlider/ImageSlider';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { getDatabase, get, child, ref, onValue, update } from 'firebase/database';
import { getDragonsCollection } from '../store/dragonSlice';

export function UserCollectionPage({getCollection}) {
    const [flag, setFlag] = useState(false);
    const collection = useSelector(state => state.dragons.dragons);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (collection.length === 0) {
            setFlag(true);
        }
    }, [collection]);

    // const getCollection = () => {
    //     const db = getDatabase();

    //     const collectionRef = ref(db, 'users/' + `${user.id}/` + 'collection');

    //     onValue(collectionRef, snapshot => {
    //         let data = [];

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

    function updateCollection(key) {
        const db = getDatabase();
        const newData = null;
        const updates = {};

        updates['users/' + `${user.id}/` + 'collection/' + key] = newData;

        return update(ref(db), updates);
    }

    const remove = el => {
        const dbRef = ref(getDatabase());

        get(child(dbRef, 'users/' + `${user.id}/` + 'collection'))
            .then(snapshot => {
                if (snapshot.exists()) {
                    for (const key in snapshot.val()) {
                        if (Object.hasOwnProperty.call(snapshot.val(), key)) {
                            const element = snapshot.val()[key];

                            if (element.data.id === el.id) {
                                updateCollection(key);

                                getCollection();

                                Notify.success(`${element.name} удален из избранные`, {
                                    timeout: 1500,
                                });
                            }
                        }
                    }
                }
            })
            .catch(error => {});
    };

    return (
        <>
            <h1 style={{ marginTop: '150px' }}>UserCollectionPage </h1>

            {flag && <h2>blank</h2>}
            {collection.length !== 0 && (
                <>
                    {collection.map((el, index) => {
                        return (
                            <li key={index}>
                                <div>
                                    <h3>{el.name}</h3>

                                    <ImageSlider slides={el.flickr_images} />
                                    <button type="button" id={el.id} onClick={() => remove(el)}>
                                        -
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </>
            )}
        </>
    );
}
