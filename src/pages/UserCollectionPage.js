import { useSelector, useDispatch } from 'react-redux';
import { removeDragon } from '../store/dragonSlice';
import { ImageSlider } from '../components/imageSlider/ImageSlider';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
    getDatabase,
    get,
    child,
    ref,
    set,
    remove,
    push,
    onValue,
    update,
} from 'firebase/database';

export function UserCollectionPage() {
    const collection = useSelector(state => state.dragons.dragons);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    function updateCollection(key) {
        const db = getDatabase();

        const newData = null;

        // const newDataKey = push(child(ref(db), 'users/' + `${user.id}/` + 'collection')).key;
        console.log(key);

        const updates = {};
        updates['users/' + `${user.id}/` + 'collection/' + key] = newData;
       

        return update(ref(db), updates);
    }

    const remove = el => {
        const dbRef = ref(getDatabase());
        const db = getDatabase();

        get(child(dbRef, 'users/' + `${user.id}/` + 'collection'))
            .then(snapshot => {
                if (snapshot.exists()) {
                    const collection = snapshot.val();

                    for (const key in collection) {
                        if (Object.hasOwnProperty.call(collection, key)) {
                            const element = collection[key];

                            if (element.data.id === el.id) {
                                console.log('object');
                                updateCollection(key);
                                dispatch(removeDragon);
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

            {collection.length === 0 && <h2>blank</h2>}
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
