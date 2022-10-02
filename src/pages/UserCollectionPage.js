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
                                // const link = `${db}users/${user.id}/collection/${key}`;

                                // const activeKey = push(child(ref(db), 'users/' + `${user.id}/` + 'collection')).key;

                                // remove(dbRef, [('users/' + `${user.id}/` + 'collection') + activeKey]);
                                // console.log('object');

                                const db = getDatabase();

                                const activeKey = push(
                                    child(ref(db), 'users/' + `${user.id}/` + 'collection/')
                                ).key;

                                set(ref(db, 'users/' + `${user.id}/` + 'collection/' + activeKey), null)
                                    .then(() => {
                                        console.log('object');
                                        // Data saved successfully!
                                    })
                                    .catch(error => {
                                        // The write failed...
                                    });
                            }
                        }
                    }
                }
            })
            .catch(error => {});

        dispatch(removeDragon(el.id));
        Notify.info('удалено из избранного');
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
